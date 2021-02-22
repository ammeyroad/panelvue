<template>
  <b-table
    :loading="loading"
    :data="value"
    detailed
    detail-key="id"
    show-detail-icon
  >
    <b-table-column field="identity_no" label="No. Identitas" v-slot="{ row }">
      {{ row.identity_no }}
    </b-table-column>

    <b-table-column field="full_name" label="Nama Lengkap" v-slot="{ row }">
      {{ row.full_name }}
    </b-table-column>

    <b-table-column field="gender" label="Jenis Kelamin" v-slot="{ row }">
      {{ genderLabel(row.gender) }}
    </b-table-column>

    <b-table-column field="date_of_birth" label="Tgl. Lahir" v-slot="{ row }">
      {{ dateLabel(row.date_of_birth) }}
    </b-table-column>

    <b-table-column field="phone_no1" label="No. Telp. 1" v-slot="{ row }">
      {{ row.phone_no1 }}
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
          <router-link :to="`/customers/${row.bank_id}/${row.id}/edit`">
            <div class="media">
              <b-icon class="media-left" icon="pencil"></b-icon>
              <div class="media-content">Ubah</div>
            </div>
          </router-link>
        </b-dropdown-item>
      </b-dropdown>
    </b-table-column>

    <template #detail="{ row }">
      <div class="columns">
        <div class="column is-one-fifth has-text-right">
          No. Telp. 2
        </div>
        <div class="column has-text-left">
          {{ nullableLabel(row.phone_no2) }}
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-fifth has-text-right">
          E-mail
        </div>
        <div class="column has-text-left">
          {{ nullableLabel(row.email) }}
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-fifth has-text-right">
          Alamat Tempat Tinggal
        </div>
        <div class="column has-text-left">
          <span v-if="addressIsEmpty(row.personal_address)">-</span>
          <div v-else v-html="addressLabel(row.personal_address)"></div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-fifth has-text-right">
          Alamat Tempat Kerja/Kantor
        </div>
        <div class="column has-text-left">
          <span v-if="addressIsEmpty(row.work_address)">-</span>
          <div v-else v-html="addressLabel(row.work_address)"></div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-fifth has-text-right">
          Keterangan
        </div>
        <div class="column has-text-left">
          {{ row.description }}
        </div>
      </div>
    </template>
    <template #empty>
      <span>Tidak ada data!</span>
    </template>
  </b-table>
</template>

<script>
import _isEqual from "lodash/isEqual";

import { EMPTY_ADDRESS } from "@/shared/constants/address.constant";
import { gender, address } from "@/shared/filters/customers";
import { date, dateTime } from "@/shared/filters/date-time";
import { nullable } from "@/shared/filters/utils";

export default {
  name: "CustomerListTable",

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
  },

  methods: {
    addressIsEmpty(address) {
      return address === null || _isEqual(address, EMPTY_ADDRESS);
    },
    genderLabel: gender,
    dateLabel: date,
    addressLabel: address,
    nullableLabel: nullable,
    dateTimeLabel: dateTime,
  },
};
</script>
