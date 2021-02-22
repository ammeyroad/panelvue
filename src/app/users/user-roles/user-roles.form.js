import Swal from "sweetalert2";
import { ref, computed, reactive } from "@vue/composition-api";

import { handler as handleServiceError } from "@/shared/services/error-handler";

import { isBusy, cancelSources, removeCancelSource } from "./user-roles.common";

const roleFormEdit = ref(false);
const roleFormActive = ref(false);
const roleForm = reactive({
  roleBank: null,
  roleType: null,
  validUntil: null,
});

const roleFormTitle = computed(() =>
  roleFormEdit.value ? "Ubah Hak Akses" : "Buat Hak Akses Baru",
);

const handleFormProcessing = cancelSource => {
  isBusy.value = true;
  cancelSources.push(cancelSource);
};

const handleFormSuccess = ({ role, cancelSource }, closeCallback = null) => {
  isBusy.value = false;
  const isEdit = roleFormEdit.value;

  let message;
  if (isEdit) {
    message = `Berhasil mengubah hak akses pada ${role.bank.name}!`;
  } else {
    message = `Berhasil membuat hak akses pada ${role.bank.name}!`;
  }
  Swal.fire({
    title: "Penyimpanan Berhasil!",
    text: message,
    icon: "success",
    timer: 5000,
  });

  if (cancelSource) {
    removeCancelSource(cancelSource);
  }
  if (closeCallback) {
    closeCallback();
  }
};

const handleFormError = ({ err, cancelSource }) => {
  if (cancelSource) {
    removeCancelSource(cancelSource);
  }
  if (err) {
    const error = handleServiceError(err);
    Swal.fire("Gagal Menyimpan Permintaan!", error.message, error.level);
  }
};

export default {
  roleForm,
  roleFormEdit,
  roleFormTitle,
  roleFormActive,
  handleFormProcessing,
  handleFormSuccess,
  handleFormError,
};
