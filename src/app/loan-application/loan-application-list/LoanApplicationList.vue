<template>
  <div class="LoanApplicationLayout">
    <div class="LoanApplicationLayout-header">
      <div class="level">
        <div class="level-left">
          <h1 class="title is-1">Daftar Pengajuan Pinjaman</h1>
        </div>
      </div>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <AuthBankSelector></AuthBankSelector>
          </div>
          <div class="level-item">
            <router-link class="button is-info" to="/loan-applications/create">
              Buat Pengajuan Baru
            </router-link>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <AprTextField
              v-model="search.filter"
              id="TxtLoanApplicationFilter"
              placeholder="Nama Nasabah"
            ></AprTextField>
          </div>
          <div class="level-item">
            <AprSelect
              v-model="search.status"
              :items="statuses"
              :disabled="isBusy"
              id="SelectLoanApplicationStatus"
              label="Status"
              withoutAll
            ></AprSelect>
          </div>
          <div class="level-item">
            <b-field label="Tanggal Pengajuan">
              <b-datepicker
                v-model="search.date"
                :max-date="new Date()"
                id="DatePickerLoanApplicationDate"
                locale="id-ID"
                placeholder="Pilih Tanggal"
              >
                <button @click="search.date = null" class="button is-danger">
                  <b-icon icon="close"></b-icon>
                  <span>Bersihkan</span>
                </button>
              </b-datepicker>
            </b-field>
          </div>

          <div class="level-item">
            <button class="button" @click="refreshData">Cari</button>
          </div>
        </div>
      </nav>
    </div>

    <div class="LoanApplicationLayout-body my-4">
      <LoanApplicationListTable
        :value="data"
        :loading="isBusy"
        @update-status="handleConfirmStatus"
        @upload-document="handleUploadDocument"
        @error="handleRequestError"
        editable
      ></LoanApplicationListTable>
      <b-modal
        v-model="uploadDocument.modalActive"
        has-modal-card
        trap-focus
        destroy-on-hide
        aria-role="dialog"
        aria-modal
      >
        <template #default="{ close }">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
              <p class="modal-card-title">Unggah Dokumen</p>
              <button type="button" class="delete" @click="close" />
            </header>
            <section class="modal-card-body">
              <b-field>
                <b-upload v-model="uploadDocument.file" drag-drop>
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <b-icon icon="upload" size="is-large"></b-icon>
                      </p>
                      <p>
                        Tarik file yang akan diunggah ke sini atau klik untuk
                        memilih file yang akan diunggah
                      </p>
                    </div>
                  </section>
                </b-upload>
              </b-field>

              <AprSelect
                v-model="uploadDocument.type"
                :items="documentTypes"
                :disabled="isBusy"
                id="SelectUploadDocument"
                label="Jenis"
              ></AprSelect>
            </section>
            <footer class="modal-card-foot">
              <button class="button" type="button" @click="close">
                Batal
              </button>
              <button
                @click="doUploadDocument"
                class="button is-primary"
                :disabled="
                  isBusy &&
                    uploadDocument.type === null &&
                    uploadDocument.file === null
                "
              >
                Unggah
              </button>
            </footer>
          </div>
        </template>
      </b-modal>
      <b-modal
        v-model="confirmStatus.modalActive"
        has-modal-card
        trap-focus
        destroy-on-hide
        aria-role="dialog"
        aria-modal
      >
        <template #default="{ close }">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
              <p class="modal-card-title">Konfirm Perubahan Status</p>
              <button type="button" class="delete" @click="close" />
            </header>
            <section class="modal-card-body">
              <p>
                Apakah Anda yakin ingin mengubah status pengajuan rekening
                <strong>{{ confirmStatus.loanApplication.id }}</strong>
                menjadi
                <strong>{{ statusLabel(confirmStatus.status) }}</strong>
                ?
              </p>
            </section>
            <footer class="modal-card-foot">
              <button
                @click="doConfirmStatus"
                class="button is-primary"
                :disabled="isBusy"
              >
                Ya
              </button>
              <button class="button" type="button" @click="close">
                Tidak
              </button>
            </footer>
          </div>
        </template>
      </b-modal>
    </div>

    <div class="LoanApplicationLayout-footer">
      <AprPagination
        :meta="meta"
        @next="handlePageChanged"
        @previous="handlePageChanged"
      />
    </div>
  </div>
</template>

<script src="./loan-application-list.js"></script>
<style lang="scss" scoped src="./loan-application-list.scss"></style>
