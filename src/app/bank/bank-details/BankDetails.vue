<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <div class="is-clearfix">
        <div class="cats is-pulled-right has-text-right">
          <small>
            <router-link class="button is-link is-light mr-2" to="/banks">
              kembali
            </router-link>
            <router-link class="button is-link" :to="`/banks/${id}/edit`">
              Ubah Data
            </router-link>
            <br />
          </small>
        </div>
        <div>
          <h2>Judul</h2>
          <small>Deskripsi Singkat Halamananya</small>
        </div>
        <hr />
      </div>
    </div>

    <div class="column is-3">
      <div class="tile is-child box has-background-white BankDetail-sidebar">
        <div class="has-text-centered mb-5">
          <figure>
            <img
              class=""
              :src="
                bank.logoUrl
                  ? bank.logoUrl
                  : 'https://bulma.io/images/placeholders/128x128.png'
              "
              :alt="bank.name"
            />
          </figure>
          <hr />
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

          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <h2 class="has-text-warning">329</h2>
                <p class="has-text-light">Total Visits</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <h2 class="has-text-warning">+20 %</h2>
                <p class="has-text-light">Total Page Views</p>
              </article>
            </div>
          </div>
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <h2 class="has-text-warning">329</h2>
                <p class="has-text-light">Total Visits</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box has-text-white">
                <h2 class="has-text-warning">+20 %</h2>
                <p class="has-text-light">Total Page Views</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-9">
      <div class="tile is-child box has-background-white">
         <div class="tile is-child box has-background-link has-text-white">
        <h3>DAFTAR CABANG</h3>
         </div>
        
          <BankBranchListTable
            :value="bank.branches"
            :editable="canEditBranch"
            :loading="isBusy"
            compact
          />
        
      </div>
      <hr />
      <div class="tile is-child box has-background-white">
        <div class="tile is-child box has-background-link has-text-white">
        <h3>JENIS PRODUK</h3>
         </div>
        <div class="content">
          <div
            v-for="accountType in bank.accountTypes"
            :key="accountType.id"
            class="column is-12"
          >
            
              <p>
                <b>{{ accountType.class }} - {{ accountType.name }}</b>
              </p>
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
  </div>
</template>

<script src="./bank-details.js"></script>
<style lang="scss" scoped src="./bank-details.scss"></style>
<style lang="scss" scoped src="C:\Users\Admin\Desktop\APR\DEKSTOP\fase satu\apr-frontend-master\src\shared\layouts\apr-base-layout\mainbase.scss"></style>
