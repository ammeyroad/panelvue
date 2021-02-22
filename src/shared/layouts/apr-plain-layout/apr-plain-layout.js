import { computed } from "@vue/composition-api";

export default {
  name: "AprPlainLayout",

  props: {
    backgroundImage: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const backgroundStyle = computed(() => {
      if (props.backgroundImage) {
        return `#ffffff url("${props.backgroundImage}") no-repeat center top`;
      }

      return false;
    });

    return { backgroundStyle };
  },
};
