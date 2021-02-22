import { ref } from "@vue/composition-api";

export const isBusy = ref(false);
export const cancelSources = [];

export function removeCancelSource(cancelSource) {
  if (cancelSource) {
    const existingTokenIdx = cancelSources.findIndex(s =>
      Object.is(s, cancelSource),
    );
    if (existingTokenIdx !== -1) {
      cancelSources.splice(existingTokenIdx, 1);
    }
  }
  isBusy.value = false;
}
