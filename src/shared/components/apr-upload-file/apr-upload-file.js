import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
} from "@vue/composition-api";

import RequiredLabel from "@/shared/components/RequiredLabel.vue";

import * as FilePond from "filepond";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

export default {
  name: "AprUploadFile",
  components: { RequiredLabel },

  props: {
    errors: {
      type: Array,
      default() {
        return [];
      },
    },
    fileTypes: {
      type: Array,
      default() {
        return ["image/*"];
      },
    },
    id: {
      type: String,
      default: "",
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    maxFiles: {
      type: Number,
      default: 0,
    },
    maxSize: {
      type: String,
      default: "3MB",
    },
    name: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const state = reactive({
      filePond: null,
    });

    const isErrorExist = computed(() => props.errors.length > 0);
    const isLabelExist = computed(() => !!props.label);
    const validMaxFiles = computed(() => {
      if (props.maxFiles > 0) {
        return props.maxFiles;
      }

      return false;
    });

    const filePondInit = () => {
      const selector = document.getElementById(`${props.id}`);

      FilePond.registerPlugin(
        FilePondPluginFileEncode,
        FilePondPluginFileValidateSize,
        FilePondPluginFileValidateType,
        FilePondPluginImagePreview,
      );

      state.filePond = FilePond.create(selector, {
        acceptedFileTypes: props.fileTypes,
      });
    };

    const handleFileAdded = () => {
      if (!state.filePond) return;

      state.filePond.on("addfile", (error, { file }) => {
        if (error) return;

        emit("input", file);
      });
    };

    const handleFileRemoved = () => {
      if (!state.filePond) return;

      state.filePond.on("removefile", error => {
        if (error) return;

        emit("input", null);
      });
    };

    onMounted(() => {
      filePondInit();
      handleFileAdded();
      handleFileRemoved();
    });

    onUnmounted(() => {
      state.filePond.destroy();
    });

    return {
      emit,
      isErrorExist,
      isLabelExist,
      validMaxFiles,
    };
  },
};
