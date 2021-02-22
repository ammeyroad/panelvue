import {
  ref,
  reactive,
  watch,
  toRef,
  computed,
  onMounted,
} from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";
import _debounce from "lodash/debounce";

import Swal from "sweetalert2";
import formatDate from "date-fns/format";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, max } from "vee-validate/dist/rules";

import AprDateField from "@/shared/components/apr-date-field/AprDateField.vue";
import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import AprTextarea from "@/shared/components/apr-textarea/AprTextarea.vue";
import AprSelect from "@/shared/components/apr-select/AprSelect.vue";
import RequiredLabel from "@/shared/components/RequiredLabel.vue";

import handleServiceError from "@/shared/services/error-handler";
import useApiInvoker from "@/shared/services/api-invoker.service";

extend("required", {
  ...required,
  message: "{_field_} wajib diisi",
});

extend("max", {
  ...max,
  message: "Panjang maksimal {_field_} adalah {length} karakter",
});

export default {
  name: "CustomerAccountCreate",
  metaInfo: {
    title: "Buat Rekening Nasabah Baru",
  },

  components: {
    AprDateField,
    AprSelect,
    AprTextField,
    AprTextarea,
    RequiredLabel,
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
    const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });

    const form = reactive({
      bank: selectedBank.value.bank.id,
      accountNo: "",
      customer: null,
      accountType: null,
      openedAt: new Date(),
      remarks: "",
    });
    const accountTypes = ref([]);
    const filteredAccountTypes = computed(() => {
      if (form.accountType === null) {
        return accountTypes.value.filter(accountType =>
          accountType.name
            .toUpperCase()
            .includes(searchAccountType.value.toUpperCase()),
        );
      }

      return accountTypes.value.filter(accountType =>
        accountType.name
          .toUpperCase()
          .includes(searchAccountType.value.toUpperCase()),
      );
    });
    const isBusy = ref(false);

    onMounted(() => {
      fetchAccountTypes();
    });

    watch(toRef(form, "bank"), (newValue, oldValue) => {
      if (newValue !== oldValue) {
        form.customer = null;
        fetchAccountTypes();
      }
    });
    watch(toRef(form, "accountType"), (newValue, oldValue) => {
      if (newValue !== oldValue) {
        fetchAccountTypes();
      }
    });
    const fetchAccountTypes = () => {
      if (form.bank === null) {
        return;
      }

      const url = `/banks/${form.bank}/account-types`;
      isBusy.value = true;
      apiInvoker
        .get(url)
        .then(res => {
          isBusy.value = false;
          accountTypes.value = res.data;
        })
        .catch(handleRequestError("Gagal Mendapatkan Daftar Produk Simpanan"));
    };

    const customersLoading = ref(false);
    const customers = ref([]);
    const handleCustomerSelected = (validate, customer) => {
      form.customer = customer;
      validate(customer);
    };
    const searchCustomers = _debounce(customerName => {
      const url = `/banks/${form.bank}/customers?filter=${customerName}`;

      customersLoading.value = true;
      apiInvoker
        .get(url)
        .then(res => {
          customersLoading.value = false;
          customers.value = res.data.data;
        })
        .catch(err => {
          customersLoading.value = false;
          handleRequestError("Gagal Mendapatkan Daftar Nasabah")(err);
        });
    }, 500);

    const searchAccountType = ref("");
    const handleAccountTypeSelected = accountType => {
      form.accountType = accountType;
      searchAccountType.value = accountType ? accountType.name : null;
    };

    const submitForm = () => {
      const url = `/banks/${form.bank}/customers/${form.customer.id}/accounts`;
      const data = {
        account_no: form.accountNo,
        account_type: form.accountType.id,
        opened_at: formatDate(form.openedAt, "yyyy-MM-dd"),
        remarks: form.remarks.trim().length > 0 ? form.remarks.trim() : null,
      };

      isBusy.value = true;
      apiInvoker
        .post(url, data, { headers: { "Content-Type": "application/json" } })
        .then(handleSubmitSuccess)
        .catch(handleRequestError("Gagal Simpan"));
    };
    const handleSubmitSuccess = res => {
      isBusy.value = false;
      const data = res.data.data;
      Swal.fire(
        "Rekening Berhasil Dibuat",
        `Rekening ${data.account_no} berhasil dibuat!`,
        "success",
      );
      router.push({
        name: "CustomerAccountList",
        query: { bank: form.bank },
      });
    };
    const handleRequestError = title => err => {
      isBusy.value = false;
      const errors = handleServiceError(err);
      Swal.fire(title, errors.message, errors.level);
    };

    return {
      form,
      banks: userBanks,
      isBusy,
      submitForm,
      customersLoading,
      customers,
      searchCustomers,
      handleCustomerSelected,
      searchAccountType,
      filteredAccountTypes,
      handleAccountTypeSelected,
    };
  },
};
