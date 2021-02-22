<template>
  <b-table
    :loading="loading"
    :data="value"
    detailed
    detail-key="id"
    show-detail-icon
  >
    <b-table-column field="id" label="ID" v-slot="{ row }">
      <router-link :to="`/account-applications/${row.bank_id}/${row.id}`">
        {{ row.id }}
      </router-link>
    </b-table-column>

    <b-table-column field="status" label="Status" v-slot="{ row }">
      {{ statusLabel(row.status) }}
    </b-table-column>

    <b-table-column
      field="customer.full_name"
      label="Nama Nasabah"
      v-slot="{ row }"
    >
      {{ row.customer.full_name }}
    </b-table-column>

    <b-table-column
      field="phone_no1"
      label="No. Telp. Nasabah"
      v-slot="{ row }"
    >
      {{ row.phone_no1 }}
    </b-table-column>

    <b-table-column field="account_type.name" label="Produk" v-slot="{ row }">
      {{ row.account_type ? row.account_type.name : null }}
    </b-table-column>

    <b-table-column
      field="account_purpose"
      label="Tujuan Rekening"
      v-slot="{ row }"
    >
      {{ row.account_purpose }}
    </b-table-column>

    <b-table-column
      field="initial_deposit_amount"
      label="Jumlah Setoran Awal"
      v-slot="{ row }"
    >
      {{ currencyLabel(row.initial_deposit_amount) }}
    </b-table-column>

    <b-table-column field="created_at" label="Waktu Pengajuan" v-slot="{ row }">
      {{ dateTimeLabel(row.created_at) }}
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

        <b-dropdown-item aria-role="menuitem" has-link>
          <router-link :to="`/account-applications/${row.bank_id}/${row.id}`">
            <div class="media">
              <b-icon class="media-left" icon="text-box"></b-icon>
              <div class="media-content">Lihat Detail</div>
            </div>
          </router-link>
        </b-dropdown-item>
        <b-dropdown-item aria-role="menuitem" has-link>
          <a :href="whatsappContactUrl(row)">
            <div class="media">
              <b-icon class="media-left" icon="whatsapp"></b-icon>
              <div class="media-content">
                <strong>Hubungi Nasabah</strong>
              </div>
            </div>
          </a>
        </b-dropdown-item>
        <b-dropdown-item v-if="appEditable(row)" aria-role="menuitem">
          <router-link
            :to="`/account-applications/${row.bank_id}/${row.id}/edit`"
          >
            <div class="media">
              <b-icon class="media-left" icon="pencil"></b-icon>
              <div class="media-content">
                <strong>Ubah</strong>
              </div>
            </div>
          </router-link>
        </b-dropdown-item>
        <b-dropdown-item
          v-if="appEditable(row)"
          @click="uploadDocument(row)"
          aria-role="menuitem"
        >
          <div class="media">
            <b-icon class="media-left" icon="upload"></b-icon>
            <div class="media-content">
              <h3>Unggah Dokomen</h3>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item v-if="appEditable(row)" separator />
        <b-dropdown-item
          v-if="appEditable(row)"
          @click="acceptAccountApplication(row)"
        >
          <div class="media">
            <b-icon class="media-left" icon="check"></b-icon>
            <div class="media-content">
              <h3>Setujui</h3>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item
          v-if="appEditable(row)"
          @click="confirmStatus(row, 'X')"
          aria-role="menuitem"
        >
          <div class="media">
            <b-icon class="media-left" icon="close-circle"></b-icon>
            <div class="media-content">
              <h3>Tolak</h3>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item
          v-if="appEditable(row)"
          @click="confirmStatus(row, 'C')"
          aria-role="menuitem"
        >
          <div class="media">
            <b-icon class="media-left" icon="trash-can"></b-icon>
            <div class="media-content">
              <h3>Batal</h3>
            </div>
          </div>
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
      <div class="columns">
        <div class="column is-one-fifth has-text-right">
          Dokumen
        </div>
        <div class="column has-text-left">
          <div
            v-for="document in row.documents"
            :key="document.id"
            class="media"
          >
            <b-icon class="media-left" icon="file-pdf"></b-icon>
            <div class="media-content">
              <p>
                <strong>{{ documentTypeLabel(document.document_type) }}</strong>
                <br />
                Diunggah pada {{ dateTimeLabel(document.created_at) }}
              </p>
              <b-button
                @click="viewDocument(document)"
                :loading="document.loading"
                type="is-primary"
                icon-left="eye"
              >
                Lihat
              </b-button>
              <b-button
                @click="downloadDocument(document)"
                :loading="document.loading"
                type="is-link"
                icon-left="download"
              >
                Unduh
              </b-button>
            </div>
          </div>
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
import { STATUS } from "@/shared/constants/applications.constant";

