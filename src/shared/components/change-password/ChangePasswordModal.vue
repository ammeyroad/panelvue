<template>
  <b-modal
    :active="isOpen"
    @close="handleModalEvent(false)"
    has-modal-card
    trap-focus
    destroy-on-hide
    aria-role="dialog"
    aria-modal
  >
    <template #default="{ close }">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Ubah Password</p>
          <button type="button" class="delete" @click="close" />
        </header>
        <ValidationObserver v-slot="{ handleSubmit, valid }" ref="observer">
          <section class="modal-card-body">
            <form @submit.prevent="handleSubmit(submitForm)">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                vid="current_password"
                name="Password Saat Ini"
              >
                <AprTextField
                  v-model="currentPassword"
                  :errors="errors"
                  :disabled="isBusy"
                  type="password"
                  id="TxtPassword"
                  label="Password Saat Ini"
                  required
                ></AprTextField>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:8|new_password:@current_password"
                vid="new_password"
                name="Password Baru"
              >
                <AprTextField
                  v-model="newPassword"
                  :errors="errors"
                  :disabled="isBusy"
                  type="password"
                  id="TxtNewPassword"
                  label="Password Baru"
                  required
                ></AprTextField>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|password:@new_password"
                vid="new_password_confirmation"
                name="Konfirmasi Password Baru"
              >
                <AprTextField
                  v-model="newPasswordConfirmation"
                  :errors="errors"
                  :disabled="isBusy"
                  type="password"
                  id="TxtNewPasswordConfirmation"
                  label="Konfirmasi Password Baru"
                  required
                ></AprTextField>
              </ValidationProvider>
            </form>
          </section>
          <footer class="modal-card-foot" style="justify-content: flex-end;">
            <button class="button" type="button" @click="close">
              Batal
            </button>
            <button
              @click="handleSubmit(submitForm)"
              class="button is-primary"
              :disabled="isBusy || !valid"
            >
              Ubah Password
            </button>
          </footer>
        </ValidationObserver>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";

import Swal from "sweetalert2";

import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import { mapActions, mapGetters, mapState } from "vuex";

import handleServiceError from "@/shared/services/error-handler";
import useApiInvoker from "@/shared/services/api-invoker.service";

extend("required", {
  ...required,
  message: "{_field_} wajib diisi!",
});

extend("min", {
  ...min,
  message: "Panjang minimal {_field_} adalah {length} karakter!",
});

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Konfirmasi Password Baru tidak sesuai!",
});

extend("new_password", {
  params: ["target"],
  validate(value, { target }) {
    return value !== target;
  },
  message: "Password Baru tidak boleh sama dengan password lama!",
});

export default {
  name: "ChangePasswordModal",

  components: {
    ValidationObserver,
    ValidationProvider,
    AprTextField,
  },

  data() {
    return {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
      isBusy: false,
    };
  },

  computed: {
    ...mapGetters(["apiAuthHeader"]),
    ...mapState({
      isOpen: "updatePasswordModal",
    }),
  },

  methods: {
    ...mapActions(["updatePasswordModal"]),

    handleModalEvent(isOpen) {
      this.updatePasswordModal(isOpen);
    },

    submitForm() {
      const url = "/auth/password";
      const data = {
        current_password: this.currentPassword,
        password: this.newPassword,
        password_confirmation: this.newPasswordConfirmation,
      };

      this.isBusy = true;
      const { apiInvoker } = useApiInvoker({ headers: this.apiAuthHeader });
      const vm = this;
      apiInvoker
        .patch(url, data)
        .then(() => {
          vm.isBusy = false;
          Swal.fire(
            "Ubah Password Berhasil",
            "Password Anda berhasil diubah!",
            "success",
          );
          vm.updatePasswordModal(false);
        })
        .catch(err => {
          vm.isBusy = false;
          const errors = handleServiceError(err);
          Swal.fire("Gagal Ubah Password", errors.message, errors.level);
        });
    },
  },
};
</script>
