<template>
  <b-table :loading="loading" :data="value">
    <b-table-column field="auth_type" label="Jenis Otentikasi" v-slot="{ row }">
      {{ authTypeLabel(row.auth_type) }}
    </b-table-column>

    <b-table-column field="auth_id" label="ID" v-slot="{ row }">
      <span v-html="authIdHtml(row)"></span>
    </b-table-column>

    <b-table-column field="created_at" label="Dibuat Pada" v-slot="{ row }">
      {{ dateTimeLabel(row.created_at) }}
    </b-table-column>

    <b-table-column
      field="verified_at"
      label="Terverifikasi Pada"
      v-slot="{ row }"
    >
      {{ verifiedAtLabel(row.verified_at) }}
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

        <b-dropdown-item
          v-if="editable"
          @click="editAuth(row)"
          aria-role="menuitem"
        >
          <div class="media">
            <b-icon class="media-left" icon="pencil"></b-icon>
            <div class="media-content">
              <h3>Ubah</h3>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item
          v-if="authCanBeValidated(row)"
          @click="validateAuth(row)"
          aria-role="menuitem"
        >
          <div class="media">
            <b-icon class="media-left" icon="trash"></b-icon>
            <div class="media-content">
              <h3>Validasi</h3>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item
          v-if="authCanBeUndone(row)"
          @click="undoUpdateAuth(row)"
          aria-role="menuitem"
        >
          <div class="media">
            <b-icon class="media-left" icon="undo"></b-icon>
            <div class="media-content">
              <h3>Batalkan Perubahan</h3>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item
          v-if="authRemovable(row)"
          @click="removeAuth(row)"
          aria-role="menuitem"
        >
          <div class="media">
            <b-icon class="media-left" icon="trash"></b-icon>
            <div class="media-content">
              <h3>Hapus</h3>
            </div>
          </div>
        </b-dropdown-item>
        <hr v-if="editable" class="dropdown-divider" />
        <b-dropdown-item has-link>
          <router-link
            :to="`/users/${user.id}/tokens?auth_type=${row.auth_type}`"
          >
            <b-icon icon="account-clock"></b-icon>
            Access Token
          </router-link>
        </b-dropdown-item>
      </b-dropdown>
    </b-table-column>

    <template #empty>
      <div class="has-text-centered">Tidak ada data!</div>
    </template>
  </b-table>
</template>

<script>
import { DEFAULT_ROLE, AUTH_TYPE } from "../users.constants";
import { dateTime } from "@/shared/filters/date-time";
import { nullable, yesNo } from "@/shared/filters/utils";

export default {
  name: "UserAuthListTable",

  props: {
    user: {
      type: Object,
      required: true,
    },
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

  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    nullableLabel: nullable,
    dateTimeLabel: dateTime,
    yesNoLabel: yesNo,

    authTypeLabel(v) {
      switch (v) {
        case AUTH_TYPE.EMAIL:
          return "Email";
        case AUTH_TYPE.PHONE1:
          return "No. Telp. 1";
        case AUTH_TYPE.PHONE2:
          return "No. Telp. 2";
        default:
          return v;
      }
    },

    authIdHtml(auth) {
      let label = `${auth.auth_id}`;
      if (this.authCanBeUndone(auth)) {
        label += ` <strong>(akan berubah menjadi ${auth.update_id})</strong>`;
      }
      return label;
    },

    verifiedAtLabel(v) {
      if (v === null) {
        return "Belum Terverifikasi";
      }
      return dateTime(v);
    },

    editAuth(auth) {
      this.$emit("edit", auth);
    },

    authCanBeUndone(auth) {
      if (!this.editable) {
        return false;
      }
      return auth.update_id !== null;
    },

    undoUpdateAuth(auth) {
      this.$emit("undo-update", auth);
    },

    authCanBeValidated(auth) {
      return auth.verified_at === null || auth.update_id !== null;
    },

    validateAuth(auth) {
      if (!this.editable) {
        return false;
      }
      this.$emit("validate", auth);
    },

    authRemovable(auth) {
      if (!this.editable) {
        return false;
      }

      // check 2 things:
      // 1. user default role:
      //    - customer may delete email, but not delete phone_no1
      //    - bank_officer/admin may delete phone_no1, but not delete email
      // 2. if current user is the subject, check the auth_id used by the current token.
      // prevent deletion if uses current auth.
      const user = this.user;
      if (user === null) {
        return false;
      }
      if (user.default_role === DEFAULT_ROLE.CUSTOMER) {
        if (auth.auth_type === AUTH_TYPE.PHONE1) {
          return user.details.phone_no2 !== null;
        }
      } else if (
        [DEFAULT_ROLE.BANK_OFFICER, DEFAULT_ROLE.ADMIN].includes(
          user.default_role,
        )
      ) {
        return auth.auth_type !== AUTH_TYPE.EMAIL;
      }

      const apiToken = this.$store.state.apiToken;
      return auth.auth_id !== apiToken.authId;
    },

    removeAuth(auth) {
      this.$emit("remove", auth);
    },
  },
};
</script>
