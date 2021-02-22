<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <h1 class="title is-1">Buat Cabang Baru</h1>

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
                name="Nama"
              >
                <AprTextField
                  @input="handleNameInput($event, validate)"
                  :value="form.name"
                  :errors="errors"
                  :disabled="isBusy"
                  id="TxtName"
                  label="Nama Cabang"
                  placeholder="Nama Cabang"
                  required
                ></AprTextField>
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
                  :disabled="isBusy"
                  id="TxtPhoneNo1"
                  label="No. Telp. 1"
                  placeholder="Masukkan No. Telp. 1"
                  required
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
                  :disabled="isBusy"
                  id="TxtPhoneNo2"
                  label="No. Telp. 2"
                  placeholder="Masukkan No. Telp. 2"
                ></AprTextField>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Alamat"
              >
                <AprTextarea
                  v-model="form.address"
                  :errors="errors"
                  rows="6"
                  id="TxtAddress"
                  name="address"
                  label="Alamat"
                  placeholder="Alamat"
                ></AprTextarea>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="max_value:90|min_value:-90"
                name="AddressLatitude"
              >
                <AprTextField
                  v-model="form.addressLat"
                  :errors="errors"
                  id="TxtLatitude"
                  name="address_lat"
                  label="Alamat (Garis Lintang)"
                  placeholder="Garis Lintang (Latitude)"
                ></AprTextField>
              </ValidationProvider>
            </div>

            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="max_value:180|min_value:-180"
                name="AddressLongitude"
              >
                <AprTextField
                  v-model="form.addressLng"
                  :errors="errors"
                  id="TxtLongitude"
                  name="address_lng"
                  label="Alamat (Garis Bujur)"
                  placeholder="Garis Bujur (Longitude)"
                ></AprTextField>
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
                :to="{ name: 'BankBranchList', query: { bank: form.bank } }"
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

<script src="./bank-branch-create.js"></script>
