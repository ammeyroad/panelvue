import {
  computed,
  ref,
  onBeforeUnmount,
  onBeforeMount,
} from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";
import axios from "axios";
import Swal from "sweetalert2";
import { ValidationObserver } from "vee-validate";

import useApiInvoker from "@/shared/services/api-invoker.service";
import { handler as handleServiceError } from "@/shared/services/error-handler";

import { isBusy, cancelSources, removeCancelSource } from "./user-roles.common";
import userRolesForm from "./user-roles.form";
import confirmModal, {
  TYPE_REMOVE,
  getConfirmationMessage,
} from "./user-roles.confirm";

import { parseISO } from "date-fns";

import UserRoleListTable from "../components/UserRoleListTable";
import UserRoleForm from "../components/UserRoleForm";

export default {
  name: "UserRoles",
  components: { UserRoleListTable, ValidationObserver, UserRoleForm },

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
      const url = `/users/${props.id}/roles`;
      const { apiInvoker, cancelSource } = refreshDataApi;
      cancelSources.push(cancelSource.value);
      isBusy.value = true;
      apiInvoker
        .get(url)
        .then(res => {
          removeCancelSource(cancelSource.value);
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
    const existingBanks = computed(() => roles.value.map(role => role.bank.id));

    const {
      confirmModalRole,
      confirmModalType,
      confirmModalActive,
    } = confirmModal;
    const handleRoleRemove = role => {
      confirmModalRole.value = role;
      confirmModalType.value = TYPE_REMOVE;
      confirmModalActive.value = true;
    };
    const handleConfirmation = (closeCallback = null) => {
      let url = `/users/${props.id}/roles/${confirmModalRole.bank.id}`;
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
            confirmModalRole.value.role_id,
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

    const { roleFormActive, roleForm, roleFormEdit } = userRolesForm;
    const handleRoleCreate = () => {
      roleForm.roleBank = null;
      roleForm.roleType = null;
      roleForm.validUntil = null;
      roleFormEdit.value = false;
      roleFormActive.value = true;
    };
    const handleRoleEdit = role => {
      roleForm.roleBank = role.bank.id;
      roleForm.roleType = role.role;
      roleForm.validUntil = role.valid_until
        ? parseISO(role.valid_until)
        : null;
      roleFormEdit.value = true;
      roleFormActive.value = true;
    };
    const handleFormSubmit = () => {
      refs.roleForm.submitForm();
    };

    return {
      isBusy,
      user,
      roles,
      existingBanks,
      refreshData,
      handleRoleRemove,
      handleRoleCreate,
      handleRoleEdit,
      handleConfirmation,
      handleFormSubmit,
      ...confirmModal,
      ...userRolesForm,
    };
  },
};
