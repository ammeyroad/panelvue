<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <h1 class="title is-1">Buat Pengguna Baru</h1>

      <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="observer">
        <form @submit.prevent="handleSubmit(submitForm)">
          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:3"
                name="Nama Depan dan Nama Tengah"
              >
                <AprTextField
                  v-model="form.firstMiddleName"
                  :errors="errors"
                  :disabled="isBusy"
                  id="TxtFirstMiddleName"
                  label="Nama Depan dan Nama Tengah"
                  placeholder="Nama Depan dan Nama Tengah"
                  required
                ></AprTextField>
              </ValidationProvider>
            </div>
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:3"
                name="Nama Belakang"
              >
                <AprTextField
                  v-model="form.lastName"
                  :errors="errors"
                  :disabled="isBusy"
                  id="TxtLastName"
                  label="Nama Belakang"
                  placeholder="Nama Belakang"
                  required
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
                  :disabled="isBusy"
                  id="SelectGender"
                  label="Jenis Kelamin"
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
                name="Tanggal Lahir"
              >
                <AprDateField
                  v-model="form.dateOfBirth"
                  :errors="errors"
                  :disabled="isBusy"
                  :max="maxDateOfBirth"
                  label="Tanggal Lahir"
                  placeholder="Tanggal Lahir"
                  id="date_of_birth"
                  required
                ></AprDateField>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Jenis Pengguna"
              >
                <AprSelect
                  v-model="form.defaultRole"
                  :errors="errors"
                  :items="defaultRoles"
                  :disabled="isBusy"
                  id="SelectDefaultRole"
                  label="Jenis Pengguna"
                  placeholder="Pilih Jenis Pengguna"
                  fullWidth
                  required
                ></AprSelect>
              </ValidationProvider>
            </div>
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                :rules="passwordRules"
                name="Password"
              >
                <b-field
                  :type="errors.length > 0 ? 'is-danger' : null"
                  :message="errors.length > 0 ? errors[0] : null"
                >
                  <template #label>
                    Password
                    <RequiredLabel v-if="!form.passwordAuto" />
                  </template>
                  <b-input
                    v-model="form.password"
                    :disabled="form.passwordAuto"
                    type="password"
                    password-reveal
                  ></b-input>
                  <b-checkbox v-model="form.passwordAuto">
                    Buat Otomatis
                  </b-checkbox>
                </b-field>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                :debounce="2000"
                :rules="phoneNoRules"
                name="No. Telp."
              >
                <AprTextField
                  v-model="form.phoneNo"
                  :errors="errors"
                  :disabled="isBusy"
                  id="TxtPhoneNo"
                  label="No. Telp."
                  placeholder="Masukkan No. Telp."
                  required
                ></AprTextField>
              </ValidationProvider>
            </div>
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                :debounce="2000"
                :rules="emailRules"
                name="Email"
              >
                <AprTextField
                  v-model="form.email"
                  :errors="errors"
                  :disabled="isBusy"
                  id="TxtEmail"
                  label="Email"
                ></AprTextField>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column is-one-quarter">
              <b-checkbox v-model="form.authVerify">
                Buat Metode Otentikasi (No. Telp., Email) Terverifikasi secara
                otomatis
              </b-checkbox>
            </div>
            <div class="column">
              <AprUploadFile
                v-model="form.profilePicture"
                maxSize="1024"
                :file-types="['image/jpg', 'image/jpeg', 'image/png']"
                ref="profilePicture"
                id="FlProfilePicture"
                name="profile_picture"
                label="Foto Profil"
              ></AprUploadFile>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <b-button
                :disabled="invalid"
                :loading="isBusy"
                id="BtnSubmit"
                type="is-primary"
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
                to="/users"
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

<script src="./user-create.js"></script>
