<template>
  <div class="columns is-multiline">
    <div class="column is-8 is-offset-2">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <router-link class="button" to="/users">
              Kembali
            </router-link>
          </div>
        </div>
      </nav>

      <h1 class="title is-1">Ubah Pengguna</h1>
    </div>

    <div class="column is-8 is-offset-2">
      <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="observer">
        <form @submit.prevent="handleSubmit(submitUserForm)">
          <div class="columns">
            <div class="column">
              <h3 class="subtitle is-3">
                Nama, Jenis Pengguna, Keaktifan
              </h3>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors, validate }"
                rules="required"
                name="Nama Depan dan Nama Tengah"
              >
                <AprTextField
                  @input="
                    handleInput(
                      'firstMiddleName',
                      validate,
                      $event.toUpperCase(),
                    )
                  "
                  :value="form.firstMiddleName"
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
                v-slot="{ errors, validate }"
                rules="required"
                name="Nama Belakang"
              >
                <AprTextField
                  @input="
                    handleInput('lastName', validate, $event.toUpperCase())
                  "
                  :value="form.lastName"
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
                name="Aktif"
              >
                <AprSelect
                  v-model="form.isActive"
                  :errors="errors"
                  :items="yesNoOptions"
                  :disabled="isBusy"
                  id="SelectIsActive"
                  label="Aktif"
                  withoutAll
                  fullWidth
                  required
                ></AprSelect>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column is-half">
              <b-button
                :disabled="invalid"
                :loading="isBusy"
                id="BtnSubmit"
                native-type="submit"
                type="is-primary"
              >
                Simpan
              </b-button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>

    <div class="column is-8 is-offset-2">
      <hr class="my-4" />
    </div>

    <div class="column is-8 is-offset-2">
      <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="observer">
        <form @submit.prevent="handleSubmit(submitUserDetailsForm)">
          <div class="columns">
            <div class="column">
              <h3 class="subtitle is-3">
                Detail Pengguna
              </h3>
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
                  v-model="detailsForm.gender"
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
                name="No. Identitas"
              >
                <AprTextField
                  v-model="detailsForm.identityNo"
                  :errors="errors"
                  :disabled="isBusy"
                  id="TxtIdentityNo"
                  label="No. Identitas"
                  placeholder="No. KTP"
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
                name="Tanggal Lahir"
              >
                <AprDateField
                  v-model="detailsForm.dateOfBirth"
                  :errors="errors"
                  :disabled="isBusy"
                  :max="new Date()"
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
              <h6 class="title is-6">Alamat Rumah</h6>
              <AddressForm
                id="PersonalAddress"
                v-model="personalAddress"
                :disabled="isBusy"
              ></AddressForm>
            </div>
            <div class="column">
              <h6 class="title is-6">Alamat Kantor/Tempat Kerja</h6>
              <AddressForm
                id="WorkAddress"
                v-model="workAddress"
                :disabled="isBusy"
              ></AddressForm>
            </div>
          </div>

          <div class="columns">
            <div class="column is-half">
              <b-button
                :disabled="invalid"
                :loading="isBusy"
                id="BtnSubmit"
                native-type="submit"
                type="is-primary"
              >
                Simpan
              </b-button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script src="./user-edit.js"></script>
