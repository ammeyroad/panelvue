import Swal from "sweetalert2";
import { ref, computed, reactive } from "@vue/composition-api";

import { handler as handleServiceError } from "@/shared/services/error-handler";

import { isBusy, cancelSources, removeCancelSource } from "./user-auths.common";

const authFormEdit = ref(false);
const authFormActive = ref(false);
const authForm = reactive({
  authId: "",
  authType: null,
});

const authFormTitle = computed(() =>
  authFormEdit.value ? "Ubah Metode Otentikasi" : "Buat Metode Otentikasi Baru",
);

const handleFormProcessing = cancelSource => {
  isBusy.value = true;
  cancelSources.push(cancelSource);
};

const handleFormSuccess = ({ auth, cancelSource }, closeCallback = null) => {
  isBusy.value = false;
  const isEdit = authFormEdit.value;

  let message;
  if (isEdit) {
    message = `Berhasil mengubah metode otentikasi menjadi '${auth.auth_id}'!`;
  } else {
    message = `Berhasil membuat metode otentikasi baru dengan ID '${auth.auth_id}'`;
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
  authForm,
  authFormEdit,
  authFormTitle,
  authFormActive,
  handleFormProcessing,
  handleFormSuccess,
  handleFormError,
};
