import { computed } from "@vue/composition-api";

import RequiredLabel from "@/shared/components/RequiredLabel.vue";

export default {
  name: "AprDateField",
  components: { RequiredLabel },

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
    locale: {
      type: String,
      default: "id-ID",
    },
    placeholder: {
      type: String,
      default: "",
    },
    min: {
      type: Date,
      default: null,
    },
    max: {
      type: Date,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Date,
      default: null,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    today: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const isErrorExist = computed(() => props.errors.length > 0);
    const isLabelExist = computed(() => !!props.label);
    const dateDisplayFormatter = date =>
      new Intl.DateTimeFormat(props.locale, {
        timezome: "UTC",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);

    return {
      emit,
      dateDisplayFormatter,
      isErrorExist,
      isLabelExist,
    };
  },
};
