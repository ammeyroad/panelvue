<template>
  <div class="BankBranchLayout">
    <div class="BankBranchLayout-header">
      <div class="level">
        <div class="level-left">
          <h1 class="title is-1">Daftar Cabang</h1>
        </div>
      </div>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <AuthBankSelector></AuthBankSelector>
          </div>
          <div class="level-item">
            <router-link
              v-if="canCreateNewBranch"
              class="button is-info"
              :to="{ name: 'BankBranchCreate' }"
            >
              Buat Cabang Baru
            </router-link>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <AprTextField
              v-model="search.filter"
              id="TxtBranchName"
              placeholder="Nama/Alamat Cabang"
            ></AprTextField>
          </div>

          <div class="level-item">
            <button class="button" @click="refreshData">Cari</button>
          </div>
        </div>
      </nav>
    </div>

    <div class="BankBranchLayout-body my-4">
      <BankBranchListTable
        @delete="handleDeleteBranch"
        :value="data"
        :editable="canEditBranch"
        :loading="isBusy"
      ></BankBranchListTable>
    </div>

    <div class="BankBranchLayout-footer">
      <AprPagination
        :meta="meta"
        @next="handlePageChanged"
        @previous="handlePageChanged"
      />
    </div>
  </div>
</template>

<script src="./bank-branch-list.js"></script>
<style lang="scss" scoped src="./bank-branch-list.scss"></style>
