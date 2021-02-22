import _cloneDeep from "lodash/cloneDeep";
import _isEqual from "lodash/isEqual";
import { ref, reactive, computed, onMounted } from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";

import Swal from "sweetalert2";
import formatDate from "date-fns/format";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import { DEFAULT_ROLE } from "../users.constants";
import { EMPTY_ADDRESS } from "@/shared/constants/address.constant";

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
  name: "UserEdit",
  metaInfo: {
    title: "Ubah Pengguna",
  },

  props: {
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

  setup(props) {
    const { apiAuthHeader } = useGetters({
      apiAuthHeader: "apiAuthHeader",
    });
    const form = reactive({
      firstMiddleName: "",
      lastName: "",
      defaultRole: DEFAULT_ROLE.CUSTOMER,
      isActive: false,
    });
    const defaultRoles = computed(() => [
      { text: "Nasabah", value: DEFAULT_ROLE.CUSTOMER },
      { text: "Petugas Bank", value: DEFAULT_ROLE.BANK_OFFICER },
      { text: "Admin", value: DEFAULT_ROLE.ADMIN },
    ]);

    const detailsForm = reactive({
      identityNo: "",
      dateOfBirth: null,
      gender: "M",
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
    const isBusy = ref(false);

    const submitUserForm = () => {
      const url = `/users/${props.id}?_method=patch`;
      const data = new FormData();
      data.set("first_middle_name", form.firstMiddleName);
      data.set("last_name", form.lastName);
      data.set("default_role", form.defaultRole);
      data.set("is_active", form.isActive ? "1" : "0");

      isBusy.value = true;
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });
      apiInvoker
        .post(url, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(handleSubmitSuccess)
        .catch(handleError);
    };
    const submitUserDetailsForm = () => {
      const url = `/users/${props.id}/details`;
      const data = {
        gender: detailsForm.gender,
        identity_no: detailsForm.identityNo,
        date_of_birth: formatDate(detailsForm.dateOfBirth, "yyyy-MM-dd"),
      };
      if (!_isEqual(personalAddress.value, EMPTY_ADDRESS)) {
        data.personal_address = personalAddress.value;
      }
      if (!_isEqual(workAddress.value, EMPTY_ADDRESS)) {
        data.work_address = workAddress.value;
      }

      isBusy.value = true;
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });
      apiInvoker
        .patch(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(handleSubmitSuccess)
        .catch(handleError);
    };
    const handleSubmitSuccess = res => {
      isBusy.value = false;
      Swal.fire(
        "Pengguna Berhasil Diubah",
        `Pengguna '${res.data.full_name}' dengan ID ${res.data.id} berhasil diubah!`,
        "success",
      );
    };
    const handleError = err => {
      isBusy.value = false;
      const errors = handleServiceError(err);
      Swal.fire("Gagal Simpan!", errors.message, errors.level);
    };

    onMounted(() => {
      const url = `/users/${props.id}`;
      isBusy.value = true;
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });
      apiInvoker
        .get(url)
        .then(res => {
          isBusy.value = false;

          const data = res.data.data;
          form.firstMiddleName = data.first_middle_name;
          form.lastName = data.last_name;
          form.defaultRole = data.default_role;
          form.isActive = data.is_active;

          detailsForm.dateOfBirth = new Date(data.details.date_of_birth);
          detailsForm.gender = data.details.gender;
          detailsForm.identityNo = data.details.identity_no;

          personalAddress.value =
            data.details.personal_address === null
              ? _cloneDeep(EMPTY_ADDRESS)
              : data.personal_address;
          workAddress.value =
            data.details.work_address === null
              ? _cloneDeep(EMPTY_ADDRESS)
              : data.work_address;
        })
        .catch(handleError);
    });
    const yesNoOptions = [
      { text: "Ya", value: true },
      { text: "Tidak", value: false },
    ];

    return {
      form,
      detailsForm,
      personalAddress,
      workAddress,
      genders,
      defaultRoles,
      isBusy,
      submitUserForm,
      submitUserDetailsForm,
      yesNoOptions,
    };
  },
};
