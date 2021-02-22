<template>
  <b-table :loading="loading" :data="value" :row-class="rowClass">
    <b-table-column field="bank.name" label="Bank" v-slot="{ row }">
      {{ row.bank.name }}
    </b-table-column>

    <b-table-column field="role" label="Hak Akses" v-slot="{ row }">
      {{ roleLabel(row.role) }}
    </b-table-column>

    <b-table-column field="valid_until" label="Berlaku Hingga" v-slot="{ row }">
      {{ dateTimeLabel(row.valid_until) }}
    </b-table-column>

    <b-table-column field="created_at" label="Dibuat Pada" v-slot="{ row }">
      {{ dateTimeLabel(row.created_at) }}
    </b-table-column>

    <b-table-column field="created_by" label="Dibuat Oleh" v-slot="{ row }">
      {{ row.created_by }}
    </b-table-column>

    <b-table-column
      field="updated_at"
      label="Perubahan Terakhir"
      v-slot="{ row }"
    >
      {{ dateTimeLabel(row.updated_at) }}
    </b-table-column>

    <b-table-column field="updated_by" label="Diubah Oleh" v-slot="{ row }">
      {{ row.updated_by }}
    </b-table-column>

    <b-table-column
      v-if="!readonly"
      field="actions"
      label="Aksi"
      v-slot="{ row }"
    >
      <b-button
        @click="editRole(row)"
        type="is-info"
        native-type="button"
        icon-left="pencil"
      >
        Ubah
      </b-button>
      <b-button
        @click="confirmRemoveRole(row)"
        type="is-danger"
        native-type="button"
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
import parseISO from "date-fns/parseISO";
import isAfter from "date-fns/isAfter";

import { dateTime } from "@/shared/filters/date-time";
import { BANK_ROLE } from "../users.constants";

export default {
  name: "UserRoleListTable",

  props: {
    value: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    dateTimeLabel: dateTime,
    rowClass(row) {
      if (row.valid_until === null) {
        return "";
      }

      if (isAfter(new Date(), parseISO(row.valid_until))) {
        return "is-expired";
      }

      return "";
    },

    editRole(role) {
      this.$emit("edit", role);
    },

    confirmRemoveRole(role) {
      this.$emit("remove", role);
    },

    roleLabel(role) {
      switch (role) {
        case BANK_ROLE.CUSTOMER:
          return "Nasabah";
        case BANK_ROLE.ACCOUNT_OFFICER:
          return "Account Officer";
        case BANK_ROLE.BANK_MANAGER:
          return "Manajer";
        default:
          return "UNKNOWN";
      }
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
