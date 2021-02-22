<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <ValidationProvider
        v-slot="{ errors }"
        name="Jenis Otentikasi"
        :rules="edit ? {} : { required: true }"
      >
        <AprSelect
          v-model="auth_type"
          :errors="errors"
          :items="authTypes"
          :disabled="isBusy || edit"
          id="SelectAuthType"
          label="Jenis Otentikasi"
          placeholder="Pilih Jenis Otentikasi"
          fullWidth
        ></AprSelect>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors }"
        :name="authIdLabel"
        :debounce="500"
        rules="required|available"
      >
        <AprTextField
          v-model="auth_id"
          :errors="errors"
          :disabled="isBusy"
          :label="authIdLabel"
          id="TxtAuthId"
        ></AprTextField>
      </ValidationProvider>
    </form>
  </ValidationObserver>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { mapGetters } from "vuex";
import axios from "axios";

import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import AprSelect from "@/shared/components/apr-select/AprSelect.vue";

import useApiInvoker from "@/shared/services/api-invoker.service";

import { AUTH_TYPE } from "../users.constants";
import { getUserAuthApiUrl, checkAuthIdAvailable } from "../users.utils";

export default {
  name: "UserAuthForm",
  components: {
    ValidationObserver,
    ValidationProvider,
    AprTextField,
    AprSelect,
  },

  props: {
    authType: {
      type: String,
      required: false,
    },
    authId: {
      type: String,
      required: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    excludedAuthTypes: {
      type: Array,
      default: () => [],
    },
    user: {
      type: Object,
      required: false,
      default: () => null,
    },
  },

  mounted() {
    const vm = this;
    extend("required", {
      ...required,
      message: "{_field_} wajib diisi",
    });

    extend("available", {
      getMessage(field, params, data) {
        return (data && data.message) || "Terjadi kesalahan saat pengecekan!";
      },
      validate(value) {
        if (vm.edit) {
          if (vm.authId === value) {
            return {
              valid: false,
              message: "Tidak ada perubahan pada ID otentikasi!",
            };
          }
        }

        const authType = vm.auth_type;
        vm.isBusy = true;
        return checkAuthIdAvailable(value, authType, vm.user.id)
          .then(available => {
            vm.isBusy = false;
            return {
              valid: available,
              message: available ? undefined : vm.authIdTaken,
            };
          })
          .catch(err => {
            vm.isBusy = false;
            return {
              valid: false,
              message: axios.isCancel(err)
                ? "Permintaan dibatalkan!"
                : err.message,
            };
          });
      },
    });

    this.auth_type = this.authType;
    this.auth_id = this.authId;
  },

  watch: {
    authType(newVal) {
      this.auth_type = newVal;
    },
    authId(newVal) {
      this.auth_id = newVal;
    },
  },

  computed: {
    authTypes() {
      const authTypes = [
        { text: "Email", value: AUTH_TYPE.EMAIL },
        { text: "No. Telp. 1", value: AUTH_TYPE.PHONE1 },
        { text: "No. Telp. 2", value: AUTH_TYPE.PHONE2 },
      ];

      if (this.edit) return authTypes;
      const excluded = this.excludedAuthTypes;
      return authTypes.filter(t => !excluded.includes(t.value));
    },

    authIdLabel() {
      return this.auth_type === AUTH_TYPE.EMAIL ? "E-mail" : "No. Telp.";
    },

    authIdTaken() {
      return `${this.authIdLabel} tidak tersedia!`;
    },

    targetUser() {
      return this.user === null ? this.$store.state.user : this.user;
    },

    ...mapGetters(["apiAuthHeader"]),
  },

  data() {
    return {
      auth_type: null,
      auth_id: "",

      isBusy: false,
      requestCancelSource: null,
    };
  },

  beforeDestroy() {
    if (this.requestCancelSource) {
      this.requestCancelSource.cancel();
    }
  },

  methods: {
    handleRequestError(err) {
      this.isBusy = false;
      if (!axios.isCancel(err)) {
        this.$emit("error", { err, cancelSource: this.requestCancelSource });
      } else {
        this.$emit("error", { cancelSource: this.requestCancelSource });
      }
      this.requestCancelSource = null;
      throw err;
    },

    submitForm() {
      const url = getUserAuthApiUrl(this.targetUser.id, this.auth_type);
      const { apiInvoker, cancelSource } = useApiInvoker({
        headers: this.apiAuthHeader,
      });
      this.requestCancelSource = cancelSource.value;
      const data = { auth_id: this.auth_id };
      const vm = this;
      vm.isBusy = true;
      vm.$emit("processing", cancelSource);
      apiInvoker
        .patch(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          vm.isBusy = false;
          vm.requestCancelSource = null;

          vm.$emit("success", {
            authId: vm.authId,
            authType: vm.authType,
          });
        })
        .catch(this.handleRequestError)
        .catch(() => null); // suppress any error caught at this point.
    },
  },
};
</script>
