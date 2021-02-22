/* eslint-disable no-unreachable */
import _cloneDeep from "lodash/cloneDeep";
import { ref, reactive, computed, onMounted } from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";

import Swal from "sweetalert2";
import formatDate from "date-fns/format";
import subYears from "date-fns/subYears";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import AprDateField from "@/shared/components/apr-date-field/AprDateField.vue";
import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import AprSelect from "@/shared/components/apr-select/AprSelect.vue";
import AddressForm from "@/shared/components/address-form/AddressForm.vue";

import { EMPTY_ADDRESS } from "@/shared/constants/address.constant";

import handleServiceError from "@/shared/services/error-handler";
import useApiInvoker from "@/shared/services/api-invoker.service";

extend("required", {
  ...required,
  message: "{_field_} wajib diisi",
});

export default {
  name: "CustomerEdit",
  metaInfo: {
    title: "Ubah Nasabah",
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
    AprDateField,
    AprSelect,
    AprTextField,
    AddressForm,
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
      bank: props.bankId,
      identityNo: "",
      identityType: "K",
      firstMiddleName: "",
      lastName: "",
      dateOfBirth: null,
      email: null,
      gender: "M",
      phoneNo1: "",
      phoneNo2: null,
      workType: null,
    });
    const personalAddress = ref(_cloneDeep(EMPTY_ADDRESS));
    const workAddress = ref(_cloneDeep(EMPTY_ADDRESS));
    const genders = computed(() => [
      { text: "Pria", value: "M" },
      { text: "Wanita", value: "F" },
    ]);
    const identityTypes = computed(() => [{ text: "KTP", value: "K" }]);
    const workTypes = computed(() => [
      { text: "Karyawan BUMN", value: "BUMN" },
      { text: "Petani", value: "PETANI" },
      { text: "Karyawan Swasta", value: "SWASTA" },
      { text: "Pengusaha", value: "PENGUSAHA" },
      { text: "Pensiunan", value: "PENSIUNAN" },
      { text: "Lain-lain", value: "OTHERS" },
    ]);
    const isBusy = ref(false);
    const linkedUser = ref(null);
    const userDetailsDisabled = computed(() => linkedUser.value !== null);

    const submitForm = () => {
      const url = `/banks/${props.bankId}/customers/${props.id}?_method=patch`;
      const data = new FormData();
      data.set("identity_type", form.identityType);
      data.set("work_type", form.workType);
      if (!userDetailsDisabled.value) {
        data.set("identity_no", form.identityNo);
        data.set("first_middle_name", form.firstMiddleName);
        data.set("last_name", form.lastName);
        data.set(
          "date_of_birth",
          form.dateOfBirth ? formatDate(form.dateOfBirth, "yyyy-MM-dd") : null,
        );
        if (form.email !== "" && form.email !== null) {
          data.set("email", form.email);
        }
        data.set("gender", form.gender);
        data.set("phone_no1", form.phoneNo1);
        if (form.phoneNo2 !== "" && form.phoneNo2 !== null) {
          data.set("phone_no2", form.phoneNo2);
        }
        data.set("personal_address", JSON.stringify(personalAddress.value));
        data.set("work_address", JSON.stringify(workAddress.value));
      }

      isBusy.value = true;
      apiInvoker
        .post(url, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(handleSubmitSuccess)
        .catch(handleError);
    };
    const handleSubmitSuccess = res => {
      isBusy.value = false;
      Swal.fire(
        "Customer Berhasil Diubah",
        `Customer '${res.data.full_name}' dengan ID ${res.data.id} berhasil diubah!`,
        "success",
      );
      router.push(`/customers?bank=${props.bankId}`);
    };
    const handleError = err => {
      isBusy.value = false;
      const errors = handleServiceError(err);
      Swal.fire("Gagal Simpan!", errors.message, errors.level);
    };

    onMounted(() => {
      const url = `/banks/${props.bankId}/customers/${props.id}`;
      isBusy.value = true;
      apiInvoker
        .get(url)
        .then(res => {
          isBusy.value = false;

          const data = res.data;
          linkedUser.value = data.user_id ?? null;

          form.identityNo = data.identity_no;
          form.identityType = data.identity_type;
          form.firstMiddleName = data.first_middle_name;
          form.lastName = data.last_name;
          form.dateOfBirth = new Date(data.date_of_birth);
          form.email = data.email;
          form.gender = data.gender;
          form.phoneNo1 = data.phone_no1;
          form.phoneNo2 = data.phone_no2;
          form.workType = data.work_type;

          personalAddress.value =
            data.personal_address === null
              ? _cloneDeep(EMPTY_ADDRESS)
              : data.personal_address;
          workAddress.value =
            data.work_address === null
              ? _cloneDeep(EMPTY_ADDRESS)
              : data.work_address;
        })
        .catch(handleError);
    });

    return {
      form,
      maxDateOfBirth: subYears(new Date(), 17),
      personalAddress,
      workAddress,
      banks: userBanks,
      genders,
      identityTypes,
      workTypes,
      isBusy,
      submitForm,
      userDetailsDisabled,
    };
  },
};
