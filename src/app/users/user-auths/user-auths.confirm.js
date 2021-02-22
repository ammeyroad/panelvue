import { computed, ref } from "@vue/composition-api";

export const TYPE_REMOVE = "remove";
export const TYPE_UNDO = "undo";
export const TYPE_VALIDATE = "validate";

export function getConfirmationMessage(authId, action) {
  switch (action) {
    case TYPE_REMOVE:
      return `Metode Otentikasi '${authId}' berhasil dihapus.`;
    case TYPE_UNDO:
      return `Perubahan terhadap Metode Otentikasi berhasil dibatalkan. ID dikembalikan menjadi '${authId}'.`;
    case TYPE_VALIDATE:
      return `Metode Otentikasi '${authId}' berhasil divalidasi.`;
  }
}

const confirmModalType = ref(null);
const confirmModalActive = ref(false);
const confirmModalAuth = ref(null);
const confirmModalMessage = computed(() => {
  switch (confirmModalType.value) {
    case TYPE_REMOVE:
      return "Apakah Anda yakin ingin menghapus metode otentikasi ini?";
    case TYPE_UNDO:
      return "Apakah Anda yakin ingin membatalkan perubahan metode otentikasi ini?";
    case TYPE_VALIDATE:
      return "Apakah Anda yakin ingin memvalidasi metode otentikasi ini?";
    default:
      return "";
  }
});
const confirmModalTitle = computed(() => {
  switch (confirmModalType.value) {
    case TYPE_REMOVE:
      return "Konfirmasi Penghapusan Metode Otentikasi";
    case TYPE_UNDO:
      return "Konfirmasi Pembatalan Perubahan Metode Otentikasi";
    case TYPE_VALIDATE:
      return "Konfirmasi Validasi Metode Otentikasi";
    default:
      return "";
  }
});

export default {
  confirmModalActive,
  confirmModalType,
  confirmModalAuth,
  confirmModalMessage,
  confirmModalTitle,
};
