import { computed, reactive } from "@vue/composition-api";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "AprPagination",

  components: {
    FontAwesomeIcon,
  },

  props: {
    meta: {
      type: Object,
      default() {
        return {
          page: 0,
          perPage: 0,
          prevPage: 0,
          nextPage: 0,
          total: 0,
          totalPage: 0,
        };
      },
    },
  },

  setup(props, { emit }) {
    const icon = reactive({
      left: faChevronLeft,
      right: faChevronRight,
    });

    const isPreviousPage = computed(() => props.meta.prevPage);
    const isNextPage = computed(() => !!props.meta.nextPage);

    return {
      emit,
      icon,
      isPreviousPage,
      isNextPage,
    };
  },
};
