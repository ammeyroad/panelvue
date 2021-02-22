<template>
  <b-table :loading="loading" :data="value">
    <b-table-column field="name" label="Nama" v-slot="{ row }">
      {{ row.name }}
    </b-table-column>

    <b-table-column field="address" label="Alamat" v-slot="{ row }">
      {{ row.address }}
    </b-table-column>

    <b-table-column
      field="address_lat"
      label="Alamat (Koordinat)"
      v-slot="{ row }"
    >
      <a :href="googleMapUrl(row)">
        {{ addressLatLng(row) }}
      </a>
    </b-table-column>

    <b-table-column field="phone_no1" label="No. Telp. 1" v-slot="{ row }">
      {{ row.phone_no1 }}
    </b-table-column>

    <b-table-column field="phone_no2" label="No. Telp. 2" v-slot="{ row }">
      {{ row.phone_no2 }}
    </b-table-column>

    <b-table-column
      v-if="!compact"
      field="updated_at"
      label="Perubahan Terakhir"
      v-slot="{ row }"
    >
      {{ dateTimeLabel(row.updated_at) }}
    </b-table-column>

    <b-table-column
      v-if="!compact"
      field="actions"
      label="Aksi"
      v-slot="{ row }"
    >
      <b-dropdown aria-role="list" position="is-bottom-left">
        <button
          class="button is-primary"
          slot="trigger"
          slot-scope="{ active }"
        >
          <span>Aksi</span>
          <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
        </button>

        <b-dropdown-item v-if="editable" aria-role="menuitem" has-link>
          <router-link
            :to="{
              name: 'BankBranchEdit',
              params: { bank_id: row.bank_id, id: row.id },
            }"
          >
            <div class="media">
              <b-icon class="media-left" icon="pencil"></b-icon>
              <div class="media-content">
                Ubah
              </div>
            </div>
          </router-link>
        </b-dropdown-item>
        <b-dropdown-item
          v-if="editable"
          aria-role="listitem"
          @click="confirmDeleteBranch(row)"
        >
          <div class="media">
            <b-icon class="media-left" icon="trash-can"></b-icon>
            <div class="media-content">
              Hapus
            </div>
          </div>
        </b-dropdown-item>
      </b-dropdown>
    </b-table-column>

    <template #empty>
      <span>Tidak ada data!</span>
    </template>
  </b-table>
</template>

<script>
import { dateTime } from "@/shared/filters/date-time";
import { nullable } from "@/shared/filters/utils";

export default {
  name: "BankBranchListTable",

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
    compact: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    nullableLabel: nullable,
    dateTimeLabel: dateTime,

    addressLatLng(branch) {
      if (branch.address_lat && branch.address_lng) {
        return `(${branch.address_lat}, ${branch.address_lng})`;
      } else {
        return "-";
      }
    },

    googleMapUrl(branch) {
      if (branch.address_lat && branch.address_lng) {
        return `https://www.google.com/maps/search/?api=1&query=${branch.address_lat},${branch.address_lng}`;
      } else {
        return "#";
      }
    },

    confirmDeleteBranch(branch) {
      this.$buefy.dialog.confirm({
        title: "Konfirmasi Hapus Cabang",
        message: `Apakah Anda yakin mau menghapus cabang ${branch.name}?`,
        onConfirm: () => this.deleteBranch(branch),
      });
    },

    deleteBranch(branch) {
      this.$emit("delete", branch);
    },
  },
};
</script>
