import { ref, reactive } from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";

import Swal from "sweetalert2";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, min_value, max_value } from "vee-validate/dist/rules";

import AprTextarea from "@/shared/components/apr-textarea/AprTextarea.vue";
import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import AprSelect from "@/shared/components/apr-select/AprSelect.vue";

import handleServiceError from "@/shared/services/error-handler";
import useApiInvoker from "@/shared/services/api-invoker.service";

extend("required", {
  ...required,
  message: "{_field_} wajib diisi",
});

extend("min_value", {
  ...min_value,
  message: "{_field_} tidak boleh lebih kecil dari {min}",
});

extend("max_value", {
  ...max_value,
  message: "{_field_} tidak boleh lebih besar dari {max}",
});

export default {
  name: "BankBranchCreate",
  metaInfo: {
    title: "Buat Cabang Baru",
  },

  components: {
    AprSelect,
    AprTextField,
    AprTextarea,
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
      name: "",
      address: "",
      addressLat: "",
      addressLng: "",
      phoneNo1: "",
      phoneNo2: null,
    });
    const isBusy = ref(false);

    const submitForm = () => {
      const url = `/banks/${form.bank}/branches`;
      const data = new FormData();
      data.set("name", form.name);
      data.set("address", form.address);
      if (
        form.addressLat.trim().length > 0 &&
        form.addressLng.trim().length > 0
      ) {
        data.set("address_lat", form.addressLat);
        data.set("address_lng", form.addressLng);
      }
      data.set("phone_no1", form.phoneNo1);
      if (form.phoneNo2 !== "" && form.phoneNo2 !== null) {
        data.set("phone_no2", form.phoneNo2);
      }

      isBusy.value = true;
      apiInvoker
        .post(url, data, { headers: { "Content-Type": "multipart/form-data" } })
        .then(handleSubmitSuccess)
        .catch(handleSubmitError);
    };
    const handleSubmitSuccess = res => {
      isBusy.value = false;
      const data = res.data.data;
      Swal.fire(
        "Cabang Berhasil Dibuat",
        `Cabang '${data.name}' berhasil dibuat dengan ID ${data.id}!`,
        "success",
      );
      router.push({ name: "BankBranchList", query: { bank: form.bank } });
    };
    const handleSubmitError = err => {
      isBusy.value = false;
      const errors = handleServiceError(err);
      Swal.fire("Gagal Simpan!", errors.message, errors.level);
    };
    const handleNameInput = (name, validate) => {
      form.name = name.toUpperCase();
      validate(name);
    };

    return {
      form,
      handleNameInput,
      banks: userBanks,
      isBusy,
      submitForm,
    };
  },
};
