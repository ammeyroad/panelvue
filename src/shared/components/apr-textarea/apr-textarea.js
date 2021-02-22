import { computed } from "@vue/composition-api";

export default {
  name: "AprTextarea",

  props: {
    errors: {
      type: Array,
      default() {
        return [];
      },
    },
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    noResize: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    rows: {
      type: [Number, String],
      default: 3,
    },
    name: {
      type: String,
      default: null,
    },
  },

  setup(props, { emit }) {
    const isErrorExist = computed(() => props.errors.length > 0);
    const isLabelExist = computed(() => !!props.label);
    const resize = computed(() => (props.noResize ? "none" : "vertical"));

    return {
      emit,
      isErrorExist,
      isLabelExist,
      resize,
    };
  },
};
