<template>
  <div class="BankLayout">
    <div class="is-clearfix">
      <div class="cats is-pulled-right has-text-right">
        <small>
          <br />
          <span class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li><a href="#">Bulma</a></li>
              <li><a href="#">Components</a></li>
              <li class="is-active">
                <a href="#" aria-current="page">Breadcrumb</a>
              </li>
            </ul>
          </span>
        </small>
      </div>
      <div>
        <h2>Daftar Bank</h2>
        <small>Deskripsi Singkat Halamananya</small>
      </div>
      <hr />
    </div>

    <div
      class="card"
      style="
        border-radius: 15px;
        border: 0px;
        border-color: blue;
        padding: 5px;
      "
    >
      <div class="tile is-child box has-background-link">
        <b-field position="is-right">
          <b-input
            v-model="search"
            :id="'TxtSearchBankName'"
            placeholder="Cari nama bank..."
            icon="magnify"
          ></b-input>
          <p class="control">
            <b-button @click="handleSearchData" label="CARI" type="is-info" />
          </p>
        </b-field>
      </div>

      <b-table
        :loading="isBusy"
        :data="tableData"
        table
        is-hoverable
        class="m-2"
        style="padding: 30px"
      >
        <b-table-column field="logo_url" label="Logo" v-slot="{ row }">
          <figure class="image is-128x128">
            <img v-if="row.logo_url" :src="row.logo_url" :alt="row.name" />
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

        <b-table-column field="branches_count" label="Cabang" v-slot="{ row }">
          {{ row.branches_count }}
        </b-table-column>

        <b-table-column
          field="whatsapp_no"
          label="WhatsApp"
          icon="pencil"
          v-slot="{ row }"
        >
          {{ row.whatsapp_no }}
        </b-table-column>

        <b-table-column field="updated_at" label="Perubahan" v-slot="{ row }">
          {{ dateTimeLabel(row.updated_at) }}
        </b-table-column>

        <b-table-column field="actions" label="Aksi" v-slot="{ row }">
          <router-link
            :to="{
              name: 'BankDetails',
              params: { id: row.id },
            }"
          >
            <div class="button is-link">
              <b-icon class="media-left" icon="view-list"></b-icon>
            </div>
          </router-link>
          <div v-if="canEditBank(row)" has-link>
            <router-link
              :to="{
                name: 'BankEdit',
                params: { id: row.id },
              }"
            >
              <div class="button is-warning">
                <b-icon class="media-left" icon="pencil"></b-icon>
              </div>
            </router-link>
          </div>
        </b-table-column>

        <template #empty>
          <span>Tidak ada data!</span>
        </template>
      </b-table>

      <div class="tile is-child box transparent">
        <AprPagination
          :meta="meta"
          @next="handlePageChanged($event)"
          @previous="handlePageChanged($event)"
        />
      </div>
    </div>
  </div>
</template>

<script src="./bank-list.js"></script>

<style lang="scss" scoped src="C:\Users\Admin\Desktop\APR\DEKSTOP\fase satu\apr-frontend-master\src\shared\layouts\apr-base-layout\mainbase.scss"></style>
