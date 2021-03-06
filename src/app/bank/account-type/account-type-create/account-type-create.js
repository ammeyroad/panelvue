import { ref, reactive, computed, watch, toRef } from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";
import Swal from "sweetalert2";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import AprTextarea from "@/shared/components/apr-textarea/AprTextarea.vue";
import AprSelect from "@/shared/components/apr-select/AprSelect.vue";
import TabunganInterestRatesForm from "../components/TabunganInterestRatesForm.vue";
import DepositoInterestRatesForm from "../components/DepositoInterestRatesForm.vue";

import accountTypes from "../account-type.classes";

import handleServiceError from "@/shared/services/error-handler";
import useApiInvoker from "@/shared/services/api-invoker.service";

extend("required", {
  ...required,
  message: "Wajib diisi",
});

export default {
  name: "AccountTypeCreate",
  metaInfo: {
    title: "Buat Produk Simpanan Baru",
  },

  components: {
    AprSelect,
    AprTextarea,
    AprTextField,
    TabunganInterestRatesForm,
    DepositoInterestRatesForm,
    ValidationObserver,
    ValidationProvider,
  },

  setup(_, { root }) {
    const router = root.$router;

    const { selectedBank, userBanks, apiAuthHeader } = useGetters({
      selectedBank: "selectedBank",
      userBanks: "userBanks",
      apiAuthHeader: "apiAuthHeader",
    });
    // eslint-disable-next-line no-unused-vars
    const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });

    const form = reactive({
      bank: selectedBank.value.bank.id,
      class: accountTypes[0].value,
      name: "",
      description: "",
      interestRates: [],
    });
    watch(toRef(form, "class"), (newValue, oldValue) => {
      if (newValue !== oldValue) {
        form.interestRates = [];
      }
    });
    const isBusy = ref(false);
    const handleFormSubmit = () => {
      const url = `/banks/${form.bank}/account-types`;
      const data = {
        ...form,
        interest_rates: form.interestRates,
      };
      delete data.interestRates;
      isBusy.value = true;
      apiInvoker
        .post(url, data)
        .then(handleSubmitSuccess)
        .catch(handleSubmitError);
    };
    const handleSubmitSuccess = res => {
      isBusy.value = false;
      Swal.fire(
        "Produk Berhasil Dibuat",
        `Produk Simpanan '${res.data.name}' berhasil dibuat dengan ID ${res.data.id}!`,
        "success",
      );
      router.push({ name: "BankAccountTypeList", query: { bank: form.bank } });
    };

    const handleSubmitError = err => {
      isBusy.value = false;
      const errors = handleServiceError(err);
      Swal.fire("Gagal Simpan!", errors.message, errors.level);
    };

    const classes = computed(() => accountTypes);
    return {
      classes,
      form,
      banks: userBanks,
      handleFormSubmit,
      isBusy,
    };
  },
};
