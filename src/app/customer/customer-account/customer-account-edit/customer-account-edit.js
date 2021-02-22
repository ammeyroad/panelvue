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
  name: "CustomerAccountEdit",
  metaInfo: {
    title: "Ubah Rekening Nasabah",
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

  props: {
    bankId: {
      type: [String, Number],
      required: true,
    },
    customerId: {
      type: [String, Number],
      required: true,
    },
    id: {
      type: [String, Number],
      required: true,
    },
  },

  setup(props, { root }) {
    const router = root.$router;

    const { userBanks, apiAuthHeader } = useGetters({
      userBanks: "userBanks",
      apiAuthHeader: "apiAuthHeader",
    });

    const form = reactive({
      bank: props.bankId,
      accountNo: "",
      customer: null,
      accountType: null,
      openedAt: new Date(),
      closedAt: null,
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
      const url = `/banks/${props.bankId}/customers/${props.customerId}/accounts/${props.id}`;
      isBusy.value = true;
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });
      apiInvoker
        .get(url)
        .then(res => {
          isBusy.value = false;

          const data = res.data.data;

          form.accountNo = data.account_no;
          form.customer = data.customer;
          form.accountType = data.account_type;
          form.openedAt = new Date(data.opened_at);
          form.closedAt = data.closed_at ? new Date(data.closed_at) : null;
          form.remarks = data.remarks ? data.remarks : "";
          searchAccountType.value = data.account_type.name;
        })
        .catch(handleRequestError("Gagal Mendapatkan Detail Rekening"));
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
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });
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
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });
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
      searchAccountType.value = accountType.name;
    };

    const submitForm = () => {
      const url = `/banks/${form.bank}/customers/${form.customer.id}/accounts/${props.id}`;
      const data = {
        account_no: form.accountNo,
        account_type: form.accountType.id,
        opened_at: formatDate(form.openedAt, "yyyy-MM-dd"),
        closed_at: form.closedAt
          ? formatDate(form.closedAt, "yyyy-MM-dd")
          : null,
        remarks: form.remarks.trim().length > 0 ? form.remarks.trim() : null,
      };

      isBusy.value = true;
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });
      apiInvoker
        .patch(url, data, { headers: { "Content-Type": "application/json" } })
        .then(handleSubmitSuccess)
        .catch(handleRequestError("Gagal Simpan"));
    };
    const handleSubmitSuccess = res => {
      isBusy.value = false;
      const data = res.data.data;
      Swal.fire(
        "Rekening Berhasil Diubah",
        `Rekening ${data.account_no} berhasil diubah!`,
        "success",
      );
      router.push({
        name: "CustomerAccountList",
        query: { bank: props.bankId },
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
