import { ref } from "@vue/composition-api";
import { useGetters, useActions } from "vuex-composition-helpers";
import Swal from "sweetalert2";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import {
  required,
  image,
  max,
  min,
  max_value,
  min_value,
} from "vee-validate/dist/rules";

import AprDateField from "@/shared/components/apr-date-field/AprDateField.vue";
import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import AprTextarea from "@/shared/components/apr-textarea/AprTextarea.vue";
import AprUploadFile from "@/shared/components/apr-upload-file/AprUploadFile.vue";

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

extend("min_value", {
  ...min_value,
  message: "{_field_} tidak boleh lebih kecil dari {min}",
});

extend("max_value", {
  ...max_value,
  message: "{_field_} tidak boleh lebih besar dari {max}",
});

extend("image", {
  ...image,
  message: "File harus berupa gambar!",
});

extend("min", {
  ...min,
  message: "Panjang minimal {_field_} adalah {length} karakter",
});

export default {
  name: "BankCreate",
  metaInfo: {
    title: "Buat Bank",
  },

  components: {
    AprDateField,
    AprTextarea,
    AprTextField,
    AprUploadFile,
    ValidationObserver,
    ValidationProvider,
  },

  setup(_, { root }) {
    const router = root.$router;

    const name = ref("");
    const description = ref("");
    const descriptionShort = ref(null);
    const phoneNo1 = ref("");
    const phoneNo2 = ref(null);
    const address = ref("");
    const addressLat = ref("");
    const addressLng = ref("");
    const logo = ref(null);
    const isBusy = ref(false);
    const form = ref(null);
    const branchName = ref("");
    const whatsappNo = ref("");

    const { apiAuthHeader } = useGetters(["apiAuthHeader"]);
    const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });

    const { addBankToCurrentUser } = useActions(["addBankToCurrentUser"]);

    const handleSubmitSuccess = res => {
      isBusy.value = false;
      const data = res.data.data;
      // add self as bank manager
      addBankToCurrentUser({
        bank: data,
        role: 4,
      });

      Swal.fire(
        "Bank Berhasil Dibuat",
        `Bank '${data.name}' berhasil dibuat dengan ID ${data.id}!`,
        "success",
      );
      router.push("/banks");
    };

    const handleSubmitError = err => {
      isBusy.value = false;
      const errors = handleServiceError(err);
      Swal.fire("Gagal Simpan!", errors.message, errors.level);
      console.error(err);
    };

    const submitForm = () => {
      const formData = new FormData(form.value);
      // special case for logo
      if (logo.value !== null) {
        formData.set("logo", logo.value);
      }

      const url = "/banks";
      isBusy.value = true;
      apiInvoker({
        method: "POST",
        url,
        data: formData,
        headers: {
          ...apiAuthHeader.value,
          "Content-Type": "multipart/form-data",
        },
      })
        .then(handleSubmitSuccess)
        .catch(handleSubmitError);
    };

    const handleBranchInput = (value, validate) => {
      branchName.value = value.toUpperCase();
      if (validate) {
        validate(value);
      }
    };

    return {
      name,
      description,
      descriptionShort,
      branchName,
      whatsappNo,
      phoneNo1,
      phoneNo2,
      address,
      addressLat,
      addressLng,
      logo,
      isBusy,
      form,
      handleBranchInput,
      submitForm,
    };
  },
};
