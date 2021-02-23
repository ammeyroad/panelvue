<template>
  <div class="BankLayout">
    <div class="BankLayout-header">
      <nav class="level">
        <div class="level">
          <div class="level-left">
            <h1 class="title is-1">Daftar Bank</h1>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <AprTextField
              v-model="search"
              :id="'TxtSearchBankName'"
              placeholder="Cari nama bank..."
            ></AprTextField>
          </div>
          <div class="level-item">
            <button @click="handleSearchData" class="button">Cari</button>
          </div>
          <div v-if="canCreateBank" class="level-item">
            <router-link class="button is-info" :to="{ name: 'BankCreate' }">
              Tambah Data
            </router-link>
          </div>
        </div>
      </nav>
    </div>

    <div class="BankLayout-body">
      <b-table :loading="isBusy" :data="tableData">
        <b-table-column field="logo_url" label="Logo" v-slot="{ row }">
          <figure class="image center-logo is-128x128">
            <img
              v-if="row.logo_url"
              :src="row.logo_url"
              :alt="row.name"
              class="is-rounded"
              width="128"
              height="128"
            />
            <img
              v-else
              :alt="row.name"
              class="is-rounded"
              src="https://bulma.io/images/placeholders/128x128.png"
            />
          </figure>
        </b-table-column>

        <b-table-column field="name" label="Nama" v-slot="{ row }">
          {{ row.name }}
        </b-table-column>

        <b-table-column field="description" label="Deskripsi" v-slot="{ row }">
          {{ row.description }}
        </b-table-column>

        <b-table-column
          field="branches_count"
          label="Jumlah Cabang"
          v-slot="{ row }"
        >
          {{ row.branches_count }}
        </b-table-column>

        <b-table-column
          field="whatsapp_no"
          label="No. WhatsApp"
          v-slot="{ row }"
        >
          {{ row.whatsapp_no }}
        </b-table-column>

        <b-table-column
          field="updated_at"
          label="Perubahan Terakhir"
          v-slot="{ row }"
        >
          {{ dateTimeLabel(row.updated_at) }}
        </b-table-column>

        <b-table-column field="actions" label="Aksi" v-slot="{ row }">
          <b-dropdown position="is-bottom-left" aria-role="list">
            <button
              class="button is-primary"
              slot="trigger"
              slot-scope="{ active }"
            >
              <span>Aksi</span>
              <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
            </button>

            <b-dropdown-item has-link>
              <router-link
                :to="{
                  name: 'BankDetails',
                  params: { id: row.id },
                }"
              >
                <div class="media">
                  <b-icon class="media-left" icon="view-list"></b-icon>
                  <div class="media-content">Detail</div>
                </div>
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item v-if="canEditBank(row)" has-link>
              <router-link
                :to="{
                  name: 'BankEdit',
                  params: { id: row.id },
                }"
              >
                <div class="media">
                  <b-icon class="media-left" icon="pencil"></b-icon>
                  <div class="media-content">Ubah</div>
                </div>
              </router-link>
            </b-dropdown-item>
          </b-dropdown>
        </b-table-column>

        <template #empty>
          <span>Tidak ada data!</span>
        </template>
      </b-table>
    </div>

    <div class="Body-footer">
      <AprPagination
        :meta="meta"
        @next="handlePageChanged($event)"
        @previous="handlePageChanged($event)"
      />
    </div>
  </div>
</template>

<script src="./bank-list.js"></script>
<style lang="scss" scoped src="./bank-list.scss"></style>
