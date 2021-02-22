<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <ValidationObserver v-slot="{ handleSubmit, valid }" ref="observer">
        <form @submit.prevent="handleSubmit(handleFormSubmit)">
          <div class="columns">
            <div class="column">
              <AprSelect
                :value="bankId"
                :items="banks"
                id="SelectBank"
                label="Bank"
                withoutAll
                fullWidth
                disabled
              ></AprSelect>
            </div>

            <div class="column">
              <div class="field">
                <AprSelect
                  v-model="form.class"
                  :items="classes"
                  disabled
                  id="SelectClass"
                  label="Jenis Produk"
                  withoutAll
                  fullWidth
                ></AprSelect>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Nama"
              >
                <AprTextField
                  v-model="form.name"
                  :errors="errors"
                  :disabled="isBusy"
                  id="TxtName"
                  label="Nama"
                  placeholder="Masukkan Nama Produk"
                ></AprTextField>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules=""
                name="Deskripsi singkat"
              >
                <AprTextarea
                  v-model="form.description"
                  :errors="errors"
                  :disabled="isBusy"
                  id="TxtDescription"
                  label="Deskripsi Singkat"
                  placeholder="Masukkan Deskripsi singkat"
                ></AprTextarea>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <TabunganInterestRatesForm
                v-if="form.class === 'TABUNGAN'"
                v-model="form.interestRates"
                :disabled="isBusy"
              ></TabunganInterestRatesForm>
              <DepositoInterestRatesForm
                v-else-if="form.class === 'DEPOSITO'"
                v-model="form.interestRates"
                :disabled="isBusy"
              ></DepositoInterestRatesForm>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Tersedia"
              >
                <AprSelect
                  v-model="form.available"
                  :errors="errors"
                  :items="[
                    { text: 'Ya', value: true },
                    { text: 'Tidak', value: false },
                  ]"
                  :disabled="isBusy"
                  id="SelectAvailable"
                  label="Tersedia"
                  withoutAll
                  fullWidth
                ></AprSelect>
              </ValidationProvider>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <button
                :disabled="!valid"
                id="BtnCreateSubmit"
                class="button is-info is-fullwidth"
                type="submit"
              >
                Simpan
              </button>
            </div>

            <div class="column">
              <router-link
                id="BtnCancel"
                class="button is-fullwidth"
                to="/account-types"
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

<script src="./account-type-edit.js"></script>
