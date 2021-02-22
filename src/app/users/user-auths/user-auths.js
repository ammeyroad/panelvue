import {
  computed,
  ref,
  onBeforeMount,
  onBeforeUnmount,
} from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";
import axios from "axios";
import Swal from "sweetalert2";
import { ValidationObserver } from "vee-validate";

import useApiInvoker from "@/shared/services/api-invoker.service";
import { handler as handleServiceError } from "@/shared/services/error-handler";

import { isBusy, cancelSources, removeCancelSource } from "./user-auths.common";
import userAuthsForm from "./user-auths.form";
import confirmModal, {
  TYPE_UNDO,
  TYPE_REMOVE,
  TYPE_VALIDATE,
  getConfirmationMessage,
} from "./user-auths.confirm";
import { getUserAuthApiUrl } from "../users.utils";

import UserAuthListTable from "../components/UserAuthListTable";
import UserAuthForm from "../components/UserAuthForm";
import { EMPTY_USER } from "../users.constants";

export default {
  name: "UserAuths",

  components: { ValidationObserver, UserAuthListTable, UserAuthForm },

  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },

  setup(props, { refs }) {
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

    onBeforeMount(() => {
      fetchUser().then(refreshData);
    });
    const fetchUser = () => {
      const url = `/users/${props.id}`;
      const { apiInvoker, cancelSource } = useApiInvoker({
        headers: apiAuthHeader.value,
      });

      isBusy.value = true;
      cancelSources.push(cancelSource);
      return apiInvoker
        .get(url)
        .then(res => {
          removeCancelSource(cancelSource);
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
      const url = `/users/${props.id}/auths`;
      const { apiInvoker, cancelSource } = refreshDataApi;
      cancelSources.push(cancelSource.value);
      isBusy.value = true;
      apiInvoker
        .get(url)
        .then(res => {
          removeCancelSource(cancelSource.value);
          auths.value = res.data.data;
        })
        .catch(err =>
          handleRequestError(
            err,
            "Gagal Mendapatkan Data Otentikasi!",
            cancelSource,
          ),
        );
    };
    const auths = ref([]);
    const existingAuthTypes = computed(() =>
      auths.value.map(auth => auth.auth_type),
    );

    const {
      confirmModalAuth,
      confirmModalType,
      confirmModalActive,
    } = confirmModal;
    const handleAuthRemove = auth => {
      confirmModalAuth.value = auth;
      confirmModalType.value = TYPE_REMOVE;
      confirmModalActive.value = true;
    };
    const handleAuthUndoUpdate = auth => {
      confirmModalAuth.value = auth;
      confirmModalType.value = TYPE_UNDO;
      confirmModalActive.value = true;
    };
    const handleAuthValidate = auth => {
      confirmModalAuth.value = auth;
      confirmModalType.value = TYPE_VALIDATE;
      confirmModalActive.value = true;
    };
    const handleConfirmation = (closeCallback = null) => {
      let url = getUserAuthApiUrl(props.id, confirmModalAuth.value.auth_type);
      let method;
      const data = {};
      switch (confirmModalType.value) {
        case TYPE_VALIDATE:
          url += "/verify";
          method = "post";
          break;
        case TYPE_UNDO:
          url += "update";
          method = "delete";
          break;
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
      cancelSources.push(cancelSource.value);
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
          removeCancelSource(cancelSource.value);
          const message = getConfirmationMessage(
            confirmModalAuth.value.auth_id,
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

    const { authFormActive, authForm, authFormEdit } = userAuthsForm;
    const handleAuthCreate = () => {
      authForm.authId = "";
      authForm.authType = null;
      authFormEdit.value = false;
      authFormActive.value = true;
    };
    const handleAuthEdit = auth => {
      authForm.authId = auth.auth_id;
      authForm.authType = auth.auth_type;
      authFormEdit.value = true;
      authFormActive.value = true;
    };
    const canCreateAuth = computed(() => existingAuthTypes.value.length < 3); // max auth is 3 per user.
    const handleFormSubmit = () => {
      refs.authForm.submitForm();
    };
    const user = ref(EMPTY_USER);

    return {
      isBusy,
      user,
      auths,
      existingAuthTypes,
      refreshData,
      handleAuthRemove,
      handleAuthUndoUpdate,
      handleAuthCreate,
      handleAuthEdit,
      handleAuthValidate,
      handleConfirmation,
      handleFormSubmit,
      canCreateAuth,
      ...confirmModal,
      ...userAuthsForm,
    };
  },
};
