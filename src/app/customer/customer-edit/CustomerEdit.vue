<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <h1 class="title is-1">Ubah Nasabah</h1>

      <p v-if="userDetailsDisabled">
        Karena nasabah terhubung dengan pengguna yang sudah ada, sebagian besar
        perubahan data hanya bisa dilakukan oleh Admin.
      </p>

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
                name="Nama Depan dan Nama Tengah"
              >
                <AprTextField
                  @input="$set(form, 'firstMiddleName', $event.toUpperCase())"
                  :value="form.firstMiddleName"
                  :errors="errors"
                  :disabled="isBusy || userDetailsDisabled"
                  :required="!userDetailsDisabled"
                  id="TxtFirstMiddleName"
                  label="Nama Depan dan Nama Tengah"
                  placeholder="Nama Depan dan Nama Tengah"
                ></AprTextField>
              </ValidationProvider>
            </div>
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Nama Belakang"
              >
                <AprTextField
                  @input="$set(form, 'lastName', $event.toUpperCase())"
                  :value="form.lastName"
                  :errors="errors"
                  :disabled="isBusy || userDetailsDisabled"
                  :required="!userDetailsDisabled"
                  id="TxtLastName"
                  label="Nama Belakang"
                  placeholder="Nama Belakang"
                ></AprTextField>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column is-one-quarter">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Jenis Identitas"
              >
                <AprSelect
                  v-model="form.identityType"
                  :errors="errors"
                  :items="identityTypes"
                  :disabled="isBusy"
                  id="SelectIdentityType"
                  label="Jenis Identitas"
                  withoutAll
                  fullWidth
                  required
                ></AprSelect>
              </ValidationProvider>
            </div>

            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="No. Identitas"
              >
                <AprTextField
                  v-model="form.identityNo"
                  :errors="errors"
                  :disabled="isBusy || userDetailsDisabled"
                  :required="!userDetailsDisabled"
                  id="TxtIdentityNo"
                  label="No. Identitas"
                  placeholder="Masukkan No. Identitas"
                ></AprTextField>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column is-one-quarter">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Jenis Kelamin"
              >
                <AprSelect
                  v-model="form.gender"
                  :errors="errors"
                  :items="genders"
                  :disabled="isBusy || userDetailsDisabled"
                  :required="!userDetailsDisabled"
                  id="SelectGender"
                  label="Jenis Kelamin"
                  withoutAll
                  fullWidth
                ></AprSelect>
              </ValidationProvider>
            </div>

            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Tanggal Lahir"
              >
                <AprDateField
                  v-model="form.dateOfBirth"
                  :errors="errors"
                  :disabled="isBusy || userDetailsDisabled"
                  :required="!userDetailsDisabled"
                  :max="maxDateOfBirth"
                  label="Tanggal Lahir"
                  placeholder="Tanggal Lahir"
                  id="date_of_birth"
                ></AprDateField>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="No. Telp. 1"
              >
                <AprTextField
                  v-model="form.phoneNo1"
                  :errors="errors"
                  :disabled="isBusy || userDetailsDisabled"
                  :required="!userDetailsDisabled"
                  id="TxtPhoneNo1"
                  label="No. Telp. 1"
                  placeholder="Masukkan No. Telp. 1"
                ></AprTextField>
              </ValidationProvider>
            </div>
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules=""
                name="No. Telp. 2"
              >
                <AprTextField
                  v-model="form.phoneNo2"
                  :errors="errors"
                  :disabled="isBusy || userDetailsDisabled"
                  id="TxtPhoneNo2"
                  label="No. Telp. 2"
                  placeholder="Masukkan No. Telp. 2"
                ></AprTextField>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider v-slot="{ errors }" rules="" name="Email">
                <AprTextField
                  v-model="form.email"
                  :errors="errors"
                  :disabled="isBusy || userDetailsDisabled"
                  id="TxtEmail"
                  label="Email"
                ></AprTextField>
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
                  id="SelectWorkType"
                  label="Jenis Pekerjaan"
                  withoutAll
                  fullWidth
                ></AprSelect>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <h6 class="title is-6">Alamat Rumah</h6>
              <AddressForm
                id="PersonalAddress"
                v-model="personalAddress"
                :disabled="isBusy || userDetailsDisabled"
                :required="!userDetailsDisabled"
              ></AddressForm>
            </div>
            <div class="column">
              <h6 class="title is-6">Alamat Kantor/Tempat Kerja</h6>
              <AddressForm
                id="WorkAddress"
                v-model="workAddress"
                :disabled="isBusy || userDetailsDisabled"
                :required="!userDetailsDisabled"
              ></AddressForm>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <b-button
                :disabled="isBusy || !valid"
                id="BtnSubmit"
                type="is-info"
                native-type="submit"
                expanded
              >
                Simpan
              </b-button>
            </div>

            <div class="column">
              <router-link
                :disabled="isBusy"
                id="BtnCancel"
                class="button is-fullwidth"
                to="/customers"
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

<script src="./customer-edit.js"></script>
