<template>
  <div class="AccountApplicationLayout">
    <div class="AccountApplicationLayout-header">
      <div class="level">
        <div class="level-left">
          <h1 class="title is-1">Daftar Pengajuan Pembukaan Rekening</h1>
        </div>
      </div>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <AuthBankSelector></AuthBankSelector>
          </div>
          <div class="level-item">
            <router-link
              class="button is-info"
              to="/account-applications/create"
            >
              Buat Pengajuan Baru
            </router-link>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <AprTextField
              v-model="search.filter"
              id="TxtAccountApplicationFilter"
              placeholder="Nama Produk/Nama Nasabah"
            ></AprTextField>
          </div>
          <div class="level-item">
            <AprSelect
              v-model="search.status"
              :items="statuses"
              :disabled="isBusy"
              id="SelectAccountApplicationStatus"
              label="Status"
              withoutAll
            ></AprSelect>
          </div>
          <div class="level-item">
            <b-field label="Tanggal Pengajuan">
              <b-datepicker
                v-model="search.date"
                :max-date="new Date()"
                id="DatePickerAccountApplicationDate"
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

    <div class="AccountApplicationLayout-body my-4">
      <AccountApplicationListTable
        :value="data"
        :loading="isBusy"
        @accept-application="handleAcceptAccountApplication"
        @update-status="handleConfirmStatus"
        @upload-document="handleUploadDocument"
        @error="handleRequestError('Gagal')($event)"
        editable
      ></AccountApplicationListTable>
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
                v-model="uploadDocument.documentType"
                :items="documentTypes"
                :disabled="isBusy"
                placeholder="Jenis Dokumen"
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
                <strong>{{ confirmStatus.accountApplication.id }}</strong>
                menjadi
                <strong>{{ statusLabel(confirmStatus.status) }}</strong>
                ?
              </p>
            </section>
            <footer class="modal-card-foot" style="justify-content: flex-end;">
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
      <b-modal
        v-model="acceptAccountApplication.modalActive"
        has-modal-card
        trap-focus
        destroy-on-hide
        aria-role="dialog"
        aria-modal
      >
        <template #default="{ close }">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
              <p class="modal-card-title">Persetujuan Pembukaan Rekening</p>
              <button type="button" class="delete" @click="close" />
            </header>
            <ValidationObserver v-slot="{ handleSubmit, invalid }">
              <section class="modal-card-body">
                <p>Mohon isi detail rekening baru terkait pengajuan ini.</p>

                <form
                  @submit.prevent="handleSubmit(doAcceptAccountApplication)"
                >
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|max:32"
                    name="No. Rekening"
                  >
                    <AprTextField
                      v-model="acceptAccountApplication.accountNo"
                      :errors="errors"
                      :disabled="isBusy"
                      id="TxtAccountNo"
                      label="No. Rekening"
                      required
                    ></AprTextField>
                  </ValidationProvider>

                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    name="Jenis Rekening"
                  >
                    <b-field
                      :type="errors.length > 0 ? 'is-danger' : null"
                      :message="errors.length > 0 ? errors[0] : null"
                    >
                      <template slot="label">
                        Jenis Rekening
                        <RequiredLabel />
                      </template>
                      <b-autocomplete
                        v-model="acceptAccountApplication.searchAccountType"
                        @select="handleAccountTypeSelected"
                        :data="filteredAccountTypes"
                        :disabled="isBusy"
                        field="name"
                        placeholder="Ketik Nama Produk Simpanan Bank"
                        icon="magnify"
                        clearable
                        expanded
                      >
                        <template slot="empty">
                          Produk Simpanan Tidak Ditemukan
                        </template>
                      </b-autocomplete>
                    </b-field>
                  </ValidationProvider>

                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    name="Tanggal Pembukaan Rekening"
                  >
                    <AprDateField
                      v-model="acceptAccountApplication.openedAt"
                      :errors="errors"
                      :disabled="isBusy"
                      :max="new Date()"
                      label="Tanggal Pembukaan Rekening"
                      placeholder="Tanggal Pembukaan Rekening"
                      id="opened_at"
                      required
                    ></AprDateField>
                  </ValidationProvider>
                </form>
              </section>
              <footer class="modal-card-foot">
                <button class="button" type="button" @click="close">
                  Batal
                </button>
                <button
                  @click="doAcceptAccountApplication"
                  class="button is-primary"
                  :disabled="isBusy || invalid"
                >
                  Simpan
                </button>
              </footer>
            </ValidationObserver>
          </div>
        </template>
      </b-modal>
    </div>

    <div class="AccountApplicationLayout-footer">
      <AprPagination
        :meta="meta"
        @next="handlePageChanged"
        @previous="handlePageChanged"
      />
    </div>
  </div>
</template>

<script src="./account-application-list.js"></script>
<style lang="scss" scoped src="./account-application-list.scss"></style>
