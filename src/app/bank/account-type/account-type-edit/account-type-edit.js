import { ref, reactive, computed, onMounted } from "@vue/composition-api";
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

// eslint-disable-next-line no-unused-vars
import handleServiceError from "@/shared/services/error-handler";
import useApiInvoker from "@/shared/services/api-invoker.service";

extend("required", {
  ...required,
  message: "Wajib diisi",
});

export default {
  name: "AccountTypeEdit",
  metaInfo: {
    title: "Ubah Produk Simpanan",
  },

  props: {
    bankId: {
      type: [String, Number],
      required: true,
    },
    id: {
      type: [String, Number],
      required: true,
    },
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

  setup(props, { root }) {
    const router = root.$router;

    const { userBanks, apiAuthHeader } = useGetters({
      userBanks: "userBanks",
      apiAuthHeader: "apiAuthHeader",
    });
    const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });

    const form = reactive({
      available: true,
      class: null,
      name: "",
      description: "",
      interestRates: [],
    });
    const isBusy = ref(false);
    onMounted(() => {
      const url = `/banks/${props.bankId}/account-types/${props.id}`;
      isBusy.value = true;
      apiInvoker
        .get(url)
        .then(res => {
          isBusy.value = false;

          const data = res.data;
          form.class = data.class;
          form.name = data.name;
          form.description = data.description;
          form.available = data.available;
          form.interestRates = data.interest_rates;
        })
        .catch(handleError);
    });

    const handleFormSubmit = () => {
      const url = `/banks/${props.bankId}/account-types/${props.id}`;
      const data = {
        ...form,
        interest_rates: form.interestRates,
      };
      delete data.interestRates;
      isBusy.value = true;
      apiInvoker
        .put(url, data)
        .then(handleSubmitSuccess)
        .catch(handleError);
    };
    const handleSubmitSuccess = res => {
      isBusy.value = false;
      Swal.fire(
        "Produk Berhasil Diubah",
        `Produk Simpanan dengan ID ${res.data.id} berhasil diubah!`,
        "success",
      );
      router.push("/account-types");
    };

    const handleError = err => {
      isBusy.value = false;
      const errors = handleServiceError(err);
      Swal.fire("Gagal!", errors.message, errors.level);
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
