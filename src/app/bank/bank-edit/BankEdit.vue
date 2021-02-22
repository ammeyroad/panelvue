<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <h1 class="title is-1">Ubah Bank</h1>

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
                name="Nama bank"
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
                rules="required"
                name="Deskripsi Singkat"
              >
                <AprTextarea
                  v-model="descriptionShort"
                  :errors="errors"
                  id="TxtDescriptionShort"
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
                rules="required"
                name="Deskripsi Panjang"
              >
                <AprTextarea
                  v-model="description"
                  :errors="errors"
                  rows="6"
                  id="TxtDescription"
                  name="description"
                  label="Deskripsi Panjang"
                  placeholder="Masukkan deskripsi panjang tentang Bank"
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
              <button
                :disabled="isBusy"
                id="BtnUpdateSubmit"
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

<script src="./bank-edit.js"></script>
