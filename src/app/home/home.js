import { useState } from "vuex-composition-helpers";

import AprBaseLayout from "@/shared/layouts/apr-base-layout/AprBaseLayout.vue";

export default {
  name: "Home",
  components: {
    AprBaseLayout,
  },

  setup() {
    const { user } = useState(["user"]);

    return {
      user,
    };
  },
};
