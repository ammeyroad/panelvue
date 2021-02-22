import _truncate from "lodash/truncate";

import { computed, ref } from "@vue/composition-api";

export const TYPE_REMOVE = "remove";

export function getConfirmationMessage(tokenId, action) {
  switch (action) {
    case TYPE_REMOVE:
      return `Token ${_truncate(tokenId, { length: 32 })} berhasil dihapus.`;
    default:
      return "";
  }
}

const confirmModalType = ref(null);
const confirmModalActive = ref(false);
const confirmModalToken = ref(null);
const confirmModalMessage = computed(() => {
  switch (confirmModalType.value) {
    case TYPE_REMOVE:
      return "Apakah Anda yakin ingin menghapus Token Akses ini?";
    default:
      return "";
  }
});
const confirmModalTitle = computed(() => {
  switch (confirmModalType.value) {
    case TYPE_REMOVE:
      return "Konfirmasi Penghapusan Token Akses";
    default:
      return "";
  }
});

export default {
  confirmModalActive,
  confirmModalType,
  confirmModalToken,
  confirmModalMessage,
  confirmModalTitle,
};
