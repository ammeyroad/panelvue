<template>
  <b-collapse class="card" animation="slide" :open.sync="open">
    <div slot="trigger" slot-scope="props" class="card-header" role="button">
      <p class="card-header-title">
        Tabel Bunga
      </p>
      <a class="card-header-icon">
        <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
      </a>
    </div>
    <div class="card-content">
      <div class="content">
        <table class="table is-striped is-hoverable">
          <thead>
            <tr>
              <th colspan="2" class="has-text-centered">Setoran (IDR)</th>
              <th rowspan="2" class="has-text-right">Bunga per Tahun</th>
            </tr>
            <tr>
              <th class="has-text-right">Min.</th>
              <th class="has-text-right">Maks.</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rate, i) in interestRateRows" :key="i">
              <td class="has-text-right">{{ rate.min }}</td>
              <td class="has-text-right">{{ rate.max | unlimited }}</td>
              <td class="has-text-right">{{ rate.interest }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </b-collapse>
</template>

<script>
import every from "lodash/every";
import forEach from "lodash/forEach";
import has from "lodash/has";
import sortBy from "lodash/sortBy";

export default {
  name: "TabunganInterestRates",
  data() {
    return {
      open: false,
    };
  },

  props: {
    interestRates: {
      type: Array,
      default: () => [],
      validator(v) {
        if (v.length === 0) {
          return false;
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
    interestRateRows() {
      // assumption: no overlapping min-max
      return sortBy(this.interestRates, ["min"]);
    },
  },

  filters: {
    unlimited(v) {
      if (v === null) {
        return "∞";
      }
      return v;
    },
  },
};
</script>
