<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <h1 class="title is-1">Buat Rekening Nasabah Baru</h1>

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
                  v-model="form.bank"
                  :errors="errors"
                  :items="banks"
                  :disabled="isBusy"
                  id="SelectBank"
                  label="Bank"
                  withoutAll
                  fullWidth
                  required
                ></AprSelect>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors, validate }"
                rules="required"
                name="Nasabah"
              >
                <b-field
                  :type="errors.length > 0 ? 'is-danger' : null"
                  :message="errors.length > 0 ? errors[0] : null"
                >
                  <template slot="label">
                    Nasabah
                    <RequiredLabel />
                  </template>
                  <b-autocomplete
                    @select="handleCustomerSelected(validate, $event)"
                    @typing="searchCustomers"
                    :data="customers"
                    :loading="customersLoading"
                    :disabled="isBusy"
                    field="full_name"
                    placeholder="Ketik Nama Nasabah"
                    icon="person"
                    expanded
                  >
                    <template slot="empty">
                      Nasabah Tidak Ditemukan
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
                rules="required|max:32"
                name="No. Rekening"
              >
                <AprTextField
                  @input="$set(form, 'accountNo', $event.toUpperCase())"
                  :value="form.accountNo"
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
                  :type="errors.length > 0 ? 'is-danger' : null"
                  :message="errors.length > 0 ? errors[0] : null"
                >
                  <template slot="label">
                    Jenis Rekening
                    <RequiredLabel />
                  </template>
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
                id="BtnCreateSubmit"
                class="button is-info is-fullwidth"
                type="submit"
              >
                Simpan
              </button>
            </div>

            <div class="column">
              <router-link
                :disabled="isBusy"
                :to="{ name: 'CustomerAccountList' }"
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

<script src="./customer-account-create.js"></script>
