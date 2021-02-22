<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th colspan="2" class="has-text-centered">Setoran (IDR)</th>
        <th rowspan="2">Bunga p.a.</th>
      </tr>
      <tr>
        <th>Min.</th>
        <th>Maks.</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rate, i) in interestRates" :key="i">
        <td>
          <ValidationProvider v-slot="{ errors }" :rules="getMinRules(i)">
            <b-field
              :message="errors[0]"
              :type="errors.length > 0 ? 'is-danger' : null"
            >
              <b-input
                @input="handleMinInput(i, $event)"
                :value="rate.min"
                :disabled="disabled"
                min="0"
                type="number"
              ></b-input>
            </b-field>
          </ValidationProvider>
        </td>
        <td>
          <ValidationProvider v-slot="{ errors }" :rules="getMaxRules(i)">
            <b-field
              :message="errors[0]"
              :type="errors.length > 0 ? 'is-danger' : null"
            >
              <b-input
                @input="handleMaxInput(i, $event)"
                :value="rate.max"
                :disabled="rate.maxUnlimited || disabled"
                min="0"
                type="number"
              ></b-input>
              <b-checkbox
                v-if="i === interestRates.length - 1"
                @input="handleUnlimitedInput(i, $event)"
                :value="rate.maxUnlimited"
                :disabled="disabled"
              >
                Tak Hingga
              </b-checkbox>
            </b-field>
          </ValidationProvider>
        </td>
        <td>
          <ValidationProvider v-slot="{ errors }" :rules="interestRules">
            <b-field
              :message="errors[0]"
              :type="errors.length > 0 ? 'is-danger' : null"
            >
              <b-input
                @input="handleInterestInput(i, $event)"
                :value="rate.interest"
                :disabled="disabled"
                type="number"
                step="0.01"
                min="0"
              ></b-input>
              <p class="control">
                <span class="button is-static">%</span>
              </p>
              <p v-if="i < interestRates.length - 1" class="control">
                <button
                  @click="removeRecord(i)"
                  :disabled="disabled"
                  class="button is-danger"
                >
                  <i class="mdi mdi-close"></i>
                  Hapus
                </button>
              </p>
            </b-field>
          </ValidationProvider>
        </td>
      </tr>
      <tr colspan="3">
        <td>
          <button
            @click="addNewRecord"
            :disabled="disabled"
            class="button is-primary"
            type="button"
          >
            Tambah
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import forEach from "lodash/forEach";
import every from "lodash/every";
import has from "lodash/has";
import cloneDeep from "lodash/cloneDeep";
import omit from "lodash/omit";

import { extend, ValidationProvider } from "vee-validate";
import { required, max_value, min_value } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Wajib diisi",
});

extend("min_value", {
  ...min_value,
  message: "Nilai tidak boleh lebih kecil dari {min}",
});

extend("max_value", {
  ...max_value,
  message: "Nilai tidak boleh lebih besar dari {max}",
});

export default {
  name: "TabunganInterestRatesForm",
  components: { ValidationProvider },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      required: true,
      validator(v) {
        if (v.length === 0) {
          return true;
        }

        const requiredKeys = ["min", "max", "interest"];
        return every(v, rate => {
          let isValid = true;
          forEach(requiredKeys, key => {
            isValid = has(rate, key);
            return isValid;
          });
          return isValid;
        });
      },
    },
  },

  computed: {
    interestRates() {
      const values = this.value.map((interestRate, i, arr) => ({
        ...interestRate,
        maxUnlimited: interestRate.max === null && i === arr.length - 1,
      }));
      return values;
    },

    interestRules() {
      return { required: true, min_value: { min: 0 } };
    },
  },

  methods: {
    getMinRules() {
      const rules = { required: true };
      return rules;
    },
    getMaxRules(index) {
      if (index === this.interestRates.length - 1) {
        return {};
      }
      return {
        required: true,
      };
    },
    addNewRecord() {
      const values = cloneDeep(this.interestRates);
      const min =
        this.interestRates.length === 0
          ? 0
          : this.interestRates[this.interestRates.length - 1].max + 1;
      values.push({
        min,
        max: null,
        interest: 0,
      });
      this.updateValue(values);
    },
    removeRecord(index) {
      const values = cloneDeep(this.interestRates);
      values.splice(index, 1);
      this.updateValue(values);
    },
    handleMinInput(index, newValue) {
      const values = cloneDeep(this.interestRates);
      values[index].min = Number.parseInt(newValue);
      this.updateValue(values);
    },
    handleMaxInput(index, newValue) {
      const values = cloneDeep(this.interestRates);
      values[index].max = Number.parseInt(newValue);
      this.updateValue(values);
    },
    handleUnlimitedInput(index, newValue) {
      const values = cloneDeep(this.interestRates);
      values[index].max = newValue ? null : values[index].min + 1;
      this.updateValue(values);
    },
    handleInterestInput(index, newValue) {
      const values = cloneDeep(this.interestRates);
      values[index].interest = Number.parseFloat(newValue);
      this.updateValue(values);
    },
    updateValue(values) {
      this.$emit(
        "input",
        values.map(v => omit(v, ["maxUnlimited"])),
      );
    },
  },
};
</script>
