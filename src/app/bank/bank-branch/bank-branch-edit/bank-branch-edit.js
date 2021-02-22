import { ref, reactive, onMounted } from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";

import Swal from "sweetalert2";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, max_value, min_value } from "vee-validate/dist/rules";

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
  name: "BankBranchEdit",
  metaInfo: {
    title: "Ubah Cabang",
  },

  components: {
    AprSelect,
    AprTextField,
    AprTextarea,
    ValidationObserver,
    ValidationProvider,
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

  setup(props, { root }) {
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
    onMounted(() => {
      const url = `/banks/${props.bankId}/branches/${props.id}`;
      isBusy.value = true;
      apiInvoker
        .get(url)
        .then(res => {
          isBusy.value = false;

          const data = res.data.data;

          form.name = data.name;
          form.address = data.address;
          form.addressLat = data.address_lat.toString();
          form.addressLng = data.address_lng.toString();
          form.phoneNo1 = data.phone_no1;
          form.phoneNo2 = data.phone_no2 || "";
        })
        .catch(handleError("Gagal Mendapatkan Data Cabang!"));
    });

    const submitForm = () => {
      const url = `/banks/${form.bank}/branches/${props.id}`;
      const data = {
        name: form.name,
        address: form.address,
        address_lat:
          form.addressLat.trim().length > 0 ? form.addressLat.trim() : null,
        address_lng:
          form.addressLng.trim().length > 0 ? form.addressLng.trim() : null,
        phone_no1: form.phoneNo1,
        phone_no2:
          form.phoneNo2.trim().length > 0 ? form.phoneNo2.trim() : null,
      };

      isBusy.value = true;
      apiInvoker
        .patch(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(handleSubmitSuccess)
        .catch(handleError("Gagal Simpan!"));
    };
    const handleSubmitSuccess = res => {
      isBusy.value = false;
      const data = res.data.data;
      Swal.fire(
        "Cabang Berhasil Diubah",
        `Cabang dengan ID ${data.id} berhasil diubah!`,
        "success",
      );
      router.push({ name: "BankBranchList", query: { bank: form.bank } });
    };
    const handleError = title => err => {
      isBusy.value = false;
      const errors = handleServiceError(err);
      Swal.fire(title, errors.message, errors.level);
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
