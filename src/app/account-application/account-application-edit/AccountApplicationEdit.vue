<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <h1 class="title is-1">Ubah Pengajuan Pembukaan Rekening {{ id }}</h1>

      <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="observer">
        <form @submit.prevent="handleSubmit(submitForm)">
          <div class="columns">
            <div class="column">
              <AprSelect
                v-model="form.bank"
                :items="banks"
                id="SelectBank"
                label="Bank"
                withoutAll
                fullWidth
                disabled
              ></AprSelect>
            </div>
          </div>

          <div class="columns">
            <div class="column is-third-quarter">
              <AprTextField
                :value="form.customer ? form.customer.full_name : 'N/A'"
                label="Nasabah"
                name="customer"
                id="TxtCustomer"
                disabled
              ></AprTextField>
            </div>
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Sudah Memiliki Rekening"
              >
                <AprSelect
                  v-model="form.hasExistingAccount"
                  :errors="errors"
                  :items="hasExistingAccount"
                  :disabled="isBusy"
                  name="has_existing_account"
                  id="SelectHasExistingAccount"
                  label="Sudah Memiliki Rekening Sebelumnya"
                  withoutAll
                  fullWidth
                ></AprSelect>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column is-one-third">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Jenis Rekening"
              >
                <AprSelect
                  v-model="form.accountType"
                  :errors="errors"
                  :items="accountTypes"
                  :disabled="isBusy"
                  name="account_type"
                  id="SelectAccountType"
                  label="Jenis Rekening"
                  placeholder="Pilih Jenis Rekening"
                  fullWidth
                  required
                ></AprSelect>
              </ValidationProvider>
            </div>

            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Preferensi Produk"
              >
                <b-field
                  :type="errors.length > 0 ? 'is-danger' : null"
                  :message="errors.length > 0 ? errors[0] : null"
                >
                  <template slot="label">
                    Preferensi Produk
                    <RequiredLabel />
                  </template>
                  <b-autocomplete
                    v-model="searchPreferredAccountType"
                    @select="handlePreferredAccountTypeSelected"
                    :data="filteredPreferredAccountTypes"
                    :disabled="isBusy"
                    field="name"
                    placeholder="Ketik Nama Produk"
                    icon="magnify"
                    clearable
                    expanded
                  >
                    <template slot="empty">
                      Jenis Produk Tidak Ditemukan
                    </template>
                  </b-autocomplete>
                </b-field>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column is-one-third">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Tujuan Pembukaan Rekening"
              >
                <AprSelect
                  v-model="form.accountPurpose"
                  :errors="errors"
                  :items="accountPurposes"
                  :disabled="isBusy"
                  name="account_purpose"
                  id="SelectAccountPurpose"
                  label="Tujuan Pembukaan Rekening"
                  placeholder="Pilih Tujuan Pembukaan Rekening"
                  fullWidth
                  required
                ></AprSelect>
              </ValidationProvider>
            </div>

            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Setoran Awal"
              >
                <b-field
                  :type="errors.length > 0 ? 'is-danger' : null"
                  :message="errors.length > 0 ? errors[0] : null"
                >
                  <template slot="label">
                    Setoran Awal
                    <RequiredLabel />
                  </template>
                  <p class="control">
                    <span class="button is-static">Rp</span>
                  </p>
                  <b-input
                    v-cleave="numeralMask"
                    @input.native="onInitialDepositAmountInput"
                    :value="form.initialDepositFormatted"
                    :disabled="isBusy"
                    ref="initialDeposit"
                    name="initial_deposit_amount"
                    placeholder="Setoran Awal"
                    expanded
                  ></b-input>
                </b-field>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Sumber Dana"
              >
                <AprSelect
                  v-model="form.sourceOfFund"
                  :errors="errors"
                  :items="sourceOfFunds"
                  :disabled="isBusy"
                  name="source_of_fund"
                  id="SelectSourceOfFund"
                  label="Sumber Dana"
                  placeholder="Pilih Sumber Dana"
                  fullWidth
                ></AprSelect>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Jenis Pekerjaan"
              >
                <AprSelect
                  v-model="form.workType"
                  :errors="errors"
                  :items="workTypes"
                  :disabled="isBusy"
                  name="work_type"
                  id="SelectWorkType"
                  label="Jenis Pekerjaan"
                  placeholder="Pilih Jenis Pekerjaan"
                  fullWidth
                ></AprSelect>
              </ValidationProvider>
            </div>
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Tempat Kerja"
              >
                <AprTextField
                  v-model="form.workName"
                  :errors="errors"
                  :disabled="isBusy"
                  name="work_name"
                  id="TxtWorkName"
                  label="Tempat Kerja"
                  placeholder="Masukkan Nama Tempat Kerja"
                ></AprTextField>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <h6 class="title is-6">Alamat Rumah</h6>
              <b-checkbox v-model="form.personalAddressSameWithIdentityAddress">
                Alamat sama dengan Alamat KTP
              </b-checkbox>
              <AddressForm
                id="PersonalAddress"
                v-model="personalAddress"
                :required="!form.personalAddressSameWithIdentityAddress"
                :disabled="personalAddressDisabled"
              ></AddressForm>
            </div>
            <div class="column">
              <h6 class="title is-6">Alamat Kantor/Tempat Kerja</h6>
              <b-checkbox v-model="form.workAddressSameWithPersonalAddress">
                Alamat sama dengan Alamat Rumah
              </b-checkbox>
              <AddressForm
                id="WorkAddress"
                v-model="workAddress"
                :required="!form.workAddressSameWithPersonalAddress"
                :disabled="workAddressDisabled"
              ></AddressForm>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <button
                :disabled="isBusy || invalid"
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
                id="BtnCancel"
                class="button is-fullwidth"
                to="/account-applications"
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

<script src="./account-application-edit.js"></script>
