<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <h1 class="title is-1">Ubah Rekening Nasabah</h1>

      <ValidationObserver v-slot="{ handleSubmit, valid }" ref="observer">
        <form @submit.prevent="handleSubmit(submitForm)">
          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Bank"
              >
                <AprSelect
                  v-model="bankId"
                  :errors="errors"
                  :items="banks"
                  id="SelectBank"
                  label="Bank"
                  withoutAll
                  fullWidth
                  disabled
                ></AprSelect>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Nasabah"
              >
                <AprTextField
                  :value="form.customer ? form.customer.full_name : null"
                  :errors="errors"
                  id="TxtCustomerName"
                  label="Nasabah"
                  disabled
                ></AprTextField>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|max:32"
                name="No. Rekening"
              >
                <AprTextField
                  v-model="form.accountNo"
                  :errors="errors"
                  :disabled="isBusy"
                  id="TxtAccountNo"
                  label="No. Rekening"
                  required
                ></AprTextField>
              </ValidationProvider>
            </div>
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Jenis Rekening"
              >
                <b-field
                  label="Jenis Rekening"
                  :type="errors.length > 0 ? 'is-danger' : null"
                  :message="errors.length > 0 ? errors[0] : null"
                >
                  <b-autocomplete
                    v-model="searchAccountType"
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
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Tanggal Pembukaan Rekening"
              >
                <AprDateField
                  v-model="form.openedAt"
                  :errors="errors"
                  :disabled="isBusy"
                  :max="new Date()"
                  label="Tanggal Pembukaan Rekening"
                  placeholder="Tanggal Pembukaan Rekening"
                  id="opened_at"
                  required
                ></AprDateField>
              </ValidationProvider>
            </div>
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                name="Tanggal Penutupan Rekening"
              >
                <AprDateField
                  v-model="form.closedAt"
                  :errors="errors"
                  :disabled="isBusy"
                  :min="new Date()"
                  label="Tanggal Penutupan Rekening"
                  placeholder="Tanggal Penutupan Rekening"
                  id="closed_at"
                  clearable
                ></AprDateField>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider v-slot="{ errors }" name="Keterangan">
                <AprTextarea
                  v-model="form.remarks"
                  :errors="errors"
                  :disabled="isBusy"
                  rows="3"
                  label="Keterangan"
                  placeholder="Keterangan"
                  id="remarks"
                ></AprTextarea>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <button
                :disabled="isBusy || !valid"
                id="BtnEditSubmit"
                class="button is-info is-fullwidth"
                type="submit"
              >
                Simpan
              </button>
            </div>

            <div class="column">
              <router-link
                :disabled="isBusy"
                :to="{ name: 'CustomerAccountList', query: { bank: bankId } }"
                id="BtnCancel"
                class="button is-fullwidth"
              >
                Batal
              </router-link>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script src="./customer-account-edit.js"></script>
