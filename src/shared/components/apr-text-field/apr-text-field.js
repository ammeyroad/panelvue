import { computed } from "@vue/composition-api";

import RequiredLabel from "@/shared/components/RequiredLabel.vue";

export default {
  name: "AprTextField",
  components: { RequiredLabel },

  props: {
    errors: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: "",
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
      type: [String, Number],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: null,
    },
  },

  setup(props, { emit }) {
    const isErrorExist = computed(() => props.errors.length > 0);
    const isLabelExist = computed(() => !!props.label);

    return {
      emit,
      isErrorExist,
      isLabelExist,
    };
  },
};
