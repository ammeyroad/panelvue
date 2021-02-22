import { onMounted, onUnmounted, reactive, watch } from "@vue/composition-api";

export default {
  name: "AprModal",

  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
      default: "auto",
    },
    value: {
      type: Boolean,
      defualt: false,
    },
  },

  setup(props) {
    const IS_CLIPPED = "is-clipped";

    const state = reactive({
      html: document.querySelector("html"),
      validWidth: "auto",
    });

    watch(
      () => props.value,
      value => {
        if (value) {
          addClippedOnHtml();
          return;
        }

        removeClippedOnHtml();
      },
    );

    const isHtmlClipped = () => {
      return state.html.classList.contains(IS_CLIPPED);
    };

    const addClippedOnHtml = () => {
      if (!isHtmlClipped()) {
        state.html.classList.add(IS_CLIPPED);
      }
    };

    const removeClippedOnHtml = () => {
      if (isHtmlClipped()) {
        state.html.classList.remove(IS_CLIPPED);
      }
    };

    const setValidWidth = () => {
      if (props.width === "auto") {
        state.validWidth = "auto";
        return;
      }

      if (typeof props.width === "string") {
        state.validWidth = props.width;
        return;
      }

      state.validWidth = `${props.width}px`;
    };

    onMounted(() => {
      setValidWidth();
    });

    onUnmounted(() => {
      removeClippedOnHtml();
    });

    return { state };
  },
};
