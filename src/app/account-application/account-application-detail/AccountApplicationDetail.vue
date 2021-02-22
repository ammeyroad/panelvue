<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <router-link class="button" to="/account-applications">
              Kembali
            </router-link>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <router-link
              class="button is-info"
              :to="`/account-applications/${bankId}/${id}/edit`"
            >
              Ubah Data
            </router-link>
          </div>
        </div>
      </nav>
    </div>

    <div class="column is-12">
      <h1 class="title is-2">
        Pengajuan Pembukaan Rekening
      </h1>
    </div>

    <div class="column is-3">
      <CustomerCard :customer="application.customer" />
    </div>

    <div class="column is-9">
      <AccountApplicationView :application="application" />
    </div>
  </div>
</template>

<script src="./account-application-detail.js"></script>
<style lang="scss" scoped src="./account-application-detail.scss"></style>
