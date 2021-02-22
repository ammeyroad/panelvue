import { ref, reactive, computed } from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";
import Swal from "sweetalert2";
import axios from "axios";
import _isEmpty from "lodash/isEmpty";
import { format as formatDate, startOfDay, subYears } from "date-fns";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";

import { AUTH_TYPE, DEFAULT_ROLE } from "../users.constants";

import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import AprSelect from "@/shared/components/apr-select/AprSelect.vue";
import AprUploadFile from "@/shared/components/apr-upload-file/AprUploadFile.vue";
import AprDateField from "@/shared/components/apr-date-field/AprDateField.vue";
import RequiredLabel from "@/shared/components/RequiredLabel.vue";

import handleServiceError from "@/shared/services/error-handler";
import useApiInvoker from "@/shared/services/api-invoker.service";

import { checkAuthIdAvailable } from "../users.utils";

extend("required", {
  ...required,
  message: "{_field_} wajib diisi",
});

extend("min", {
  ...min,
  message: "Panjang minimal {_field_} adalah {length} karakter",
});

extend("available", {
  getMessage(field, params, data) {
    return (data && data.message) || "Terjadi kesalahan saat pengecekan!";
  },
  validate(value, args) {
    if (_isEmpty(value)) {
      return { valid: true, message: undefined };
    }
    if (value.trim() === "") {
      return { valid: true, message: undefined };
    }

    const authType = args.authType;
    return checkAuthIdAvailable(value, authType)
      .then(available => {
        const invalidMessage =
          authType === AUTH_TYPE.EMAIL
            ? "Email tidak tersedia!"
            : "No. Telp. tidak tersedia!";
        return {
          valid: available,
          message: available ? undefined : invalidMessage,
        };
      })
      .catch(err => {
        return {
          valid: false,
          message: axios.isCancel(err) ? "Permintaan dibatalkan!" : err.message,
        };
      });
  },
  params: ["authType"],
});

export default {
  name: "UserCreate",
  metaInfo: {
    title: "Buat Pengguna Baru",
  },

  components: {
    AprSelect,
    AprTextField,
    AprDateField,
    AprUploadFile,
    RequiredLabel,
    ValidationObserver,
    ValidationProvider,
  },

  setup(_, { root }) {
    const router = root.$router;
    const { apiAuthHeader } = useGetters({
      apiAuthHeader: "apiAuthHeader",
    });

    const form = reactive({
      firstMiddleName: "",
      lastName: "",
      defaultRole: DEFAULT_ROLE.CUSTOMER,
      gender: "M",
      dateOfBirth: null,
      phoneNo: "",
      email: "",
      password: "",
      passwordAuto: true,
      profilePicture: null,
      authVerify: false,
    });
    const defaultRoles = computed(() => [
      { text: "Nasabah", value: DEFAULT_ROLE.CUSTOMER },
      { text: "Petugas Bank", value: DEFAULT_ROLE.BANK_OFFICER },
      { text: "Admin", value: DEFAULT_ROLE.ADMIN },
    ]);
    const genders = computed(() => [
      { text: "Pria", value: "M" },
      { text: "Wanita", value: "F" },
    ]);
    const isBusy = ref(false);

    const submitForm = () => {
      const url = `/users`;
      const data = new FormData();
      data.set("first_middle_name", form.firstMiddleName);
      data.set("last_name", form.lastName);
      data.set("default_role", form.defaultRole);
      data.set("gender", form.gender);
      data.set("date_of_birth", formatDate(form.dateOfBirth, "yyyy-MM-dd"));
      if (form.passwordAuto) {
        data.set("password_auto", "1");
      } else {
        data.set("password", form.password);
      }
      if (form.profilePicture !== null) {
        data.set("profile_picture", form.profilePicture);
      }
      if (form.email.trim() !== "") {
        data.set("email", form.email);
      }
      if (form.phoneNo.trim() !== "") {
        data.set("phone_no", form.phoneNo);
      }
      if (form.authVerify) {
        data.set("auth_verify", "1");
      }

      isBusy.value = true;
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });
      apiInvoker
        .post(url, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(handleSubmitSuccess)
        .catch(handleError);
    };
    const handleSubmitSuccess = res => {
      isBusy.value = false;
      const newUser = res.data.data;
      let message = `Pengguna '${newUser.full_name}' berhasil dibuat dengan ID ${newUser.id}! `;
      if (res.data.password_plain) {
        message += `Password: ${res.data.password_plain}`;
      }
      Swal.fire("Pengguna Berhasil Dibuat", message, "success");
      router.push("/users");
    };
    const handleError = err => {
      isBusy.value = false;
      const errors = handleServiceError(err);
      Swal.fire("Gagal Simpan!", errors.message, errors.level);
    };

    const phoneNoRules = computed(() => {
      const rules = { available: { authType: AUTH_TYPE.PHONE1 } };
      if (form.defaultRole === DEFAULT_ROLE.CUSTOMER) {
        rules.required = true;
      }
      return rules;
    });
    const emailRules = computed(() => {
      const rules = { available: { authType: AUTH_TYPE.EMAIL } };
      if (form.defaultRole !== DEFAULT_ROLE.CUSTOMER) {
        rules.required = true;
      }
      return rules;
    });
    const passwordRules = computed(() => {
      if (form.passwordAuto) {
        return {};
      }
      return { required: true, min: { length: 6 } };
    });

    const maxDateOfBirth = computed(() => startOfDay(subYears(new Date(), 17)));

    return {
      form,
      genders,
      defaultRoles,
      isBusy,
      submitForm,
      phoneNoRules,
      emailRules,
      passwordRules,
      maxDateOfBirth,
    };
  },
};
