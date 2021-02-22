import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
} from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";
import axios from "axios";
import Swal from "sweetalert2";

import useApiInvoker from "@/shared/services/api-invoker.service";
import { handler as handleServiceError } from "@/shared/services/error-handler";

import UserTokenListTable from "../components/UserTokenListTable";

import {
  isBusy,
  cancelSources,
  removeCancelSource,
} from "./user-tokens.common";
import confirmModal, {
  TYPE_REMOVE,
  getConfirmationMessage,
} from "./user-tokens.confirm";

export default {
  name: "UserTokens",
  components: { UserTokenListTable },

  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },

  setup(props) {
    const { apiAuthHeader } = useGetters(["apiAuthHeader"]);
    const handleRequestError = (err, title, cancelSource) => {
      removeCancelSource(cancelSource);
      if (axios.isCancel(err)) return;

      const errors = handleServiceError(err);
      Swal.fire({
        title,
        text: errors.message,
        icon: errors.level,
      });
    };

    onBeforeUnmount(() => {
      cancelSources.forEach(source => {
        console.debug(source);
      });
    });

    onMounted(() => {
      fetchUser();
      refreshData();
    });
    const user = ref(null);
    const fetchUser = () => {
      const url = `/users/${props.id}`;
      const { apiInvoker, cancelSource } = useApiInvoker({
        headers: apiAuthHeader.value,
      });

      isBusy.value = true;
      cancelSources.push(cancelSource.value);
      apiInvoker
        .get(url)
        .then(res => {
          removeCancelSource(cancelSource.value);
          user.value = res.data.data;
        })
        .catch(err =>
          handleRequestError(
            err,
            "Gagal Mendapatkan Data Pengguna!",
            cancelSource,
          ),
        );
    };

    const refreshDataApi = useApiInvoker({
      headers: apiAuthHeader.value,
    });
    const refreshData = () => {
      const url = `/users/${props.id}/tokens`;
      const { apiInvoker, cancelSource } = refreshDataApi;
      cancelSources.push(cancelSource.value);
      isBusy.value = true;
      apiInvoker
        .get(url)
        .then(res => {
          removeCancelSource(cancelSource);
          roles.value = res.data.data;
        })
        .catch(err =>
          handleRequestError(
            err,
            "Gagal Mendapatkan Data Hak Akses!",
            cancelSource,
          ),
        );
    };
    const roles = ref([]);
    const existingBanks = computed(() => roles.map(role => role.bank.id));

    const {
      confirmModalToken,
      confirmModalType,
      confirmModalActive,
    } = confirmModal;
    const handleTokenRemove = token => {
      confirmModalToken.value = token;
      confirmModalType.value = TYPE_REMOVE;
      confirmModalActive.value = true;
    };
    const handleConfirmation = (closeCallback = null) => {
      let url = `/users/${props.id}/tokens/${confirmModalToken.value.api_token}`;
      let method;
      const data = {};
      switch (confirmModalType.value) {
        case TYPE_REMOVE:
          url += "";
          method = "delete";
          break;
        default:
          throw new Error(`Unknown type ${confirmModalType.value}!`);
      }

      const { apiInvoker, cancelSource } = useApiInvoker({
        headers: apiAuthHeader.value,
      });
      cancelSources.push(cancelSource);
      isBusy.value = true;
      const promise =
        method === "delete"
          ? apiInvoker.delete(url)
          : apiInvoker({
              url,
              method,
              data,
              headers: { "Content-Type": "application/json" },
            });
      promise
        .then(() => {
          const message = getConfirmationMessage(
            confirmModalToken.value.api_token,
            confirmModalType.value,
          );

          Swal.fire("Perubahan Berhasil", message, "success");
          if (closeCallback) {
            closeCallback();
          }
          refreshData();
        })
        .catch(err =>
          handleRequestError(err, "Gagal Melakukan Konfirmasi", cancelSource),
        );
    };

    return {
      isBusy,
      user,
      roles: roles,
      existingRoleTypes: existingBanks,
      refreshData,
      handleTokenRemove,
      handleConfirmation,
      ...confirmModal,
    };
  },
};