import { address, greetingGender } from "@/shared/filters/customers";
import { documentType } from "@/shared/filters/documents";
import { status } from "@/shared/filters/applications";
import { date, dateTime } from "@/shared/filters/date-time";
import { nullable, currency } from "@/shared/filters/utils";

import { downloadBlob } from "@/shared/utils";

import DocumentViewModal from "@/shared/components/document-view-modal/DocumentViewModal";

import useApiInvoker from "@/shared/services/api-invoker.service";

export default {
  name: "AccountApplicationListTable",

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
    dateLabel: date,
    addressLabel: address,
    nullableLabel: nullable,
    dateTimeLabel: dateTime,
    documentTypeLabel: documentType,
    statusLabel: status,
    currencyLabel: currency,
    appEditable(accountApplication) {
      if (!this.editable) {
        return false;
      }

      return ![STATUS.REJECTED, STATUS.CANCELED, STATUS.ACCEPTED].includes(
        accountApplication.status,
      );
    },

    whatsappContactUrl(accountApplication) {
      // phone number is already normalized.
      const url = `https://wa.me/${accountApplication.phone_no1}`;
      const params = new URLSearchParams();

      const gender = greetingGender(accountApplication.customer.gender);
      const accountType = accountApplication.account_type
        ? accountApplication.account_type.name
        : "";
      const message = `
        Halo, kami dari ${accountApplication.bank.name} mau menghubungi ${gender} ${accountApplication.customer.full_name}
        perihal pengajuan Pembukaan Rekening ${accountType}
        dengan nomor ${accountApplication.id}.
      `;
      params.set("text", message.replace(/\n/g, " ").trim());
      return `${url}?${params.toString()}`;
    },

    confirmStatus(accountApplication, status) {
      this.$emit("update-status", { accountApplication, status });
    },

    uploadDocument(accountApplication) {
      this.$emit("upload-document", accountApplication);
    },

    acceptAccountApplication(accountApplication) {
      this.$emit("accept-application", accountApplication);
    },

    downloadDocument(document) {
      const apiAuthHeaders = this.$store.getters.apiAuthHeader;
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeaders });

      this.$set(document, "loading", true);
      apiInvoker({
        method: "GET",
        url: document.view_url,
        responseType: "blob",
      })
        .then(res => {
          this.$set(document, "loading", false);
          const blob = new Blob([res.data], { type: document.mime });
          downloadBlob(blob, document.name);
        })
        .catch(err => {
          this.$set(document, "loading", false);
          this.$emit("error", err);
        });
    },

    viewDocument(document) {
      const apiAuthHeaders = this.$store.getters.apiAuthHeader;
      const { apiInvoker } = useApiInvoker({ headers: apiAuthHeaders });
      this.$set(document, "loading", true);
      apiInvoker({
        method: "GET",
        url: document.view_url,
        responseType: "blob",
      })
        .then(res => {
          this.$set(document, "loading", false);
          const blob = new Blob([res.data], {
            type: document.mime,
            encoding: "UTF-8",
          });
          const url = URL.createObjectURL(blob);
          this.$buefy.modal.open({
            parent: this,
            component: DocumentViewModal,
            props: {
              filename: document.name,
              mime: document.mime,
              url,
            },
            hasModalCard: true,
            trapFocus: true,
            canCancel: true,
            onCancel() {
              URL.revokeObjectURL(url);
            },
          });
        })
        .catch(err => {
          this.$set(document, "loading", false);
          this.$emit("error", err);
        });
    },
  },
};
</script>
