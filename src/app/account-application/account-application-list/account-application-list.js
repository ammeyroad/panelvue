import {
  computed,
  reactive,
  ref,
  toRef,
  onMounted,
  watch,
} from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";
import parseDate from "date-fns/parse";
import formatDate from "date-fns/format";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, max } from "vee-validate/dist/rules";

import useApiInvoker from "@/shared/services/api-invoker.service";
import { handler as handleServiceError } from "@/shared/services/error-handler";
import Swal from "sweetalert2";

import AuthBankSelector from "@/shared/components/bank-selector/AuthBankSelector.vue";
import AccountApplicationListTable from "../components/AccountApplicationListTable";

import AprSelect from "@/shared/components/apr-select/AprSelect.vue";
import AprDateField from "@/shared/components/apr-date-field/AprDateField.vue";
import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import AprPagination from "@/shared/components/apr-pagination/AprPagination.vue";
import RequiredLabel from "@/shared/components/RequiredLabel.vue";

import { updateWindowUrl } from "@/shared/utils";
import { STATUS } from "@/shared/constants/applications.constant";

import { dateTime } from "@/shared/filters/date-time";
import { yesNo, nullable } from "@/shared/filters/utils";
import { status as statusLabel } from "@/shared/filters/applications";

extend("required", {
  ...required,
  message: "{_field_} wajib diisi",
});
extend("max", {
  ...max,
  message: "Panjang maksimal {_field_} adalah {length} karakter",
});

