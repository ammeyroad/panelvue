import {
  computed,
  reactive,
  ref,
  onMounted,
  watch,
} from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";

import useApiInvoker from "@/shared/services/api-invoker.service";
import { handler as handleServiceError } from "@/shared/services/error-handler";
import Swal from "sweetalert2";

import AprPagination from "@/shared/components/apr-pagination/AprPagination.vue";
import AprSelect from "@/shared/components/apr-select/AprSelect.vue";
import AprTable from "@/shared/components/apr-table/AprTable.vue";
import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";

import BankSelector from "@/shared/components/bank-selector/BankSelector.vue";

import { dateTime } from "@/shared/filters/date-time";
import { yesNo, nullable } from "@/shared/filters/utils";
import { canCreate, canEdit, canViewAll } from "../account-type.auth";

export default {
  name: "AccountTypeList",
  metaInfo: {
    title: "Daftar Produk Simpanan",
  },

  components: {
    AprPagination,
    AprSelect,
    AprTable,
    AprTextField,
    BankSelector,
  },

  setup(_, { root }) {
    const { apiAuthHeader } = useGetters(["apiAuthHeader"]);
    const { apiInvoker } = useApiInvoker({
      headers: apiAuthHeader.value,
    });

    const productTypes = computed(() => [
      { text: "Deposito", value: "DEPOSITO" },
      { text: "Tabungan", value: "TABUNGAN" },
    ]);
    const meta = reactive({
      page: 1,
      perPage: 25,
      prevPage: 0,
      nextPage: 1,
      total: 50,
      totalPage: 2,
    });
    const handlePageChanged = newPage => {
      meta.page = newPage;
      root.$nextTick(() => {
        refreshData();
      });
    };

    const search = reactive({
      name: "",
      class: "",
      includeInactive: false,
    });

    const isBusy = ref(false);
    const selectedBank = ref(null);
    watch(selectedBank, () => {
      search.includeInactive = false;
      if (isBusy.value) {
        return;
      }
      refreshData();
    });

    const banks = ref([]);
    const refreshBanks = () => {
      const url = `/banks`;

      isBusy.value = true;
      apiInvoker
        .get(url)
        .then(handleRefreshBanksSuccess)
        .catch(handleRequestError);
    };
    const handleRefreshBanksSuccess = res => {
      isBusy.value = false;
      const banksResult = res.data.data;
      banks.value = banksResult;

      const previousSelectedBank = selectedBank.value;
      if (previousSelectedBank === null) {
        selectedBank.value = banksResult.length > 0 ? banksResult[0].id : null;
      } else {
        // edge case: handle if id is not within listed banks.
        const existingBank = banksResult.find(
          b => b.id === previousSelectedBank,
        );
        if (!existingBank) {
          selectedBank.value =
            banksResult.length > 0 ? banksResult[0].id : null;
        }
      }

      if (previousSelectedBank !== selectedBank.value) {
        refreshData();
      }
    };
    const handleBankChanged = newBankId => {
      selectedBank.value = newBankId;
    };

    const data = ref([]);
    const refreshData = () => {
      if (selectedBank.value === null) {
        return;
      }
      if (isBusy.value) {
        return;
      }

      const url = `/banks/${selectedBank.value}/account-types`;
      const params = new URLSearchParams();
      if (search.includeInactive) {
        params.set("all", "1");
      }
      if (search.name !== "") {
        params.set("filter", search.name);
      }
      if (search.class !== "") {
        params.set("class", search.class);
      }
      params.set("page", meta.page);
      params.set("per_page", meta.perPage);

      isBusy.value = true;
      apiInvoker
        .get(`${url}?${params.toString()}`)
        .then(handleRefreshSuccess)
        .catch(handleRequestError);
    };
    const handleRefreshSuccess = res => {
      isBusy.value = false;
      data.value = res.data;
      meta.total = res.data.length;
      // TODO use pagination
      meta.totalPage = 1;
      meta.nextPage = null;
      meta.prevPage = null;
    };
    const handleRequestError = err => {
      isBusy.value = false;
      const errorDetails = handleServiceError(err);
      Swal.fire("Error", errorDetails.message, errorDetails.level);
    };

    onMounted(() => {
      refreshBanks();
    });

    const canCreateNewAccountType = computed(() =>
      canCreate(selectedBank.value),
    );
    const canViewAllAccountTypes = computed(() =>
      canViewAll(selectedBank.value),
    );
    const canEditAccountType = canEdit;

    const confirmSwitchAvailability = accountType => {
      const title = "Konfirmasi Perubahan Status Produk";
      const text = accountType.available
        ? `Apakah Anda yakin ingin menonaktifkan ${accountType.class} - ${accountType.name}?`
        : `Apakah Anda yakin ingin mengaktifkan ${accountType.class} - ${accountType.name}?`;

      Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      }).then(result => {
        if (result.isConfirmed) {
          handleSwitchAvailabilityConfirmed(accountType);
        }
      });
    };
    const handleSwitchAvailabilityConfirmed = accountType => {
      if (isBusy.value) {
        return;
      }
      const url = `/banks/${accountType.bank_id}/account-types/${accountType.id}/available`;
      const data = { available: !accountType.available };
      isBusy.value = true;
      apiInvoker
        .patch(url, data)
        .then(res => {
          isBusy.value = false;
          const newAccountTypeData = res.data;
          const message = `Produk ${newAccountTypeData.class} - ${
            newAccountTypeData.name
          } berhasil ${
            newAccountTypeData.available ? "diaktifkan" : "dinonaktifkan"
          }`;
          Swal.fire("Perubahan Berhasil", message, "info");
          refreshData();
        })
        .catch(handleRequestError);
    };
    return {
      productTypes,
      meta,
      search,
      data,
      isBusy,
      refreshData,
      refreshBanks,
      selectedBank,
      banks,
      canCreateNewAccountType,
      canEditAccountType,
      canViewAllAccountTypes,
      handleBankChanged,
      confirmSwitchAvailability,
      handleNext: handlePageChanged,
      handlePrevious: handlePageChanged,
    };
  },

  filters: {
    yesNo,
    nullable,
    dateTime,
    switchAvailabilityActionLabel(isAvailable) {
      return isAvailable ? "Tarik dari Penawaran" : "Tawarkan ke Nasabah";
    },
    switchAvailiabilityButtonClass(isAvailable) {
      return {
        button: true,
        "is-danger": isAvailable,
        "is-info": !isAvailable,
      };
    },
  },
};
