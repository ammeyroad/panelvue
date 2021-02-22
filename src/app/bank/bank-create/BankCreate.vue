<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
        <form @submit.prevent="handleSubmit(submitForm)" ref="form">
          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors, validate }"
                rules="image"
                name="Logo bank"
              >
                <AprUploadFile
                  v-model="logo"
                  :errors="errors"
                  :file-types="['image/jpg', 'image/jpeg', 'image/png']"
                  @change="validate"
                  ref="logo"
                  id="FlLogo"
                  name="logo"
                  label="Logo Bank"
                ></AprUploadFile>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Nama Bank"
              >
                <AprTextField
                  v-model="name"
                  :errors="errors"
                  id="TxtBank"
                  name="name"
                  label="Nama Bank"
                  placeholder="Masukkan nama bank"
                ></AprTextField>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:3"
                name="No. Telp. 1"
              >
                <AprTextField
                  v-model="phoneNo1"
                  :errors="errors"
                  id="TxtTelephone"
                  name="phone_no1"
                  label="No. Telp. 1"
                  placeholder="Masukkan No. Telp. 1 (wajib)"
                  required
                ></AprTextField>
              </ValidationProvider>
            </div>

            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="min:3"
                name="No. Telp. 2"
              >
                <AprTextField
                  v-model="phoneNo2"
                  :errors="errors"
                  id="TxtTelephone"
                  name="phone_no2"
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
                name="Deskripsi"
              >
                <AprTextarea
                  v-model="description"
                  :errors="errors"
                  rows="6"
                  id="TxtDescription"
                  name="description"
                  label="Deskripsi"
                  placeholder="Masukkan deskripsi panjang tentang Bank"
                ></AprTextarea>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Deskripsi singkat"
              >
                <AprTextarea
                  v-model="descriptionShort"
                  :errors="errors"
                  id="TxtDescription"
                  name="description_short"
                  label="Deskripsi Singkat"
                  placeholder="Masukkan deskripsi singkat tentang Bank (< 150 karakter)"
                ></AprTextarea>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="min:3"
                name="No. Whatsapp"
              >
                <AprTextField
                  v-model="whatsappNo"
                  :errors="errors"
                  rows="6"
                  id="TxtBranchName"
                  name="whatsapp_no"
                  label="No. Whatsapp"
                  placeholder="Masukkan no. Whatsapp"
                ></AprTextField>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors, validate }"
                rules="required"
                name="Nama Cabang"
              >
                <AprTextField
                  @input="handleBranchInput($event, validate)"
                  :value="branchName"
                  :errors="errors"
                  rows="6"
                  id="TxtBranchName"
                  name="branch_name"
                  label="Nama Cabang Pertama"
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
                name="Alamat"
              >
                <AprTextarea
                  v-model="address"
                  :errors="errors"
                  rows="6"
                  id="TxtAddress"
                  name="address"
                  label="Alamat"
                  placeholder="Alamat"
                  required
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
                  v-model="addressLat"
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
                  v-model="addressLng"
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
                :disabled="isBusy"
                id="BtnCreateSubmit"
                class="button is-primary is-fullwidth"
                type="submit"
              >
                Simpan
              </button>
            </div>

            <div class="column">
              <router-link
                v-if="!isBusy"
                id="BtnCancel"
                class="button is-fullwidth"
                to="/banks"
              >
                Batal
              </router-link>
              <button v-else class="button is-fullwidth" disabled>
                Batal
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script src="./bank-create.js"></script>
