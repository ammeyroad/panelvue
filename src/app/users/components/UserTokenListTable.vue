<template>
  <b-table :loading="loading" :data="value" :row-class="rowClass">
    <b-table-column field="api_token" label="Token" v-slot="{ row }">
      {{ truncate(row.api_token, 32) }}
    </b-table-column>

    <b-table-column field="auth_id" label="ID" v-slot="{ row }">
      {{ row.auth_id }}
    </b-table-column>

    <b-table-column field="created_at" label="Dibuat Pada" v-slot="{ row }">
      {{ dateTimeLabel(row.created_at) }}
    </b-table-column>

    <b-table-column field="valid_until" label="Berlaku Hingga" v-slot="{ row }">
      {{ dateTimeLabel(row.valid_until) }}
    </b-table-column>

    <b-table-column field="ip" label="IP" v-slot="{ row }">
      {{ row.ip }}
    </b-table-column>

    <b-table-column field="agent" label="User Agent" v-slot="{ row }">
      {{ truncate(row.agent, 50) }}
    </b-table-column>

    <b-table-column
      v-if="!readonly"
      field="actions"
      label="Aksi"
      v-slot="{ row }"
    >
      <b-button
        v-if="tokenCanBeInvalidated(row)"
        @click="confirmInvalidateToken(row)"
        native-type="button"
        type="is-danger"
        icon-left="delete"
      >
        Hapus
      </b-button>
    </b-table-column>

    <template #empty>
      <div class="has-text-centered">Tidak ada data!</div>
    </template>
  </b-table>
</template>

<script>
import _truncate from "lodash/truncate";

import { dateTime } from "@/shared/filters/date-time";

export default {
  name: "UserTokenListTable",

  props: {
    value: {
      type: Array,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    dateTimeLabel: dateTime,
    rowClass(token) {
      if (token.is_expired) {
        return "is-expired";
      }
      return "";
    },
    truncate: (str, length) => _truncate(str, { length }),

    tokenCanBeInvalidated(token) {
      return !token.is_expired;
    },

    confirmInvalidateToken(token) {
      this.$emit("invalidate", token);
    },
  },
};
</script>

<style scoped>
tr.is-expired {
  background: #167df0;
  color: #fff;
}
</style>
