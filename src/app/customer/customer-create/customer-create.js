import { ref, reactive, computed } from "@vue/composition-api";
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

import handleServiceError from "@/shared/services/error-handler";
import useApiInvoker from "@/shared/services/api-invoker.service";

extend("required", {
  ...required,
  message: "{_field_} wajib diisi",
});

export default {
  name: "CustomerCreate",
  metaInfo: {
    title: "Buat Nasabah Baru",
  },

  components: {
    AprDateField,
    AprSelect,
    AprTextField,
    AddressForm,
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
    const personalAddress = ref({
      line1: "",
      line2: "",
      line3: "",
      desa_kelurahan: "",
      kecamatan: "",
      kabupaten_kota: "",
      province: "",
      postcode: "",
    });
    const workAddress = ref({
      line1: "",
      line2: "",
      line3: "",
      desa_kelurahan: "",
      kecamatan: "",
      kabupaten_kota: "",
      province: "",
      postcode: "",
    });
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

    const submitForm = () => {
      const url = `/banks/${form.bank}/customers`;
      const data = new FormData();
      data.set("identity_no", form.identityNo);
      data.set("identity_type", form.identityType);
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
      data.set("work_type", form.workType);
      data.set("personal_address", JSON.stringify(personalAddress.value));
      data.set("work_address", JSON.stringify(workAddress.value));

      isBusy.value = true;
      apiInvoker
        .post(url, data, { headers: { "Content-Type": "multipart/form-data" } })
        .then(handleSubmitSuccess)
        .catch(handleSubmitError);
    };
    const handleSubmitSuccess = res => {
      isBusy.value = false;
      Swal.fire(
        "Customer Berhasil Dibuat",
        `Customer '${res.data.full_name}' berhasil dibuat dengan ID ${res.data.id}!`,
        "success",
      );
      router.push(`/customers?bank=${form.bank}`);
    };
    const handleSubmitError = err => {
      isBusy.value = false;
      const errors = handleServiceError(err);
      Swal.fire("Gagal Simpan!", errors.message, errors.level);
    };

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
    };
  },
};
