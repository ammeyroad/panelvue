<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <ValidationObserver v-slot="{ handleSubmit, valid }" ref="observer">
        <form @submit.prevent="handleSubmit(handleFormSubmit)">
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
                ></AprSelect>
              </ValidationProvider>
            </div>

            <div class="column">
              <div class="field">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="Jenis Produk"
                >
                  <AprSelect
                    v-model="form.class"
                    :errors="errors"
                    :items="classes"
                    :disabled="isBusy"
                    id="SelectClass"
                    label="Jenis Produk"
                    withoutAll
                    fullWidth
                  ></AprSelect>
                </ValidationProvider>
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
                :to="{
                  name: 'BankAccountTypeList',
                  query: { bank: form.bank },
                }"
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

<script src="./account-type-create.js"></script>
