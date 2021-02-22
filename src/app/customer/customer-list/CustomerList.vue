<template>
  <div class="CustomerLayout">
    <div class="CustomerLayout-header">
      <div class="level">
        <div class="level-left">
          <h1 class="title">Daftar Nasabah</h1>
        </div>
      </div>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <AuthBankSelector></AuthBankSelector>
          </div>
          <div class="level-item">
            <router-link
              v-if="canCreateNewCustomer"
              class="button is-info"
              to="/customers/create"
            >
              Buat Nasabah Baru
            </router-link>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <AprTextField
              v-model="search.filter"
              id="TxtCustomerName"
              placeholder="Nama Nasabah"
            ></AprTextField>
          </div>

          <div class="level-item">
            <button class="button" @click="refreshData">Cari</button>
          </div>
        </div>
      </nav>
    </div>

    <div class="CustomerLayout-body my-4">
      <CustomerListTable
        :value="data"
        :editable="canEditCustomer"
        :loading="isBusy"
      ></CustomerListTable>
    </div>

    <div class="CustomerLayout-footer">
      <AprPagination
        :meta="meta"
        @next="handlePageChanged"
        @previous="handlePageChanged"
      />
    </div>
  </div>
</template>

<script src="./customer-list.js"></script>
<style lang="scss" scoped src="./customer-list.scss"></style>
