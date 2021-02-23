<template>
  <div>
    <sidebar />

    <main class="main"><br>
      <header class="is-clearfix">
        <div class="cats is-pulled-right has-text-right">
          <br />
          <div class="buttons">
            <b-button
              tag="router-link"
              icon-left="plus"
              to="/tambahpelatihan"
              type="is-link"
            >
              ide Bisnis
            </b-button>
            <b-button
              tag="router-link"
              icon-left="plus"
              to="/tambahpelatihan"
              type="is-danger"
            >
              Pelatihan
            </b-button>
            <b-button
              tag="router-link"
              icon-left="plus"
              to="/tambahpelatihan"
              type="is-success"
            >
              Blog
            </b-button>
          </div>
        </div>
        <div>
          <h2
            style="
              font-size: 24px;
              font-weight: 600;
              padding-bottom: 0.5rem;
              color: #234bda;
            "
          >
            DASHBOARD
          </h2>
          <small>Selamat Datang Kembali di Aplikasi Kami</small>
        </div>
        <hr
          style="
            height: 1px;
            border-width: 0;
            color: grey;
            background-color: grey;
          "
        />
      </header>
      <div class="columns">
        <div class="column is-12">
          <div class="box" style="padding: 0px; border-radius: 10px">
            <div
              class="level has-background-light"
              style="padding: 10px 20px; border-radius: 10px 10px 0px 0px"
            >
              <div>
                <p class="subtitle has-text-link"><b>Ide Bisnis Terbaru</b></p>
              </div>
              <div class="buttons">
                <b-button
                  tag="router-link"
                  icon-left="eye"
                  to="/ap"
                  type="is-link"
                  outlined
                >
                  Lihat Semua
                </b-button>
                <b-button
                  tag="router-link"
                  icon-left="plus"
                  to="/tambahpelatihan"
                  type="is-link"
                ></b-button>
              </div>
            </div>

            <b-table
              style="padding: 10px"
              :data="data"
              :paginated="isPaginated"
              :per-page="perPage"
              :current-page.sync="currentPage"
              :pagination-simple="isPaginationSimple"
              :pagination-position="paginationPosition"
              default-sort-direction="defaultSortDirection"
              :pagination-rounded="isPaginationRounded"
              sort-icon="chevron-up"
              sort-icon-size="is-small"
              default-sort="id_ide"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
            >
              
              <b-table-column
                field="id_ide"
                label="ID"
                sortable
                numeric
                v-slot="props"
              >
                {{ props.row.id_ide }}
              </b-table-column>
              <b-table-column field="body" label="Konten" >
               <b-tag type="is-link">IDE BISNIS</b-tag>
              </b-table-column>
              

              <b-table-column
                field="gambar"
                label="Gambar"
                width="40"
                v-slot="{ row }"
              >
                <figure style="width: 40px; height: 40px; border-radius: 100%">
                  <img
                    v-if="row.gambar_ide"
                    :src="row.gambar_ide"
                    :alt="row.name"
                    style="width: 40px; height: 40px; border-radius: 100%"
                  />
                  <img
                    v-else
                    :alt="row.nama_ide"
                    src="https://bulma.io/images/placeholders/128x128.png"
                  />
                </figure>
              </b-table-column>

              <b-table-column field="nama_ide" label="Judul" sortable v-slot="props">
                 <div class="a">
                  {{ props.row.nama_ide }}
                </div>
              </b-table-column>

              <b-table-column field="body" label="Deskripsi" v-slot="props">
                 <div class="b">
                  {{ props.row.deskripsi_ide }}
                </div>
              </b-table-column>

              <b-table-column
                field="kategori_ide"
                label="Kategori"
                
                centered
                sortable
                v-slot="props"
              >
                <b-tag type="is-primary">{{ props.row.kategori_ide }}</b-tag>
              </b-table-column>

              <b-table-column field="jenis_ide" label="Promo" sortable centered v-slot="props"  >
                <b-tag type="is-link">{{ props.row.jenis_ide }}</b-tag>
              </b-table-column>
    
              <b-table-column field="body" sortable label="Modal" v-slot="props">
                  {{ props.row.modal_ide }}
              </b-table-column>
              <b-table-column field="body" label="User" v-slot="props">
                
                  {{ props.row.id_user_upload_ide }}
                
              </b-table-column>
              <b-table-column field="body" label="Tanggal Upload" v-slot="props">
                {{ props.row.tanggal_listing_ide }}
              </b-table-column>
              <b-table-column field="body" label="Tanggal Update" v-slot="props">
                {{ props.row.tanggal_update_ide }}
              </b-table-column>
            </b-table>
          </div>
        </div>
      </div><br>
      <div class="columns">
        <div class="column is-6">
          <div class="box" style="padding: 0px; border-radius: 10px">
            <div
              class="level has-background-danger-light	"
              style="padding: 10px 20px; border-radius: 10px 10px 0px 0px"
            >
              <div>
                <p class="subtitle has-text-danger"><b>Pelatihan Terbaru</b></p>
              </div>
              <div class="buttons">
                <b-button
                  tag="router-link"
                  icon-left="eye"
                  to="/ap"
                  type="is-danger"
                  outlined
                >
                  Lihat Semua
                </b-button>
                <b-button
                  tag="router-link"
                  icon-left="plus"
                  to="/tambahpelatihan"
                  type="is-danger"
                ></b-button>
              </div>
            </div>

            <b-table
              style="padding: 10px"
              :data="data"
              :paginated="isPaginated"
              :per-page="perPage"
              :current-page.sync="currentPage"
              :pagination-simple="isPaginationSimple"
              :pagination-position="paginationPosition"
              :default-sort-direction="defaultSortDirection"
              :pagination-rounded="isPaginationRounded"
              sort-icon="chevron-up"
              sort-icon-size="is-small"
              default-sort="nama_ide"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
            >
              
            
              <b-table-column field="body" label="Konten" >
               <b-tag type="is-danger">PELATIHAN</b-tag>
              </b-table-column>
              

              <b-table-column
                field="gambar"
                label="Gambar"
                width="40"
                v-slot="{ row }"
              >
                <figure style="width: 40px; height: 40px; border-radius: 100%">
                  <img
                    v-if="row.gambar_ide"
                    :src="row.gambar_ide"
                    :alt="row.name"
                    style="width: 40px; height: 40px; border-radius: 100%"
                  />
                  <img
                    v-else
                    :alt="row.nama_ide"
                    src="https://bulma.io/images/placeholders/128x128.png"
                  />
                </figure>
              </b-table-column>

              <b-table-column field="nama_ide" label="Judul" v-slot="props">
                 <div class="a">
                  {{ props.row.nama_ide }}
                </div>
              </b-table-column>

              <b-table-column
                field="date"
                label="Kategori"
                centered
                v-slot="props"
              >
                <b-tag type="is-primary">{{ props.row.kategori_ide }}</b-tag>
              </b-table-column>

              <b-table-column label="Promo" centered v-slot="props" width="140">
                <b-tag type="is-link">{{ props.row.jenis_ide }}</b-tag>
              </b-table-column>
    
              <b-table-column field="body" label="Tanggal" v-slot="props">
                {{ props.row.tanggal_listing_ide }}
              </b-table-column>
             
            </b-table>
          </div>
        </div>
        <div class="column is-6">
           <div class="box" style="padding: 0px; border-radius: 10px">
            <div
              class="level has-background-success-light	"
              style="padding: 10px 20px; border-radius: 10px 10px 0px 0px"
            >
              <div>
                <p class="subtitle has-text-success"><b>Pelatihan Terbaru</b></p>
              </div>
              <div class="buttons">
                <b-button
                  tag="router-link"
                  icon-left="eye"
                  to="/ap"
                  type="is-success"
                  outlined
                >
                  Lihat Semua
                </b-button>
                <b-button
                  tag="router-link"
                  icon-left="plus"
                  to="/tambahpelatihan"
                  type="is-success"
                ></b-button>
              </div>
            </div>

            <b-table
              style="padding: 10px"
              :data="data"
              :paginated="isPaginated"
              :per-page="perPage"
              :current-page.sync="currentPage"
              :pagination-simple="isPaginationSimple"
              :pagination-position="paginationPosition"
              :default-sort-direction="defaultSortDirection"
              :pagination-rounded="isPaginationRounded"
              sort-icon="chevron-up"
              sort-icon-size="is-small"
              default-sort="user.first_name"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
            >
              
            
              <b-table-column field="body" label="Konten" >
               <b-tag type="is-success">PELATIHAN</b-tag>
              </b-table-column>
              

              <b-table-column
                field="gambar"
                label="Gambar"
                width="40"
                v-slot="{ row }"
              >
                <figure style="width: 40px; height: 40px; border-radius: 100%">
                  <img
                    v-if="row.gambar_ide"
                    :src="row.gambar_ide"
                    :alt="row.name"
                    style="width: 40px; height: 40px; border-radius: 100%"
                  />
                  <img
                    v-else
                    :alt="row.nama_ide"
                    src="https://bulma.io/images/placeholders/128x128.png"
                  />
                </figure>
              </b-table-column>

              <b-table-column field="nama_ide" label="Judul" v-slot="props">
                 <div class="a">
                  {{ props.row.nama_ide }}
                </div>
              </b-table-column>

              <b-table-column
                field="date"
                label="Kategori"
                centered
                v-slot="props"
              >
                <b-tag type="is-primary">{{ props.row.kategori_ide }}</b-tag>
              </b-table-column>

              <b-table-column label="Promo" centered v-slot="props" width="140">
                <b-tag type="is-link">{{ props.row.jenis_ide }}</b-tag>
              </b-table-column>
    
              <b-table-column field="body" label="Tanggal" v-slot="props">
                {{ props.row.tanggal_listing_ide }}
              </b-table-column>
             
            </b-table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script>import sidebar from "@/app/home/komponen/sidebar";

export default {
  components: { sidebar },
  data() {
    const data = require("@/app/home/data/sample.json");

    return {
      data,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      currentPage: 1,
      perPage: 5,
    };
  },
};
</script>

<style>
div.b {
  width: 500px;
  word-wrap: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
div.a {
  width: 400px;
  word-wrap: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.sticky {
  position: -webkit-sticky;
  position: sticky;

  z-index: 2;
  top: 20;
}
</style>