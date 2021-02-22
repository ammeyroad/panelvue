import { computed, ref } from "@vue/composition-api";

export const TYPE_REMOVE = "remove";

export function getConfirmationMessage(bankName, action) {
  switch (action) {
    case TYPE_REMOVE:
      return `Hak Akses Pengguna pada Bank '${bankName}' berhasil dihapus.`;
    default:
      return "";
  }
}

const confirmModalType = ref(null);
const confirmModalActive = ref(false);
const confirmModalRole = ref(null);
const confirmModalMessage = computed(() => {
  switch (confirmModalType.value) {
    case TYPE_REMOVE:
      return "Apakah Anda yakin ingin menghapus Hak Akses ini?";
    default:
      return "";
  }
});
const confirmModalTitle = computed(() => {
  switch (confirmModalType.value) {
    case TYPE_REMOVE:
      return "Konfirmasi Penghapusan Hak Akses";
    default:
      return "";
  }
});

export default {
  confirmModalActive,
  confirmModalType,
  confirmModalRole,
  confirmModalMessage,
  confirmModalTitle,
};
