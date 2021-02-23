<template>
  <div class="AccountTypeLayout">
    <div class="AccountTypeLayout-header">
      <div class="level">
        <div class="level-left">
          <h1 class="title is-1">Daftar Produk Simpanan</h1>
        </div>
      </div>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <BankSelector
              @input="handleBankChanged"
              :banks="banks"
              :value="selectedBank"
            ></BankSelector>
          </div>
          <div class="level-item">
            <router-link
              v-if="canCreateNewAccountType"
              class="button is-info"
              :to="{ name: 'BankAccountTypeCreate' }"
            >
              Tambah Data
            </router-link>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <AprTextField
              v-model="search.name"
              id="TxtProductName"
              placeholder="Masukkan nama produk"
            ></AprTextField>
          </div>

          <div class="level-item">
            <AprSelect
              v-model="search.product"
              :items="productTypes"
              id="DrpProductType"
              placeholder="Pilih Produk"
            />
          </div>
          <div v-if="canViewAllAccountTypes" class="level-item">
            <b-checkbox v-model="search.includeInactive">
              Tampilkan yang Tidak Tersedia
            </b-checkbox>
          </div>

          <div class="level-item">
            <button class="button" @click="refreshData">Cari</button>
          </div>
        </div>
      </nav>
    </div>

    <div class="AccountTypeLayout-body">
      <AprTable>
        <template #header>
          <tr>
            <th class="has-text-left">Jenis Produk</th>
            <th class="has-text-left">Nama Produk</th>
            <th class="has-text-left">Deskripsi</th>
            <th>Tersedia</th>
            <th>Dibuat Pada</th>
            <th>Perubahan Terakhir</th>
            <th>Aksi</th>
          </tr>
        </template>

        <template #body>
          <tr v-for="accountType in data" :key="accountType.id">
            <td class="has-text-left">{{ accountType.class }}</td>
            <td class="has-text-left">{{ accountType.name }}</td>
            <td class="has-text-left">{{ accountType.description }}</td>
            <td>{{ accountType.available | yesNo }}</td>
            <td>{{ accountType.created_at | dateTime }}</td>
            <td>{{ accountType.updated_at | dateTime }}</td>
            <td>
              <div class="buttons is-centered">
                <router-link
                  v-if="canEditAccountType(accountType.bank_id)"
                  :to="{
                    name: 'BankAccountTypeEdit',
                    params: {
                      bank_id: accountType.bank_id,
                      id: accountType.id,
                    },
                  }"
                  class="button is-primary"
                >
                  Ubah
                </router-link>
                <button
                  v-if="canEditAccountType(accountType.bank_id)"
                  @click="confirmSwitchAvailability(accountType)"
                  :class="
                    accountType.available | switchAvailiabilityButtonClass
                  "
                >
                  {{ accountType.available | switchAvailabilityActionLabel }}
                </button>
              </div>
            </td>
          </tr>
        </template>
      </AprTable>
    </div>

    <div class="AccountTypeLayout-footer">
      <AprPagination
        :meta="meta"
        @next="handlePrevious($event)"
        @previous="handleNext($event)"
      />
    </div>
  </div>
</template>

<script src="./account-type-list.js"></script>
<style lang="scss" scoped src="./account-type-list.scss"></style>
