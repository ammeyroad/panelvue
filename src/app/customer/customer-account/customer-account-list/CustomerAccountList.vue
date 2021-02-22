<template>
  <div class="CustomerAccountLayout">
    <div class="CustomerAccountLayout-header">
      <div class="level">
        <div class="level-left">
          <h1 class="title is-1">Daftar Rekening Nasabah</h1>
        </div>
      </div>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <AuthBankSelector></AuthBankSelector>
          </div>
          <div class="level-item">
            <router-link
              v-if="canCreateNewCustomerAccount"
              class="button is-info"
              :to="{ name: 'CustomerAccountCreate' }"
            >
              Buat Rekening Nasabah Baru
            </router-link>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <AprTextField
              v-model="search.filter"
              id="TxtBranchName"
              placeholder="Nama Nasabah"
            ></AprTextField>
          </div>

          <div class="level-item">
            <button class="button" @click="refreshData">Cari</button>
          </div>
        </div>
      </nav>
    </div>

    <div class="CustomerAccountLayout-body my-4">
      <CustomerAccountListTable
        :value="data"
        :editable="canEditCustomerAccount"
        :loading="isBusy"
      ></CustomerAccountListTable>
    </div>

    <div class="CustomerAccountLayout-footer">
      <AprPagination
        :meta="meta"
        @next="handlePageChanged"
        @previous="handlePageChanged"
      />
    </div>
  </div>
</template>

<script src="./customer-account-list.js"></script>
<style lang="scss" scoped src="./customer-account-list.scss"></style>
