import { computed } from "@vue/composition-api";

import RequiredLabel from "@/shared/components/RequiredLabel.vue";

export default {
  name: "AprSelect",
  components: { RequiredLabel },

  props: {
    errors: {
      type: Array,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    withoutAll: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
  },

  setup(props, { emit }) {
    const isErrorExist = computed(() => props.errors.length > 0);
    const isFullWidth = computed(() => props.fullWidth);
    const isLabelExist = computed(() => !!props.label);

    const isSelected = option => {
      return option === props.value;
    };

    const selectOption = option => {
      emit("input", option);
    };

    return {
      isErrorExist,
      isFullWidth,
      isLabelExist,
      isSelected,
      selectOption,
    };
  },
};
