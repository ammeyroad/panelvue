<template>
  <AprSelect
    :id="id"
    @input="handleBankChanged"
    :value="selectedBank"
    :items="userBanks"
    withoutAll
  />
</template>

<script>
import { useActions, useGetters } from "vuex-composition-helpers";
import { computed } from "@vue/composition-api";

import AprSelect from "@/shared/components/apr-select/AprSelect";

export default {
  name: "AuthBankSelector",
  components: { AprSelect },

  props: {
    id: {
      type: String,
      default: "bank-selector",
    },
  },

  setup() {
    const { selectedBankGetter, userBanks } = useGetters({
      selectedBankGetter: "selectedBank",
      userBanks: "userBanks",
    });
    const { updateSelectedBank } = useActions(["updateSelectedBank"]);
    const selectedBank = computed(() => selectedBankGetter.value.bank.id);
    const handleBankChanged = newBankId => {
      updateSelectedBank(newBankId);
    };

    return {
      selectedBank,
      handleBankChanged,
      userBanks,
    };
  },
};
</script>
