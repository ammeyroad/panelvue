import {
  computed,
  reactive,
  ref,
  toRef,
  onMounted,
  watch,
} from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";

import useApiInvoker from "@/shared/services/api-invoker.service";
import { handler as handleServiceError } from "@/shared/services/error-handler";
import Swal from "sweetalert2";

import AuthBankSelector from "@/shared/components/bank-selector/AuthBankSelector.vue";
import BankBranchListTable from "./components/BankBranchListTable.vue";
import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import AprPagination from "@/shared/components/apr-pagination/AprPagination.vue";

import { updateWindowUrl } from "@/shared/utils";
import { dateTime } from "@/shared/filters/date-time";
import { yesNo, nullable } from "@/shared/filters/utils";

import { canCreate, canEdit, canView } from "../bank-branch.auth";

const PAGE_TITLE = "Daftar Cabang Bank";
export default {
  name: "BankBranchList",
  metaInfo: {
    title: PAGE_TITLE,
  },

  components: {
    AuthBankSelector,
    BankBranchListTable,
    AprTextField,
    AprPagination,
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
      filter: currentQueries.has("filter")
        ? parseInt(currentQueries.get("filter"))
        : "",
    });
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
      if (search.filter.trim() !== "") {
        query.set("filter", search.filter.trim());
      }
      query.set("bank", selectedBankId.value);

      updateWindowUrl(
        route,
        `${PAGE_TITLE} - ${selectedBank.value.bank.name}`,
        query,
      );

      const url = `/banks/${selectedBankId.value}/branches`;
      isBusy.value = true;
      apiInvoker
        .get(`${url}?${query.toString()}`)
        .then(handleRefreshSuccess)
        .catch(handleRequestError("Gagal mendapatkan Data Cabang!"));
    };

    function handleRefreshSuccess(res) {
      isBusy.value = false;
      data.value = res.data.data;

      meta.page = res.data.meta.current_page;
      meta.prevPage =
        res.data.links.prev !== null || meta.page > 1 ? meta.page - 1 : null;
      meta.nextPage = res.data.links.next !== null ? meta.page + 1 : null;
      meta.total = res.data.meta.total;
    }
    const handleRequestError = title => err => {
      isBusy.value = false;
      const errorDetails = handleServiceError(err);
      Swal.fire(title, errorDetails.message, errorDetails.level);
    };
    const data = ref([]);

    const canCreateNewBranch = computed(() => canCreate(selectedBankId.value));
    const canEditBranch = computed(() => canEdit(selectedBankId.value));
    const canViewBranch = computed(() => canView(selectedBankId.value));

    function handleDeleteBranch(branch) {
      const url = `/banks/${selectedBankId.value}/branches/${branch.id}`;
      isBusy.value = true;
      apiInvoker
        .delete(url)
        .then(res => {
          isBusy.value = false;
          const data = res.data.data;
          const message = `Cabang Bank ${data.name} dengan ID ${data.id} berhasil dihapus!`;
          Swal.fire("Berhasil menghapus Cabang", message, "success");

          refreshData();
        })
        .catch(handleRequestError("Gagal menghapus Cabang!"));
    }

    return {
      meta,
      search,
      isBusy,
      data,
      handlePageChanged,
      refreshData,
      canCreateNewBranch,
      canEditBranch,
      canViewBranch,
      handleDeleteBranch,
    };
  },

  filters: { dateTime, yesNo, nullable },
};
