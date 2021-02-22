<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <router-link class="button" to="/banks">
              Kembali
            </router-link>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <router-link class="button is-info" :to="`/banks/${id}/edit`">
              Ubah Data
            </router-link>
          </div>
        </div>
      </nav>
    </div>

    <div class="column is-3">
      <div class="box is-shadowless BankDetail-sidebar">
        <div class="has-text-centered mb-5">
          <figure class="image is-128x128 is-inline-block">
            <img
              class="is-rounded"
              :src="
                bank.logoUrl
                  ? bank.logoUrl
                  : 'https://bulma.io/images/placeholders/128x128.png'
              "
              :alt="bank.name"
            />
          </figure>
        </div>

        <div class="mb-4">
          <p class="heading">Nama</p>
          <p class="title is-size-6">{{ bank.name }}</p>
        </div>

        <div class="mb-4">
          <p class="heading">Deskripsi</p>
          <p class="title is-size-6">{{ bank.description }}</p>
        </div>

        <div class="mb-4">
          <p class="heading">Tanggal Pembuatan</p>
          <p class="title is-size-6">{{ bank.createdAt | date }}</p>
        </div>
      </div>
    </div>

    <div class="column is-9">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="card is-shadowless">
            <div class="card-header">
              <div class="card-header-title">
                Daftar Cabang
              </div>
            </div>

            <div class="card-content">
              <div class="content">
                <BankBranchListTable
                  :value="bank.branches"
                  :editable="canEditBranch"
                  :loading="isBusy"
                  compact
                />
              </div>
            </div>
          </div>
        </div>
        <div
          v-for="accountType in bank.accountTypes"
          :key="accountType.id"
          class="column is-12"
        >
          <div class="card is-shadowless">
            <div class="card-header">
              <div class="card-header-title">
                {{ accountType.class }} - {{ accountType.name }}
              </div>
            </div>

            <div class="card-content">
              <div class="content">
                <p>{{ accountType.description }}</p>
                <deposito-interest-rates
                  v-if="accountType.class === 'DEPOSITO'"
                  :interestRates="accountType.interest_rates"
                />
                <tabungan-interest-rates
                  v-else-if="accountType.class === 'TABUNGAN'"
                  :interestRates="accountType.interest_rates"
                />
                <p v-else>Tidak ada informasi bunga!</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="bank.accountTypes.length === 0" class="column is-12">
          <div class="card is-shadowless">
            <div class="card-header">
              <div class="card-header-title">
                Belum ada Produk yang terdaftar pada {{ bank.name }}!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./bank-details.js"></script>
<style lang="scss" scoped src="./bank-details.scss"></style>