const PAGE_TITLE = "Daftar Pengajuan Pembukaan Rekening";
export default {
  name: "AccountApplicationList",
  metaInfo: {
    title: PAGE_TITLE,
  },

  components: {
    AuthBankSelector,
    AccountApplicationListTable,
    AprSelect,
    AprTextField,
    AprPagination,
    AprDateField,
    RequiredLabel,
    ValidationProvider,
    ValidationObserver,
  },

  setup(_, { root }) {
    const route = root.$route;
    const { apiAuthHeader, selectedBank } = useGetters([
      "apiAuthHeader",
      "selectedBank",
    ]);
    const { apiInvoker } = useApiInvoker({
      headers: apiAuthHeader.value,
    });
    const selectedBankId = computed(() => selectedBank.value.bank.id);
    watch(selectedBankId, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        refreshData();
      }
    });

    const currentQueries = new URLSearchParams(window.location.search);
    const meta = reactive({
      page: currentQueries.has("page")
        ? parseInt(currentQueries.get("page"))
        : 1,
      perPage: currentQueries.has("per_page")
        ? parseInt(currentQueries.get("per_page"))
        : 25,
      prevPage: null,
      nextPage: null,
      total: null,
      totalPage: null,
    });
    const search = reactive({
      filter: currentQueries.has("filter") ? currentQueries.get("filter") : "",
      status: currentQueries.has("status")
        ? currentQueries.get("status")
        : null,
      date: currentQueries.has("date")
        ? parseDate(currentQueries.get("date"), "yyyy-MM-dd", new Date())
        : null,
    });
    const statuses = computed(() => [
      { value: null, text: "Semua" },
      { value: STATUS.ACCEPTED, text: "Disetujui" },
      { value: STATUS.CANCELED, text: "Dibatalkan" },
      { value: STATUS.RECEIVED, text: "Diterima" },
      { value: STATUS.REVIEW, text: "Dalam Peninjauan" },
      { value: STATUS.DOCUMENT_REQUIRED, text: "Dokumen Kurang" },
      { value: STATUS.REJECTED, text: "Ditolak" },
    ]);
    const isBusy = ref(false);
    const handlePageChanged = newPage => (meta.page = newPage);
    watch(toRef(meta, "page"), (newPage, oldPage) => {
      if (newPage !== oldPage) {
        // make sure that the page has been changed first
        root.$nextTick(() => {
          refreshData();
        });
      }
    });

    onMounted(() => {
      refreshData();
    });

    const uploadDocument = reactive({
      file: null,
      accountApplication: null,
      documentType: null,
      modalActive: false,
    });
    const documentTypes = computed(() => [
      { text: "Foto Pribadi dengan Kartu Identitas", value: "PP" },
      { text: "Kartu Identitas (KTP)", value: "ID" },
    ]);
    watch(toRef(uploadDocument, "modalActive"), isActive => {
      if (!isActive) {
        uploadDocument.file = null;
        uploadDocument.accountApplication = null;
        uploadDocument.documentType = null;
      }
    });
    const handleUploadDocument = accountApplication => {
      uploadDocument.file = null;
      uploadDocument.documentType = null;
      uploadDocument.accountApplication = accountApplication;
      uploadDocument.modalActive = true;
    };
    const doUploadDocument = () => {
      const data = new FormData();
      data.append("document", uploadDocument.file);
      data.append("type", uploadDocument.documentType);

      isBusy.value = true;
      const url = `/banks/${selectedBankId.value}/account-apps/${uploadDocument.accountApplication.id}/documents`;
      apiInvoker
        .post(url, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          isBusy.value = false;
          Swal.fire(
            "Unggah Dokumen Berhasil",
            `Dokumen untuk Pengajuan Pembukaan Rekening ${uploadDocument.accountApplication.id} berhasil diunggah!`,
            "success",
          );
          uploadDocument.modalActive = false;
          refreshData();
        })
        .catch(handleRequestError("Gagal Mengunggah Dokumen"));
    };

    const confirmStatus = reactive({
      status: null,
      accountApplication: null,
      modalActive: false,
    });
    watch(toRef(confirmStatus, "modalActive"), isActive => {
      if (!isActive) {
        confirmStatus.status = null;
        confirmStatus.accountApplication = null;
      }
    });
    const handleConfirmStatus = ({ accountApplication, status }) => {
      confirmStatus.status = status;
      confirmStatus.accountApplication = accountApplication;
      confirmStatus.modalActive = true;
    };
    const doConfirmStatus = () => {
      const reqData = { status: confirmStatus.status };
      isBusy.value = true;
      const url = `/banks/${selectedBankId.value}/account-apps/${confirmStatus.accountApplication.id}/status`;
      apiInvoker
        .patch(url, reqData, {
          headers: { "Content-Type": "application/json" },
        })
        .then(res => {
          isBusy.value = false;
          Swal.fire(
            "Ubah Status Berhasil",
            `Pengajuan Pembukaan Rekening ${
              confirmStatus.accountApplication.id
            } berhasil diubah menjadi ${statusLabel(res.data.status)}!`,
            "success",
          );
          confirmStatus.modalActive = false;
          refreshData();
        })
        .catch(handleRequestError("Gagal Mengubah Status Pengajuan"));
    };
    const acceptAccountApplication = reactive({
      accountNo: null,
      accountType: null,
      openedAt: new Date(),
      accountApplication: null,
      searchAccountType: "",
      modalActive: false,
    });
    watch(toRef(acceptAccountApplication, "modalActive"), isActive => {
      if (!isActive) {
        acceptAccountApplication.accountNo = null;
        acceptAccountApplication.accountType = null;
        acceptAccountApplication.openedAt = new Date();
        acceptAccountApplication.searchAccountType = "";
        acceptAccountApplication.accountApplication = null;
      }
    });
    const handleAcceptAccountApplication = accountApplication => {
      acceptAccountApplication.accountNo = null;
      acceptAccountApplication.accountType = accountApplication.account_type;
      acceptAccountApplication.openedAt = new Date();
      acceptAccountApplication.accountApplication = accountApplication;
      acceptAccountApplication.searchAccountType =
        accountApplication.account_type !== null
          ? accountApplication.account_type.name
          : "";
      acceptAccountApplication.modalActive = true;
      fetchAccountTypes(accountApplication.details.account_type);
    };
    const doAcceptAccountApplication = () => {
      const reqData = {
        status: STATUS.ACCEPTED,
        account: {
          account_no: acceptAccountApplication.accountNo,
          account_type: acceptAccountApplication.accountType.id,
          opened_at: formatDate(
            acceptAccountApplication.openedAt,
            "yyyy-MM-dd",
          ),
        },
      };
      isBusy.value = true;
      const url = `/banks/${selectedBankId.value}/account-apps/${acceptAccountApplication.accountApplication.id}/status`;
      apiInvoker
        .patch(url, reqData, {
          headers: { "Content-Type": "application/json" },
        })
        .then(res => {
          isBusy.value = false;
          const data = res.data;
          Swal.fire(
            "Pengajuan Pembukaan Rekening Disetujui!",
            `Pengajuan Pembukaan Rekening ${data.id} berhasil disetujui!`,
            "success",
          );
          acceptAccountApplication.modalActive = false;
          refreshData();
        })
        .catch(handleRequestError("Gagal Mengubah Status Pengajuan"));
    };
    const accountTypes = ref([]);
    const filteredAccountTypes = computed(() => {
      if (acceptAccountApplication.accountType === null) {
        return accountTypes.value.filter(accountType =>
          accountType.name
            .toUpperCase()
            .includes(acceptAccountApplication.searchAccountType.toUpperCase()),
        );
      }

      return accountTypes.value.filter(accountType =>
        accountType.name
          .toUpperCase()
          .includes(acceptAccountApplication.searchAccountType.toUpperCase()),
      );
    });
    const fetchAccountTypes = accountTypeClass => {
      if (selectedBankId.value === null) {
        return;
      }

      const params = new URLSearchParams();
      if (accountTypeClass) {
        params.set("class", accountTypeClass);
      }
      const url = `/banks/${
        selectedBankId.value
      }/account-types?${params.toString()}`;
      isBusy.value = true;
      apiInvoker
        .get(url)
        .then(res => {
          isBusy.value = false;
          accountTypes.value = res.data;
        })
        .catch(handleRequestError("Gagal Mendapatkan Daftar Produk Simpanan"));
    };
    const handleAccountTypeSelected = accountType => {
      acceptAccountApplication.accountType = accountType;
      acceptAccountApplication.searchAccountType = accountType
        ? accountType.name
        : null;
    };

    const refreshData = () => {
      if (selectedBank.value.bank.id === null) {
        return;
      }
      if (isBusy.value) {
        return;
      }
      isBusy.value = true;
      const query = new URLSearchParams();
      query.set("page", meta.page);
      query.set("per_page", meta.perPage);
      if (search.filter !== "") {
        query.set("filter", search.filter);
      }
      if (search.status !== null) {
        query.set("status", search.status);
      }
      if (search.date !== null) {
        query.set("date", formatDate(search.date, "yyyy-MM-dd"));
      }

      updateWindowUrl(
        route,
        `${PAGE_TITLE} - ${selectedBank.value.bank.name}`,
        query,
      );

      const url = `/banks/${selectedBankId.value}/account-apps`;
      isBusy.value = true;
      apiInvoker
        .get(`${url}?${query.toString()}`)
        .then(handleRefreshSuccess)
        .catch(handleRequestError("Gagal Mengambil Data Pengajuan"));
    };

    function handleRefreshSuccess(res) {
      isBusy.value = false;
      data.value = res.data.data;

      meta.page = res.data.current_page;
      meta.prevPage = res.data.prev_page_url !== null ? meta.page - 1 : null;
      meta.nextPage = res.data.next_page_url !== null ? meta.page + 1 : null;
      meta.total = res.data.total;
    }
    const handleRequestError = title => err => {
      isBusy.value = false;
      const errorDetails = handleServiceError(err);
      Swal.fire(title, errorDetails.message, errorDetails.level);
    };
    const data = ref([]);

    return {
      meta,
      search,
      isBusy,
      data,
      statuses,
      statusLabel,
      handlePageChanged,
      refreshData,
      uploadDocument,
      documentTypes,
      handleUploadDocument,
      doUploadDocument,
      confirmStatus,
      handleConfirmStatus,
      doConfirmStatus,
      acceptAccountApplication,
      handleAcceptAccountApplication,
      doAcceptAccountApplication,
      handleAccountTypeSelected,
      filteredAccountTypes,
      handleRequestError,
    };
  },

  filters: { dateTime, yesNo, nullable },
};
