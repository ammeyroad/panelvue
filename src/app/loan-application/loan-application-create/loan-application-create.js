import { ref, reactive, watch, toRef, computed } from "@vue/composition-api";
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
import WORK_TYPES from "@/shared/constants/work-types.constant";
import { EMPTY_ADDRESS } from "@/shared/constants/address.constant";

import handleServiceError from "@/shared/services/error-handler";
import useApiInvoker from "@/shared/services/api-invoker.service";

extend("required", {
  ...required,
  message: "{_field_} wajib diisi",
});

export default {
  name: "LoanApplicationCreate",
  metaInfo: {
    title: "Buat Pengajuan Pinjaman Baru",
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
      guaranteeType: null,
      loanPurpose: null,
      loanAmount: "0",
      loanAmountFormatted: "",
      sourceOfIncome: null,
      workType: null,
      workName: "",
      personalAddressSameWithIdentityAddress: false,
      workAddressSameWithPersonalAddress: false,
      personalPicture: null,
      identityPicture: null,
      guaranteeDocument: null,
    });
    const personalAddress = ref(_cloneDeep(EMPTY_ADDRESS));
    const workAddress = ref(_cloneDeep(EMPTY_ADDRESS));

    const sourceOfIncomes = computed(() => SOURCE_OF_FUNDS);
    const workTypes = computed(() => WORK_TYPES);
    const isBusy = ref(false);
    const hasExistingAccount = computed(() => [
      { text: "Ya", value: true },
      { text: "Tidak", value: false },
    ]);
    const loanPurposes = computed(() => [
      { text: "Konsumptif", value: "KONSUMPTIF" },
      { text: "Produktif", value: "PRODUKTIF" },
      { text: "Lain-lain", value: "OTHERS" },
    ]);
    const onLoanAmountInput = ev => {
      form.loanAmount = ev.target._vCleave.getRawValue();
      form.loanAmountFormatted = ev.target._vCleave.getFormattedValue();
    };

    watch(toRef(form, "bank"), (newValue, oldValue) => {
      if (newValue !== oldValue) {
        form.customer = null;
      }
    });

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

    const submitForm = () => {
      const url = `/banks/${form.bank}/loan-apps`;
      const data = new FormData();
      data.set("customer", form.customer.id);
      data.set("has_existing_account", form.hasExistingAccount ? "1" : "0");
      data.set("loan_purpose", form.loanPurpose);
      data.set("loan_amount", form.loanAmount);
      data.set("source_of_income", form.sourceOfIncome);
      data.set("work_type", form.workType);
      data.set("work_name", form.workName);
      data.set("guarantee_type", form.guaranteeType);
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
      data.set("guarantee_document", form.guaranteeDocument);

      isBusy.value = true;
      apiInvoker
        .post(url, data, { headers: { "Content-Type": "multipart/form-data" } })
        .then(handleSubmitSuccess)
        .catch(handleRequestError("Gagal Simpan"));
    };
    const handleSubmitSuccess = res => {
      isBusy.value = false;
      Swal.fire(
        "Pengajuan Pinjaman Baru Berhasil Dibuat",
        `Pengajuan Pinjaman Baru berhasil dibuat dengan ID ${res.data.id}!`,
        "success",
      );
      router.push(`/loan-applications?bank=${form.bank}`);
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
    const guaranteeTypes = computed(() => [
      { text: "BPKB", value: "BPKB" },
      { text: "SHM", value: "SHM" },
      { text: "Lain-lain", value: "OTHERS" },
    ]);

    return {
      form,
      personalAddress,
      workAddress,
      banks: userBanks,
      workTypes,
      isBusy,
      submitForm,
      numeralMask,
      sourceOfIncomes,
      customersLoading,
      customers,
      searchCustomers,
      handleCustomerSelected,
      personalAddressDisabled,
      workAddressDisabled,
      hasExistingAccount,
      loanPurposes,
      onLoanAmountInput,
      guaranteeTypes,
    };
  },
};
