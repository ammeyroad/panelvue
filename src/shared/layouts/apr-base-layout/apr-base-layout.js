import { onMounted, onUnmounted } from "@vue/composition-api";

import AprNavbar from "@/shared/components/apr-navbar/AprNavbar.vue";
import ChangePasswordModal from "@/shared/components/change-password/ChangePasswordModal.vue";

export default {
  name: "AprBaseLayout",

  components: {
    AprNavbar,
    ChangePasswordModal,
  },

  setup() {
    const toggleNavbarFixedClass = isShow => {
      const className = "has-navbar-fixed-top";
      const html = document.querySelector("html");

      if (isShow) {
        html.classList.add(className);
        return;
      }

      html.classList.remove(className);
    };

    onMounted(() => {
      toggleNavbarFixedClass(true);
    });

    onUnmounted(() => {
      toggleNavbarFixedClass(false);
    });
  },
};
