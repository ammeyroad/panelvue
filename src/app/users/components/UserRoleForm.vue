<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <ValidationProvider
        v-slot="{ errors }"
        name="Bank"
        :rules="edit ? {} : { required: true }"
      >
        <AprSelect
          v-model="bank"
          :errors="errors"
          :items="bankOptions"
          :disabled="isBusy || edit"
          id="SelectBank"
          label="Bank"
          withoutAll
          fullWidth
        ></AprSelect>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="role" rules="required">
        <AprSelect
          v-model="role"
          :errors="errors"
          :items="roles"
          :disabled="isBusy"
          id="SelectRole"
          label="Hak Akses"
          withoutAll
          fullWidth
        ></AprSelect>
      </ValidationProvider>
      <AprDateField
        v-model="valid_until"
        :disabled="isBusy"
        :min="minDate"
        label="Berlaku Hingga"
        placeholder="Tak Hingga"
        id="valid_until"
        clearable
      ></AprDateField>
    </form>
  </ValidationObserver>
</template>

<script>
/* eslint-disable no-unreachable */
import _isEmpty from "lodash/isEmpty";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { mapGetters } from "vuex";
import { parseISO, startOfDay } from "date-fns";
import axios from "axios";

import AprSelect from "@/shared/components/apr-select/AprSelect.vue";
import AprDateField from "@/shared/components/apr-date-field/AprDateField.vue";

import useApiInvoker from "@/shared/services/api-invoker.service";

import { BANK_ROLE } from "../users.constants";

export default {
  name: "UserRoleForm",
  components: {
    ValidationObserver,
    ValidationProvider,
    AprDateField,
    AprSelect,
  },

  props: {
    roleType: {
      type: [String, Number],
      required: false,
    },
    roleBank: {
      type: [String, Number],
      required: false,
    },
    validUntil: {
      type: [Date, String],
      required: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    excludedBanks: {
      type: Array,
      default: () => [],
    },
    user: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    extend("required", {
      ...required,
      message: "{_field_} wajib diisi",
    });

    this.role = this.roleType ? Number.parseInt(this.roleType) : null;
    this.bank = this.roleBank ? Number.parseInt(this.roleBank) : null;
    if (_isEmpty(this.validUntil)) {
      this.valid_until = null;
    } else if (this.validUntil instanceof Date) {
      this.valid_until = this.validUntil;
    } else {
      this.valid_until = parseISO(this.validUntil);
    }

    // fetch banks
    this.fetchBanks();
  },

  watch: {
    roleType(newVal) {
      this.role = Number.parseInt(newVal);
    },
    roleBank(newVal) {
      this.bank = Number.parseInt(newVal);
    },
    validUntil(newVal) {
      if (_isEmpty(this.validUntil)) {
        this.valid_until = null;
      } else if (newVal instanceof Date) {
        this.valid_until = newVal;
      } else {
        this.valid_until = parseISO(newVal);
      }
    },
  },

  computed: {
    ...mapGetters(["apiAuthHeader"]),
    bankOptions() {
      if (this.edit) {
        return this.banks;
      }
      const excludedBanks = this.excludedBanks;
      return this.banks.filter(b => !excludedBanks.includes(b.value));
    },
    minDate: () => startOfDay(new Date()),
  },

  data() {
    const roles = [
      { text: "Account Officer", value: BANK_ROLE.ACCOUNT_OFFICER },
      { text: "Manajer", value: BANK_ROLE.BANK_MANAGER },
    ];

    return {
      role: null,
      bank: null,
      valid_until: null,

      roles,
      banks: [],
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
    fetchBanks() {
      const vm = this;
      const url = "/banks";
      const { apiInvoker, cancelSource } = useApiInvoker({
        headers: this.apiAuthHeader,
      });
      vm.isBusy = true;
      vm.requestCancelSource = cancelSource.value;
      apiInvoker
        .get(url)
        .then(res => {
          vm.isBusy = false;
          vm.requestCancelSource = null;
          this.banks = res.data.map(b => ({ text: b.name, value: b.id }));
        })
        .catch(vm.handleRequestError);
    },

    handleRequestError(err) {
      this.isBusy = false;
      if (!axios.isCancel(err)) {
        this.$emit("error", { err, cancelSource: this.requestCancelSource });
      } else {
        this.$emit("error", { cancelSource: this.requestCancelSource });
      }
      this.requestCancelSource = null;
    },

    submitForm() {
      let url = `/users/${this.user.id}/roles`;
      const data = {
        role: this.role,
        bank: this.bank,
        valid_until: this.valid_until,
      };
      if (this.edit) {
        url += `/${data.bank}`;
        delete data.bank;
      }

      const { apiInvoker, cancelSource } = useApiInvoker({
        headers: this.apiAuthHeader,
      });
      this.requestCancelSource = cancelSource.value;
      const vm = this;
      vm.isBusy = true;
      vm.$emit("processing", cancelSource);
      const headers = { "Content-Type": "application/json" };
      const promise = vm.edit
        ? apiInvoker.patch(url, data, { headers })
        : apiInvoker.post(url, data, { headers });
      promise
        .then(res => {
          vm.isBusy = false;
          vm.requestCancelSource = null;

          const data = res.data.data;
          const role = {
            role: data.role,
            bank: {
              id: data.bank.id,
              name: data.bank.name,
            },
            validUntil: data.valid_until ? parseISO(data.valid_until) : null,
          };
          vm.$emit("success", { role, cancelSource: cancelSource.value });
        })
        .catch(vm.handleRequestError);
    },
  },
};
</script>
