import { ref } from "@vue/composition-api";
import { useActions } from "vuex-composition-helpers";
import Swal from "sweetalert2";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import AprPlainLayout from "@/shared/layouts/apr-plain-layout/AprPlainLayout.vue";
import useApiInvoker from "@/shared/services/api-invoker.service";
import { handler as handleServiceError } from "@/shared/services/error-handler";
import { DEFAULT_ROLE } from "../users/users.constants";

extend("required", {
  ...required,
  message: "{_field_} wajib diisi",
});

export default {
  name: "Login",
  metaInfo: {
    title: "Login",
  },

  components: {
    AprPlainLayout,
    AprTextField,
    ValidationObserver,
    ValidationProvider,
  },

  setup(_, { root }) {
    const router = root.$router;
    const { apiInvoker } = useApiInvoker();

    const backgroundImage = ref("../../../public/images/");
    const logo = ref("./images/logo.png");
    const password = ref("");
    const username = ref("");
    const isBusy = ref(false);

    const handleLoginError = err => {
      isBusy.value = false;
      const errorDetails = handleServiceError(err);
      Swal.fire("Error", errorDetails.message, errorDetails.level);
    };

    const { updateUser, updateApiToken } = useActions({
      updateUser: "updateUser",
      updateApiToken: "updateApiToken",
    });

    const handleLoginSuccess = res => {
      isBusy.value = false;

      const user = res.data.user;
      if (user.default_role === DEFAULT_ROLE.CUSTOMER) {
        throw new Error("Customer tidak bisa mengakses portal ini!");
      }

      const token = res.data.token;
      const tokenPayload = {
        token: {
          token: token.api_token,
          authId: token.auth_id,
          expiresAt: token.valid_until,
        },
        persist: true,
      };

      updateApiToken(tokenPayload);
      updateUser(user);

      // move to next page
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get("redirect") || "/home";
      router.push(redirectUrl);
    };

    const submitForm = () => {
      const data = {
        username: username.value,
        password: password.value,
      };

      isBusy.value = true;
      apiInvoker
        .post("auth/login", data)
        .then(handleLoginSuccess)
        .catch(handleLoginError);
    };

    return {
      backgroundImage,
      password,
      submitForm,
      logo,
      username,
      isBusy,
    };
  },
};
