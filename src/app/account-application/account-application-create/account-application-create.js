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
import _cloneDeep from "lodash/cloneDeep";

import Swal from "sweetalert2";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import cleave, { numeral as numeralMask } from "@/shared/masks";

import AprUploadFile from "@/shared/components/apr-upload-file/AprUploadFile.vue";
import AprDateField from "@/shared/components/apr-date-field/AprDateField.vue";
import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import AprSelect from "@/shared/components/apr-select/AprSelect.vue";
import AddressForm from "@/shared/components/address-form/AddressForm.vue";
import RequiredLabel from "@/shared/components/RequiredLabel.vue";

import SOURCE_OF_FUNDS from "@/shared/constants/source-of-fund.constant";
import ACCOUNT_TYPES from "@/shared/constants/account-types.constant";
import WORK_TYPES from "@/shared/constants/work-types.constant";
import { EMPTY_ADDRESS } from "@/shared/constants/address.constant";

import handleServiceError from "@/shared/services/error-handler";
import useApiInvoker from "@/shared/services/api-invoker.service";

extend("required", {
  ...required,
  message: "{_field_} wajib diisi",
});

export default {
  name: "AccountApplicationCreate",
  metaInfo: {
    title: "Buat Pengajuan Rekening Baru",
  },
  directives: { cleave },

  components: {
    AprUploadFile,
    AprDateField,
    AprSelect,
    AprTextField,
    AddressForm,
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
      customer: null,
      hasExistingAccount: false,
      accountType: null,
      preferredAccountType: null,
      accountPurpose: null,
      initialDeposit: "0",
      initialDepositFormatted: "",
      sourceOfFund: null,
      workType: null,
      workName: "",
      personalAddressSameWithIdentityAddress: false,
      workAddressSameWithPersonalAddress: false,
      personalPicture: null,
      identityPicture: null,
    });
    const personalAddress = ref(_cloneDeep(EMPTY_ADDRESS));
    const workAddress = ref(_cloneDeep(EMPTY_ADDRESS));
    const preferredAccountTypes = ref([]);
    const filteredPreferredAccountTypes = computed(() => {
      if (form.accountType === null) {
        return preferredAccountTypes.value.filter(accountType =>
          accountType.name
            .toUpperCase()
            .includes(searchPreferredAccountType.value.toUpperCase()),
        );
      }

      return preferredAccountTypes.value.filter(
        accountType =>
          accountType.class === form.accountType &&
          accountType.name
            .toUpperCase()
            .includes(searchPreferredAccountType.value.toUpperCase()),
      );
    });
    const accountTypes = computed(() => ACCOUNT_TYPES);
    const sourceOfFunds = computed(() => SOURCE_OF_FUNDS);
    const workTypes = computed(() => WORK_TYPES);
    const isBusy = ref(false);
    const hasExistingAccount = computed(() => [
      { text: "Ya", value: true },
      { text: "Tidak", value: false },
    ]);
    const accountPurposes = computed(() => [
      { text: "Simpanan", value: "SIMPANAN" },
      { text: "Investasi", value: "INVESTASI" },
      { text: "Lain-lain", value: "OTHERS" },
    ]);
    const onInitialDepositAmountInput = ev => {
      form.initialDeposit = ev.target._vCleave.getRawValue();
      form.initialDepositFormatted = ev.target._vCleave.getFormattedValue();
    };

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
          preferredAccountTypes.value = res.data;
        })
        .catch(handleRequestError("Gagal Mendapatkan Daftar Produk Simpanan"));
    };

    const customersLoading = ref(false);
    const customers = ref([]);
    const handleCustomerSelected = (validate, customer) => {
      form.customer = customer;
      validate(customer).then(isValid => {
        if (!isValid) {
          return;
        }
        if (customer.work_type !== null) {
          form.workType = customer.work_type;
        }
        if (customer.personal_address !== null) {
          personalAddress.value = customer.personal_address;
        } else {
          personalAddress.value = _cloneDeep(EMPTY_ADDRESS);
        }
        if (customer.work_address !== null) {
          workAddress.value = customer.work_address;
        } else {
          workAddress.value = _cloneDeep(EMPTY_ADDRESS);
        }
      });
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

    const searchPreferredAccountType = ref("");
    const handlePreferredAccountTypeSelected = accountType => {
      form.preferredAccountType = accountType;
      searchPreferredAccountType.value = accountType.name;
    };

    const submitForm = () => {
      const url = `/banks/${form.bank}/account-apps`;
      const data = new FormData();
      data.set("customer", form.customer.id);
      data.set("has_existing_account", form.hasExistingAccount ? "1" : "0");
      data.set("account_type", form.accountType);
      if (form.preferredAccountType !== null) {
        data.set("preferred_account_type", form.preferredAccountType.id);
      }
      data.set("account_purpose", form.accountPurpose);
      data.set("initial_deposit_amount", form.initialDeposit);
      data.set("source_of_fund", form.sourceOfFund);
      data.set("work_type", form.workType);
      data.set("work_name", form.workName);
      data.set(
        "personal_address_same_with_identity_address",
        form.personalAddressSameWithIdentityAddress ? "1" : "0",
      );
      if (!form.personalAddressSameWithIdentityAddress) {
        data.set("personal_address", JSON.stringify(personalAddress));
      }
      data.set(
        "work_address_same_with_personal_address",
        form.workAddressSameWithPersonalAddress ? "1" : "0",
      );
      if (!form.workAddressSameWithPersonalAddress) {
        data.set("work_address", JSON.stringify(workAddress));
      }
      data.set("personal_picture", form.personalPicture);
      data.set("identity_picture", form.identityPicture);

      isBusy.value = true;
      apiInvoker
        .post(url, data, { headers: { "Content-Type": "multipart/form-data" } })
        .then(handleSubmitSuccess)
        .catch(handleRequestError("Gagal Simpan"));
    };
    const handleSubmitSuccess = res => {
      isBusy.value = false;
      Swal.fire(
        "Pengajuan Rekening Baru Berhasil Dibuat",
        `Pengajuan Rekening Baru berhasil dibuat dengan ID ${res.data.id}!`,
        "success",
      );
      router.push(`/account-applications?bank=${form.bank}`);
    };
    const handleRequestError = title => err => {
      isBusy.value = false;
      const errors = handleServiceError(err);
      Swal.fire(title, errors.message, errors.level);
    };

    const personalAddressDisabled = computed(
      () => isBusy.value || form.personalAddressSameWithIdentityAddress,
    );
    const workAddressDisabled = computed(
      () => isBusy.value || form.workAddressSameWithPersonalAddress,
    );

    return {
      form,
      personalAddress,
      workAddress,
      banks: userBanks,
      workTypes,
      isBusy,
      submitForm,
      numeralMask,
      accountTypes,
      sourceOfFunds,
      customersLoading,
      customers,
      searchCustomers,
      handleCustomerSelected,
      searchPreferredAccountType,
      filteredPreferredAccountTypes,
      handlePreferredAccountTypeSelected,
      personalAddressDisabled,
      workAddressDisabled,
      hasExistingAccount,
      accountPurposes,
      onInitialDepositAmountInput,
    };
  },
};
