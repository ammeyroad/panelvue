<template>
  <fragment>
    <ValidationProvider
      v-slot="{ errors }"
      :rules="{ required }"
      name="Baris 1"
    >
      <b-field
        :message="errors.length > 0 ? errors[0] : null"
        :type="errors.length > 0 ? 'is-danger' : null"
      >
        <template slot="label">
          Baris 1
          <RequiredLabel v-if="required" />
        </template>
        <b-input
          @input="handleInput('line1', $event)"
          :value="line1"
          :disabled="disabled"
          :id="`${id}line1`"
          placeholder="Nama jalan, Nomor"
          expanded
        ></b-input>
      </b-field>
    </ValidationProvider>
    <ValidationProvider v-slot="{ errors }" rules="" name="Baris 2">
      <AprTextField
        @input="handleInput('line2', $event)"
        :value="line2"
        :errors="errors"
        :disabled="disabled"
        :id="`${id}line2`"
        label="Baris 2"
        placeholder="RT/RW, Gedung, dsb."
      ></AprTextField>
    </ValidationProvider>
    <ValidationProvider v-slot="{ errors }" rules="" name="Baris 3">
      <AprTextField
        @input="handleInput('line3', $event)"
        :value="line3"
        :errors="errors"
        :disabled="disabled"
        :id="`${id}line3`"
        label="Baris 3"
        placeholder="Penunjuk Jalan"
      ></AprTextField>
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      :rules="{ required }"
      name="Desa/Kelurahan"
    >
      <b-field
        :message="errors.length > 0 ? errors[0] : null"
        :type="errors.length > 0 ? 'is-danger' : null"
      >
        <template slot="label">
          Desa/Kelurahan
          <RequiredLabel v-if="required" />
        </template>
        <b-input
          @input="
            handleInput('desa_kelurahan', $event ? $event.toUpperCase() : '')
          "
          :value="desa_kelurahan"
          :disabled="disabled"
          :id="`${id}line1`"
          expanded
        ></b-input>
      </b-field>
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      :rules="{ required }"
      name="Kabupaten/Kota"
    >
      <b-field
        :message="errors.length > 0 ? errors[0] : null"
        :type="errors.length > 0 ? 'is-danger' : null"
      >
        <template slot="label">
          Kabupaten/Kota
          <RequiredLabel v-if="required" />
        </template>
        <b-input
          @input="
            handleInput('kabupaten_kota', $event ? $event.toUpperCase() : '')
          "
          :value="kabupaten_kota"
          :disabled="disabled"
          :id="`${id}desa_kelurahan`"
          expanded
        ></b-input>
      </b-field>
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      :rules="{ required }"
      name="Provinsi"
    >
      <b-field
        :message="errors.length > 0 ? errors[0] : null"
        :type="errors.length > 0 ? 'is-danger' : null"
      >
        <template slot="label">
          Provinsi
          <sup v-if="required" class="has-text-danger">(wajib diisi)</sup>
        </template>
        <b-input
          @input="handleInput('province', $event ? $event.toUpperCase() : '')"
          :value="province"
          :disabled="disabled"
          :id="`${id}province`"
          expanded
        ></b-input>
      </b-field>
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      :rules="{ required }"
      name="Kode Pos"
    >
      <b-field
        :message="errors.length > 0 ? errors[0] : null"
        :type="errors.length > 0 ? 'is-danger' : null"
      >
        <template slot="label">
          Kode Pos
          <RequiredLabel v-if="required" />
        </template>
        <b-input
          @input="handleInput('postcode', $event)"
          :value="postcode"
          :disabled="disabled"
          :id="`${id}postcode`"
          expanded
          maxlength="5"
        ></b-input>
      </b-field>
    </ValidationProvider>
  </fragment>
</template>

<script>
import _debounce from "lodash/debounce";
import { ValidationProvider } from "vee-validate";

import AprTextField from "@/shared/components/apr-text-field/AprTextField.vue";
import RequiredLabel from "@/shared/components/RequiredLabel.vue";

export default {
  name: "AddressForm",
  components: { ValidationProvider, AprTextField, RequiredLabel },

  props: {
    id: {
      type: String,
      default: "address",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Alamat",
    },
  },

  mounted() {
    const newValue = this.value;
    this.line1 = newValue.line1;
    this.line2 = newValue.line2;
    this.line3 = newValue.line3;
    this.desa_kelurahan = newValue.desa_kelurahan;
    this.kecamatan = newValue.kecamatan;
    this.kabupaten_kota = newValue.kabupaten_kota;
    this.province = newValue.province;
    this.postcode = newValue.postcode;
  },

  data() {
    return {
      line1: "",
      line2: "",
      line3: "",
      desa_kelurahan: "",
      kecamatan: "",
      kabupaten_kota: "",
      province: "",
      postcode: "",
    };
  },

  watch: {
    value(newValue) {
      this.line1 = newValue.line1;
      this.line2 = newValue.line2;
      this.line3 = newValue.line3;
      this.desa_kelurahan = newValue.desa_kelurahan;
      this.kecamatan = newValue.kecamatan;
      this.kabupaten_kota = newValue.kabupaten_kota;
      this.province = newValue.province;
      this.postcode = newValue.postcode;
    },
  },

  methods: {
    handleInput(element, value) {
      this.$set(this, element, value);
      this.$nextTick(this.updateValue);
    },

    updateValue: _debounce(function() {
      this.$emit("input", {
        line1: this.line1,
        line2: this.line2,
        line3: this.line3,
        desa_kelurahan: this.desa_kelurahan,
        kecamatan: this.kecamatan,
        kabupaten_kota: this.kabupaten_kota,
        province: this.province,
        postcode: this.postcode,
      });
    }, 500),
  },
};
</script>
