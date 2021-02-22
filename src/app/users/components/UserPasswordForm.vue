<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <ValidationProvider
        v-if="currentPassword"
        v-slot="{ errors }"
        :rules="required ? { required } : {}"
        vid="current_password"
        name="Password Saat Ini"
      >
        <AprTextField
          v-model="current_password"
          :errors="errors"
          :disabled="disabled"
          type="password"
          label="Password Saat Ini"
          name="current_password"
        ></AprTextField>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors }"
        vid="password"
        name="Password Baru"
        :rules="passwordRules"
      >
        <AprTextField
          v-model="password"
          :errors="errors"
          :disabled="disabled"
          type="password"
          label="Password Baru"
          name="password"
        ></AprTextField>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors }"
        :rules="passwordConfirmationRules"
        vid="password_confirmed"
        name="Konfirmasi Password Baru"
      >
        <AprTextField
          v-model="password_confirm"
          :errors="errors"
          :disabled="disabled"
          type="password"
          label="Konfirmasi Password Baru"
          name="password_confirmed"
        ></AprTextField>
      </ValidationProvider>
    </form>
  </ValidationObserver>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { is_not } from "vee-validate/dist/rules";

import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";

export default {
  name: "UserPasswordForm",
  components: { ValidationObserver, ValidationProvider, AprTextField },

  props: {
    currentPassword: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    extend("password_new", {
      ...is_not,
      message: "Password baru tidak boleh sama dengan password lama!",
    });
  },

  computed: {
    passwordRules() {
      if (!this.required) {
        return {};
      }

      const rules = { required: true };
      if (this.currentPassword) {
        rules.password_new = { value: this.current_password };
      }
      return rules;
    },
    passwordConfirmationRules() {
      if (!this.required) {
        return {};
      }
      return {
        required: true,
        confirmed: { target: "password" },
      };
    },
  },

  data() {
    return {
      current_password: "",
      password: "",
      password_confirm: "",
    };
  },

  methods: {
    submitForm() {
      const result = {
        password: this.password,
        passwordConfirm: this.password_confirm,
      };
      if (this.currentPassword) {
        result.current_password = this.current_password;
      }
      this.$emit("submit", result);
    },
  },
};
</script>
