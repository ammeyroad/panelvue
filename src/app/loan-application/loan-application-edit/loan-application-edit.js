import { ref, reactive, computed, onMounted } from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";
import _cloneDeep from "lodash/cloneDeep";
import _get from "lodash/get";

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
    title: "Ubah Pengajuan Pinjaman",
  },
  directives: { cleave },
  props: {
    id: {
      type: String,
      required: true,
    },
    bankId: {
      type: String,
      required: true,
    },
  },

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

  setup(props, { root, refs }) {
    const router = root.$router;

    const { userBanks, apiAuthHeader } = useGetters({
      userBanks: "userBanks",
      apiAuthHeader: "apiAuthHeader",
    });
    const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });

    const form = reactive({
      bank: Number.parseInt(props.bankId),
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

    onMounted(() => {
      fetchExistingApplication();
    });
    const fetchExistingApplication = () => {
      const url = `/banks/${props.bankId}/loan-apps/${props.id}`;
      isBusy.value = true;
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });
      apiInvoker
        .get(url)
        .then(res => {
          isBusy.value = false;
          const loanApp = res.data;
          form.customer = loanApp.customer;
          form.hasExistingAccount = _get(
            loanApp,
            "details.has_existing_account",
            false,
          );
          form.loanAmount = loanApp.loan_amount;

          const loanAmountCleave = refs["loanAmount"].$refs["input"]._vCleave;
          loanAmountCleave.setRawValue(loanApp.loan_amount.toString());
          form.loanAmountFormatted = loanAmountCleave.getFormattedValue();

          form.sourceOfIncome = loanApp.source_of_income;
          form.workType = loanApp.work_type;
          form.loanPurpose = loanApp.loan_purpose;
          form.guaranteeType = loanApp.guarantee_type;
          form.workName = _get(loanApp, "details.work_name", null);
          form.personalAddressSameWithIdentityAddress = _get(
            loanApp,
            "details.personal_address_same_with_identity_address",
            false,
          );
          form.workAddressSameWithPersonalAddress = _get(
            loanApp,
            "details.work_address_same_with_personal_address",
            false,
          );
          personalAddress.value =
            loanApp.personal_address === null
              ? _cloneDeep(EMPTY_ADDRESS)
              : loanApp.personal_address;
          workAddress.value =
            loanApp.work_address === null
              ? _cloneDeep(EMPTY_ADDRESS)
              : loanApp.work_address;
        })
        .catch(
          handleRequestError("Gagal mendapatkan data pengajuan pinjaman!"),
        );
    };

    const submitForm = () => {
      const url = `/banks/${props.bankId}/loan-apps/${props.id}?_method=PATCH`; // API hack
      const data = new FormData();
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

      isBusy.value = true;
      apiInvoker
        .post(url, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(handleSubmitSuccess)
        .catch(handleRequestError("Gagal Simpan"));
    };
    const handleSubmitSuccess = res => {
      isBusy.value = false;
      Swal.fire(
        "Pengajuan Pinjaman Berhasil Diubah",
        `Pengajuan Pinjaman dengan ID ${res.data.id} berhasil dibubah!`,
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
      personalAddressDisabled,
      workAddressDisabled,
      hasExistingAccount,
      loanPurposes,
      onLoanAmountInput,
      guaranteeTypes,
    };
  },
};
