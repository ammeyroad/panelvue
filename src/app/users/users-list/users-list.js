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
import AprSelect from "@/shared/components/apr-select/AprSelect.vue";
import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import AprPagination from "@/shared/components/apr-pagination/AprPagination.vue";

import { updateWindowUrl } from "@/shared/utils";
import { dateTime } from "@/shared/filters/date-time";
import { yesNo, nullable } from "@/shared/filters/utils";

import UserListTable from "../components/UserListTable";
import { canCreate, canEdit, canView, canDelete } from "../users.auth";
import { DEFAULT_ROLE } from "../users.constants";

const PAGE_TITLE = "Daftar Pengguna";
export default {
  name: "UserList",
  metaInfo: {
    title: PAGE_TITLE,
  },

  components: {
    AuthBankSelector,
    UserListTable,
    AprTextField,
    AprPagination,
    AprSelect,
  },

  setup(_, { root }) {
    const route = root.$route;
    const { apiAuthHeader } = useGetters(["apiAuthHeader"]);
    const { apiInvoker } = useApiInvoker({
      headers: apiAuthHeader.value,
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
      defaultRole: currentQueries.has("default_role")
        ? parseInt(currentQueries.get("default_role"))
        : null,
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
      if (isBusy.value) {
        return;
      }
      isBusy.value = true;
      const query = new URLSearchParams();
      query.set("page", meta.page);
      query.set("length", meta.perPage);
      if (search.filter.trim() !== "") {
        query.set("filter", search.filter.trim());
      }
      if (search.defaultRole) {
        query.set("default_role", search.defaultRole);
      }

      updateWindowUrl(route, `${PAGE_TITLE}`, query);

      const url = `/users`;
      isBusy.value = true;
      apiInvoker
        .get(`${url}?${query.toString()}`)
        .then(handleRefreshSuccess)
        .catch(handleRequestError("Gagal Mendapatkan Daftar Pengguna!"));
    };

    function handleRefreshSuccess(res) {
      isBusy.value = false;
      data.value = res.data.data;

      meta.page = res.data.meta.current_page;
      meta.prevPage = meta.page === 1 ? null : meta.page - 1;
      meta.nextPage =
        res.data.meta.last_page > meta.page ? meta.page + 1 : null;
      meta.total = res.data.meta.total;
    }
    const handleRequestError = title => err => {
      isBusy.value = false;
      const errorDetails = handleServiceError(err);
      Swal.fire(title, errorDetails.message, errorDetails.level);
    };
    const data = ref([]);
    const roles = computed(() => [
      { text: "Semua Jenis", value: null },
      { text: "Hanya Customer", value: DEFAULT_ROLE.CUSTOMER },
      { text: "Hanya Petugas Bank", value: DEFAULT_ROLE.BANK_OFFICER },
      { text: "Hanya Admin", value: DEFAULT_ROLE.ADMIN },
    ]);
    const canCreateUser = computed(() => canCreate());
    const canEditUser = computed(() => canEdit());
    const canDeleteUser = computed(() => canDelete());
    const canViewUser = computed(() => canView());

    const confirmDeleteUser = user => {
      if (!user) {
        return;
      }

      root.$buefy.dialog.confirm({
        title: "Konfirmasi Penghapusan Pengguna",
        message: `
          Apakah Anda yakin ingin menghapus Pengguna ${user.full_name}?
          Data pengguna dan akses login ke aplikasi akan dihapus, namun data pengguna yang terkait dengan Bank
          (pengajuan rekening, nasabah, dsb.) tidak akan dihapus.
        `,
        onConfirm: () => deleteUser(user),
      });
    };

    const deleteUser = user => {
      const url = `/users/${user.id}`;
      isBusy.value = true;

      apiInvoker
        .delete(url)
        .then(() => {
          isBusy.value = false;
          const message = `Pengguna ${user.full_name} dengan ID ${user.id} berhasil dihapus!`;
          Swal.fire("Berhasil Menghapus Pengguna!", message, "success");

          refreshData();
        })
        .catch(handleRequestError("Gagal Menghapus Pengguna!"));
    };

    return {
      meta,
      search,
      isBusy,
      data,
      roles,
      handlePageChanged,
      refreshData,
      confirmDeleteUser,
      canDeleteUser,
      canCreateUser,
      canEditUser,
      canViewUser,
    };
  },

  filters: { dateTime, yesNo, nullable },
};
