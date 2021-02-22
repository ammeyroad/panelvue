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
              <th :colspan="interestRateCols.length" class="has-text-centered">
                Periode
              </th>
            </tr>
            <tr>
              <th class="has-text-right">Min.</th>
              <th class="has-text-right">Maks.</th>
              <th
                v-for="(period, i) in interestRateCols"
                :key="i"
                rowspan="2"
                class="has-text-right"
              >
                {{ period }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rate, i) in interestRateRows" :key="i">
              <td class="has-text-right">{{ rate.min }}</td>
              <td class="has-text-right">{{ rate.max | unlimited }}</td>
              <td
                v-for="(interest, j) in rate.interests"
                :key="j"
                class="has-text-right"
              >
                {{ interest }}%
              </td>
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
import sortedUniq from "lodash/sortedUniq";
import sortBy from "lodash/sortBy";

export default {
  name: "DepositoInterestRates",

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
        const requiredKeys = ["min", "max", "interest", "period"];
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
    interestRateCols() {
      const periods = sortedUniq(this.interestRates.map(rate => rate.period));
      return periods.map(period => `${period} Bulan`);
    },
    interestRateRows() {
      // assumption: no overlapping min-max for the same period
      const rates = sortBy(this.interestRates, ["min", "period"]);

      return Object.values(
        rates.reduce((acc, rate) => {
          const key = rate.min;
          if (has(acc, key)) {
            acc[key].interests.push(rate.interest);
          } else {
            acc[key] = {
              min: rate.min,
              max: rate.max,
              interests: [rate.interest],
            };
          }
          return acc;
        }, {}),
      );
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
