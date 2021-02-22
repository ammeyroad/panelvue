import {
  ref,
  reactive,
  watch,
  toRef,
  computed,
  onMounted,
} from "@vue/composition-api";
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
  name: "AccountApplicationEdit",
  metaInfo: {
    title: "Ubah Pengajuan Rekening",
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

    const form = reactive({
      bank: Number.parseInt(props.bankId),
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
      fetchExistingApplication();
    });
    const fetchExistingApplication = () => {
      const url = `/banks/${props.bankId}/account-apps/${props.id}?`;
      isBusy.value = true;
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });
      apiInvoker
        .get(url)
        .then(res => {
          isBusy.value = false;
          const accountApp = res.data;
          form.customer = accountApp.customer;
          form.hasExistingAccount = _get(
            accountApp,
            "details.has_existing_account",
            false,
          );
          if (accountApp.account_type !== null) {
            form.preferredAccountType = accountApp.account_type.id;
            searchPreferredAccountType.value = accountApp.account_type.name;
          }
          form.accountType = accountApp.details.account_type;
          form.initialDeposit = accountApp.initial_deposit_amount;

          const initialDepositCleave =
            refs["initialDeposit"].$refs["input"]._vCleave;
          initialDepositCleave.setRawValue(
            accountApp.initial_deposit_amount.toString(),
          );
          form.initialDepositFormatted = initialDepositCleave.getFormattedValue();

          form.sourceOfFund = accountApp.source_of_fund;
          form.workType = accountApp.work_type;
          form.accountPurpose = accountApp.account_purpose;
          form.workName = _get(accountApp, "details.work_name", null);
          form.personalAddressSameWithIdentityAddress = _get(
            accountApp,
            "details.personal_address_same_with_identity_address",
            false,
          );
          form.workAddressSameWithPersonalAddress = _get(
            accountApp,
            "details.work_address_same_with_personal_address",
            false,
          );
          personalAddress.value =
            accountApp.personal_address === null
              ? _cloneDeep(EMPTY_ADDRESS)
              : accountApp.personal_address;
          workAddress.value =
            accountApp.work_address === null
              ? _cloneDeep(EMPTY_ADDRESS)
              : accountApp.work_address;
        })
        .catch(
          handleRequestError("Gagal mendapatkan data pengajuan rekening!"),
        );
    };

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
          preferredAccountTypes.value = res.data;
        })
        .catch(handleRequestError("Gagal Mendapatkan Daftar Produk Simpanan"));
    };

    const searchPreferredAccountType = ref("");
    const handlePreferredAccountTypeSelected = accountType => {
      form.preferredAccountType = accountType;
      searchPreferredAccountType.value = accountType.name;
    };

    const submitForm = () => {
      const url = `/banks/${form.bank}/account-apps/${props.id}?_method=PATCH`;
      const data = new FormData();
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

      isBusy.value = true;
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });
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
        "Pengajuan Rekening Baru Berhasil Diubah",
        `Pengajuan Rekening Baru dengan ID ${res.data.id} berhasil diubah!`,
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
