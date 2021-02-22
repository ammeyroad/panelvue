<template>
  <b-table :loading="loading" :data="value">
    <b-table-column
      v-if="showBank"
      field="bank.name"
      label="Bank"
      v-slot="{ row }"
    >
      {{ row.bank.name }}
    </b-table-column>

    <b-table-column field="account_no" label="No. Rekening" v-slot="{ row }">
      {{ row.account_no }}
    </b-table-column>

    <b-table-column
      field="account_type.name"
      label="Jenis Rekening"
      v-slot="{ row }"
    >
      {{ row.account_type.class }} - {{ row.account_type.name }}
    </b-table-column>

    <b-table-column
      v-if="!hideCustomer"
      field="customer.name"
      label="Nasabah"
      v-slot="{ row }"
    >
      {{ row.customer.full_name }}
    </b-table-column>

    <b-table-column
      field="opened_at"
      label="Tanggal Pembukaan Rekening"
      v-slot="{ row }"
    >
      {{ dateLabel(row.opened_at) }}
    </b-table-column>

    <b-table-column
      field="closed_at"
      label="Tanggal Penutupan Rekening"
      v-slot="{ row }"
    >
      {{ dateLabel(row.closed_at) }}
    </b-table-column>

    <b-table-column field="remarks" label="Catatan" v-slot="{ row }">
      {{ nullableLabel(row.remarks) }}
    </b-table-column>

    <b-table-column
      field="updated_at"
      label="Perubahan Terakhir"
      v-slot="{ row }"
    >
      {{ dateTimeLabel(row.updated_at) }}
    </b-table-column>

    <b-table-column field="actions" label="Aksi" v-slot="{ row }">
      <b-dropdown position="is-bottom-left" aria-role="list">
        <button
          class="button is-primary"
          slot="trigger"
          slot-scope="{ active }"
        >
          <span>Aksi</span>
          <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
        </button>

        <b-dropdown-item v-if="editable" has-link>
          <router-link
            :to="{
              name: 'CustomerAccountEdit',
              params: {
                bank_id: row.account_type.bank_id,
                customer_id: row.customer.id,
                id: row.id,
              },
            }"
          >
            <div class="media">
              <b-icon class="media-left" icon="pencil"></b-icon>
              <div class="media-content">Ubah</div>
            </div>
          </router-link>
        </b-dropdown-item>
      </b-dropdown>
    </b-table-column>

    <template #empty>
      <span>Tidak ada data!</span>
    </template>
  </b-table>
</template>

<script>
import { dateTime, date } from "@/shared/filters/date-time";
import { nullable } from "@/shared/filters/utils";

export default {
  name: "CustomerAccountListTable",

  props: {
    value: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hideCustomer: {
      type: Boolean,
      default: false,
    },
    hideAccountType: {
      type: Boolean,
      default: false,
    },
    showBank: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    nullableLabel: nullable,
    dateLabel: date,
    dateTimeLabel: dateTime,
  },
};
</script>
