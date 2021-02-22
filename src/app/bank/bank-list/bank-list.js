import { useGetters } from "vuex-composition-helpers";
import { watch, toRef, ref, reactive, onMounted } from "@vue/composition-api";
import _isEmpty from "lodash/isEmpty";

import { updateWindowUrl } from "@/shared/utils";
import { handler as handleServiceError } from "@/shared/services/error-handler";

import Swal from "sweetalert2";

import AprPagination from "@/shared/components/apr-pagination/AprPagination.vue";
import AprTable from "@/shared/components/apr-table/AprTable.vue";
import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import useApiInvoker from "@/shared/services/api-invoker.service";

import { dateTime } from "@/shared/filters/date-time";

import { canCreateBank, canEditBank } from "../bank.auth";

export default {
  name: "BankList",
  metaInfo: {
    title: "Daftar Bank",
  },

  components: {
    AprPagination,
    AprTable,
    AprTextField,
  },

  setup(_, { root }) {
    const route = root.$route;

    const { apiAuthHeader } = useGetters(["apiAuthHeader"]);
    const { apiInvoker } = useApiInvoker({
      headers: apiAuthHeader.value,
    });

    const searchParams = new URLSearchParams(window.location.search);
    const search = ref(searchParams.get("filter") || "");
    const meta = reactive({
      page: 1,
      perPage: 25,
      prevPage: 0,
      nextPage: 2,
      total: 50,
      totalPage: 2,
    });
    const isBusy = ref(false);
    const tableData = ref([]);

    const handleSearchError = err => {
      isBusy.value = false;
      const errorDetails = handleServiceError(err);
      Swal.fire("Error", errorDetails.message, errorDetails.level);
    };

    const handleSearchData = () => {
      const url = "/banks";

      const queries = new URLSearchParams();
      queries.set("page", meta.page);
      if (!_isEmpty(search.value.trim())) {
        queries.set("name", search.value.trim());
      }

      updateWindowUrl(route, "Daftar Bank", queries);

      isBusy.value = true;
      apiInvoker
        .get(`${url}?nearest_only=0&${queries.toString()}`)
        .then(res => {
          isBusy.value = false;
          tableData.value = res.data.data;

          meta.perPage = res.data.meta.per_page;
          meta.totalPage = res.data.meta.last_page;
          meta.nextPage = res.data.links.next
            ? res.data.meta.current_page + 1
            : null;
          meta.prevPage = res.data.links.prev
            ? res.data.meta.current_page - 1
            : null;
          meta.page = res.data.meta.current_page;
          meta.total = res.data.meta.total;
        })
        .catch(handleSearchError);
    };

    onMounted(() => {
      handleSearchData();
    });

    const handlePageChanged = newPage => (meta.page = newPage);
    watch(toRef(meta, "page"), (newPage, oldPage) => {
      if (newPage !== oldPage) {
        // make sure that the page has been changed first
        root.$nextTick(() => {
          handleSearchData();
        });
      }
    });

    return {
      meta,
      search,
      isBusy,
      tableData,
      canCreateBank: canCreateBank(),
      canEditBank: bank => canEditBank(bank.id),
      handleSearchData,
      handlePageChanged,
      dateTimeLabel: dateTime,
    };
  },
};
