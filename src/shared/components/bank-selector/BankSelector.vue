<template>
  <AprSelect
    @input="handleBankChanged"
    :id="id"
    :value="value"
    :items="availableBanks"
    withoutAll
  />
</template>

<script>
import _forEach from "lodash/forEach";
import _has from "lodash/has";

import AprSelect from "@/shared/components/apr-select/AprSelect";
import { computed } from "@vue/composition-api";

export default {
  name: "BankSelector",
  components: { AprSelect },

  props: {
    id: {
      type: String,
      default: "bank-selector",
    },
    banks: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: null,
    },
  },

  setup(props, { emit }) {
    const availableBanks = computed(() => {
      return props.banks.map(bank => {
        const requiredKeys = ["text", "value"];
        let isPlain = true;
        _forEach(requiredKeys, key => {
          isPlain = _has(bank, key);
          return isPlain;
        });
        return isPlain ? bank : { text: bank.name, value: bank.id };
      });
    });

    const handleBankChanged = newBankId => {
      emit("input", newBankId);
    };

    return { handleBankChanged, availableBanks };
  },
};
</script>
