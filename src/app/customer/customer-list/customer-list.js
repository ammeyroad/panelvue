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
import CustomerListTable from "./components/CustomerListTable";
import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import AprPagination from "@/shared/components/apr-pagination/AprPagination.vue";

import { updateWindowUrl } from "@/shared/utils";
import { dateTime } from "@/shared/filters/date-time";
import { yesNo, nullable } from "@/shared/filters/utils";

import { canCreate, canEdit, canView } from "../customer.auth";

const PAGE_TITLE = "Daftar Nasabah";
export default {
  name: "CustomerList",
  metaInfo: {
    title: PAGE_TITLE,
  },

  components: {
    AuthBankSelector,
    CustomerListTable,
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
      query.set("per_page", meta.page);
      if (search.filter.trim() !== "") {
        query.set("filter", search.filter.trim());
      }

      updateWindowUrl(
        route,
        `${PAGE_TITLE} - ${selectedBank.value.bank.name}`,
        query,
      );

      const url = `/banks/${selectedBankId.value}/customers`;
      isBusy.value = true;
      apiInvoker
        .get(`${url}?${query.toString()}`)
        .then(handleRefreshSuccess)
        .catch(handleRequestError);
    };

    function handleRefreshSuccess(res) {
      isBusy.value = false;
      data.value = res.data.data;

      meta.page = res.data.current_page;
      meta.prevPage = res.data.prev_page_url !== null ? meta.page - 1 : null;
      meta.nextPage = res.data.next_page_url !== null ? meta.page + 1 : null;
      meta.total = res.data.total;
    }
    function handleRequestError(err) {
      isBusy.value = false;
      const errorDetails = handleServiceError(err);
      Swal.fire("Error", errorDetails.message, errorDetails.level);
    }
    const data = ref([]);

    const canCreateNewCustomer = computed(() =>
      canCreate(selectedBankId.value),
    );
    const canEditCustomer = computed(() => canEdit(selectedBankId.value));
    const canViewCustomer = computed(() => canView(selectedBankId.value));

    return {
      meta,
      search,
      isBusy,
      data,
      handlePageChanged,
      refreshData,
      canCreateNewCustomer,
      canEditCustomer,
      canViewCustomer,
    };
  },

  filters: { dateTime, yesNo, nullable },
};
