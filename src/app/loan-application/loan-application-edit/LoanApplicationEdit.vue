<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <h1 class="title is-1">Buat Pengajuan Pinjaman Baru</h1>

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
                name="Tujuan Pinjaman"
              >
                <AprSelect
                  v-model="form.loanPurpose"
                  :errors="errors"
                  :items="loanPurposes"
                  :disabled="isBusy"
                  name="loan_purpose"
                  id="SelectLoanPurpose"
                  label="Tujuan Pinjaman"
                  placeholder="Pilih Tujuan Pinjaman"
                  fullWidth
                  required
                ></AprSelect>
              </ValidationProvider>
            </div>

            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Jumlah Pinjaman"
              >
                <b-field
                  :type="errors.length > 0 ? 'is-danger' : null"
                  :message="errors.length > 0 ? errors[0] : null"
                >
                  <template slot="label">
                    Jumlah Pinjaman
                    <RequiredLabel />
                  </template>
                  <p class="control">
                    <span class="button is-static">Rp</span>
                  </p>
                  <b-input
                    ref="loanAmount"
                    v-cleave="numeralMask"
                    @input.native="onLoanAmountInput"
                    :value="form.loanAmountFormatted"
                    :disabled="isBusy"
                    name="loan_amount"
                    placeholder="Jumlah Pinjaman"
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
                name="Sumber Pendapatan"
              >
                <AprSelect
                  v-model="form.sourceOfIncome"
                  :errors="errors"
                  :items="sourceOfIncomes"
                  :disabled="isBusy"
                  name="source_of_income"
                  id="SelectSourceOfIncome"
                  label="Sumber Dana"
                  placeholder="Pilih Sumber Pendapatan"
                  fullWidth
                  required
                ></AprSelect>
              </ValidationProvider>
            </div>
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Jenis Agunan"
              >
                <AprSelect
                  v-model="form.guaranteeType"
                  :errors="errors"
                  :items="guaranteeTypes"
                  :disabled="isBusy"
                  name="guarantee_type"
                  id="SelectGuaranteeTypes"
                  label="Jenis Agunan"
                  placeholder="Pilih Jenis Agunan"
                  fullWidth
                  required
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
                  required
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
                to="/loan-applications"
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

<script src="./loan-application-edit.js"></script>
