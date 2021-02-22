<template>
  <b-table
    :loading="loading"
    :data="value"
    detailed
    detail-key="id"
    show-detail-icon
  >
    <b-table-column
      field="first_middle_name"
      label="Nama Depan"
      v-slot="{ row }"
    >
      {{ row.first_middle_name }}
    </b-table-column>

    <b-table-column field="last_name" label="Nama Belakang" v-slot="{ row }">
      {{ row.last_name }}
    </b-table-column>

    <b-table-column field="default_role" label="Jenis" v-slot="{ row }">
      {{ userRoleLabel(row.default_role) }}
    </b-table-column>

    <b-table-column field="is_active" label="Aktif" v-slot="{ row }">
      {{ yesNoLabel(row.is_active) }}
    </b-table-column>

    <b-table-column
      field="details.gender"
      label="Jenis Kelamin"
      v-slot="{ row }"
    >
      {{ genderLabel(row.details.gender) }}
    </b-table-column>

    <b-table-column
      field="details.phone_no1"
      label="No. Telp. 1"
      v-slot="{ row }"
    >
      {{ nullableLabel(row.details.phone_no1) }}
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

        <b-dropdown-item v-if="userEditable(row)" has-link>
          <router-link :to="`/users/${row.id}/edit`">
            <div class="media">
              <b-icon class="media-left" icon="pencil"></b-icon>
              <div class="media-content">
                Ubah
              </div>
            </div>
          </router-link>
        </b-dropdown-item>
        <b-dropdown-item
          v-if="!userIsCustomer(row) && canViewUserSecrets(row)"
          has-link
        >
          <router-link :to="`/users/${row.id}/roles`">
            <div class="media">
              <b-icon class="media-left" icon="account-lock"></b-icon>
              <div class="media-content">
                Hak Akses
              </div>
            </div>
          </router-link>
        </b-dropdown-item>
        <b-dropdown-item v-if="canViewUserSecrets(row)" has-link>
          <router-link :to="`/users/${row.id}/auths`">
            <div class="media">
              <b-icon class="media-left" icon="lock"></b-icon>
              <div class="media-content">
                Metode Otentikasi
              </div>
            </div>
          </router-link>
        </b-dropdown-item>
        <b-dropdown-item v-if="canViewUserSecrets(row)" has-link>
          <router-link :to="`/users/${row.id}/tokens`">
            <div class="media">
              <b-icon class="media-left" icon="account-clock"></b-icon>
              <div class="media-content">
                Access Token
              </div>
            </div>
          </router-link>
        </b-dropdown-item>
        <template v-if="canDeleteUser()">
          <b-dropdown-item separator></b-dropdown-item>
          <b-dropdown-item @click="deleteUser(row)">
            <div class="media">
              <b-icon class="media-left" icon="trash-can"></b-icon>
              <div class="media-content">Hapus</div>
            </div>
          </b-dropdown-item>
        </template>
      </b-dropdown>
    </b-table-column>

    <template #detail="{ row }">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="card is-shadowless">
            <div class="card-header">
              <div class="card-header-title">Detail Pengguna</div>
            </div>
            <div class="card-content">
              <div class="content">
                <div class="columns is-multiline">
                  <div class="column is-4">
                    <p class="heading">Tanggal Lahir</p>
                    <p class="title is-size-5">
                      {{ dateLabel(row.details.date_of_birth) }}
                    </p>
                  </div>

                  <div class="column is-4">
                    <p class="heading">No. Identitas</p>
                    <p class="title is-size-5">
                      {{ row.details.identity_no }}
                    </p>
                  </div>

                  <div class="column is-4">
                    <p class="heading">No. Telp. 2</p>
                    <p class="title is-size-5">
                      {{ nullableLabel(row.details.phone_no2) }}
                    </p>
                  </div>

                  <div class="column is-4">
                    <p class="heading">Email</p>
                    <p class="title is-size-5">
                      {{ nullableLabel(row.details.email) }}
                    </p>
                  </div>

                  <div class="column is-12">
                    <p class="heading">Alamat Rumah</p>
                    <p
                      class="title is-size-5"
                      v-html="addressLabel(row.details.personal_address)"
                    ></p>
                  </div>

                  <div class="column is-12">
                    <p class="heading">Alamat Kantor</p>
                    <p
                      class="title is-size-5"
                      v-html="addressLabel(row.details.work_address)"
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #empty>
      <div class="has-text-centered">Tidak ada data!</div>
    </template>
  </b-table>
</template>

<script>
import { DEFAULT_ROLE } from "../users.constants";

import { gender, address } from "@/shared/filters/customers";
import { date, dateTime } from "@/shared/filters/date-time";
import { nullable, yesNo } from "@/shared/filters/utils";
import { defaultRole } from "../users.filters";

import { canEdit, canDelete } from "../users.auth";

export default {
  name: "UserListTable",

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

  computed: {
    DEFAULT_ROLE_CUSTOMER: () => DEFAULT_ROLE.CUSTOMER,
  },

  methods: {
    genderLabel: gender,
    addressLabel: address,
    nullableLabel: nullable,
    dateLabel: date,
    dateTimeLabel: dateTime,
    yesNoLabel: yesNo,
    userRoleLabel: defaultRole,
    canDeleteUser: canDelete,

    userEditable(user) {
      if (!this.editable) {
        return false;
      }

      const currentUserId = this.$store.state.user.id;
      return user.id !== currentUserId && canEdit(user);
    },

    canViewUserSecrets: user => canEdit(user),

    userIsCustomer(user) {
      return user.default_role === DEFAULT_ROLE.CUSTOMER;
    },

    deleteUser(user) {
      this.$emit("delete", user);
    },
  },
};
</script>
