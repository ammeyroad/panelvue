import { onMounted, ref } from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";
import Swal from "sweetalert2";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, image, max, min } from "vee-validate/dist/rules";

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

extend("image", {
  ...image,
  message: "File harus berupa gambar!",
});

extend("min", {
  ...min,
  message: "Panjang minimal {_field_} adalah {length} karakter",
});

export default {
  name: "BankEdit",
  metaInfo: {
    title: "Ubah Bank",
  },

  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },

  components: {
    AprDateField,
    AprTextarea,
    AprTextField,
    AprUploadFile,
    ValidationObserver,
    ValidationProvider,
  },

  setup(props, { root }) {
    const router = root.$router;

    const name = ref("");
    const description = ref("");
    const descriptionShort = ref(null);
    const logo = ref(null);
    const isBusy = ref(false);
    const form = ref(null);
    const whatsappNo = ref("");

    const { apiAuthHeader } = useGetters(["apiAuthHeader"]);
    const { apiInvoker } = useApiInvoker({ headers: apiAuthHeader.value });

    onMounted(() => {
      const url = `/banks/${props.id}`;
      isBusy.value = true;
      apiInvoker
        .get(url)
        .then(res => {
          isBusy.value = false;
          const bank = res.data.data;
          name.value = bank.name;
          description.value = bank.description;
          descriptionShort.value = bank.description_short;
        })
        .catch(err => {
          isBusy.value = false;
          const errors = handleServiceError(err);
          Swal.fire(
            "Gagal Mendapatkan Data Bank!",
            errors.message,
            errors.level,
          );
          console.error(err);
        });
    });

    const handleSubmitSuccess = res => {
      isBusy.value = false;
      const data = res.data.data;
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

      const url = `/banks/${props.id}?_method=PUT`;
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

    return {
      name,
      description,
      descriptionShort,
      logo,
      whatsappNo,
      isBusy,
      form,
      submitForm,
    };
  },
};
