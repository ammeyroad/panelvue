import { ref } from "@vue/composition-api";
import { useActions, useGetters } from "vuex-composition-helpers";

export default {
  name: "AprNavbar",

  setup(_, { root }) {
    const router = root.$router;
    const { pages } = useGetters({ pages: "menus" });
    const { logout, updatePasswordModal } = useActions({
      logout: "logout",
      updatePasswordModal: "updatePasswordModal",
    });
    const navbarLogo = ref("/images/logo.png");

    const handleLogout = () => {
      logout();
      router.push("/login");
    };
    const handleChangePassword = () => {
      updatePasswordModal(true);
    };

    return {
      pages,
      handleLogout,
      handleChangePassword,
      navbarLogo,
    };
  },
};
