<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <div class="level">
        <div class="level-left">
          <h3 class="title is-5">No. {{ application.id }}</h3>
        </div>
        <div class="level-right">
          <h5 class="subtitle is-5">{{ statusLabel(application.status) }}</h5>
        </div>
      </div>
    </div>

    <div class="column is-12">
      <div class="card is-shadowless">
        <div class="card-header">
          <div class="card-header-title">Data Pendapatan</div>
        </div>

        <div class="card-content">
          <div class="content">
            <div class="columns is-multiline">
              <div class="column is-4">
                <p class="heading">Pekerjaan</p>
                <p class="title is-size-5">
                  {{ application.work_type }}
                </p>
              </div>

              <div class="column is-4">
                <p class="heading">Sumber Pendapatan</p>
                <p class="title is-size-5">
                  {{ application.source_of_income }}
                </p>
              </div>

              <div class="column is-12">
                <p class="heading">Alamat Kantor</p>
                <p
                  class="title is-size-5"
                  v-html="addressLabel(application.work_address)"
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-12">
      <div class="card is-shadowless">
        <div class="card-header">
          <div class="card-header-title">Data Pinjaman</div>
        </div>

        <div class="card-content">
          <div class="content">
            <div class="columns is-multiline">
              <div class="column is-4">
                <div>
                  <p class="heading">Nominal Pinjaman</p>
                  <p class="title is-size-5">
                    {{ currencyLabel(application.loan_amount) }}
                  </p>
                </div>
              </div>

              <div class="column is-4">
                <p class="heading">Tujuan Pinjaman</p>
                <p class="title is-size-5">
                  {{ application.loan_purpose }}
                </p>
              </div>

              <div class="column is-4">
                <div>
                  <p class="heading">Memiliki Rekening Sebelumnya</p>
                  <p class="title is-size-5">
                    {{ yesNoLabel(application.details.has_existing_account) }}
                  </p>
                </div>
              </div>

              <div class="column is-4">
                <div>
                  <p class="heading">Waktu Pengajuan</p>
                  <p class="title is-size-5">
                    {{ dateTimeLabel(application.created_at) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-12">
      <div class="card is-shadowless">
        <div class="card-header">
          <div class="card-header-title">Dokumen Pendukung</div>
        </div>

        <div class="card-content">
          <div class="content">
            <div class="columns is-multiline">
              <div
                v-for="document in documents"
                :key="document.id"
                class="column is-4"
              >
                <p class="heading">
                  {{ documentTypeLabel(document.document_type) }}
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
      </div>
    </div>
  </div>
</template>

<script>
import { address } from "@/shared/filters/customers";
import { dateTime } from "@/shared/filters/date-time";
import { documentType } from "@/shared/filters/documents";
import { yesNo, nullable, currency } from "@/shared/filters/utils";
import { status as statusLabel } from "@/shared/filters/applications";

import { downloadBlob } from "@/shared/utils";

import DocumentViewModal from "@/shared/components/document-view-modal/DocumentViewModal";

import useApiInvoker from "@/shared/services/api-invoker.service";

export default {
  name: "AccountApplicationView",
  props: {
    application: {
      type: Object,
      required: true,
    },

    withAudit: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    application(newValue) {
      this.documents = newValue.documents.map(d => ({
        ...d,
        loading: false,
      }));
    },
  },

  mounted() {
    this.documents = this.application.documents.map(d => ({
      ...d,
      loading: false,
    }));
  },

  data() {
    return {
      documents: [],
    };
  },

  methods: {
    addressLabel: address,
    dateTimeLabel: dateTime,
    yesNoLabel: yesNo,
    currencyLabel: currency,
    nullable,
    statusLabel,
    documentTypeLabel: documentType,

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
