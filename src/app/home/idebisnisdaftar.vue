<template>
  <div>
    <sidebar />


    <div class="main"><br>
      <div
        class="level "
        style="padding: 10px 0px; border-radius: 10px"
      >
        <div>
          <p class="subtitle has-text-link"><b>IDE BISNIS</b></p>
        </div>
        <div class="buttons">
          <b-button
            tag="router-link"
            icon-left="plus"
            to="/idebisnistambah"
            type="is-link"
            
          >
            Tambah Ide Bisnis
          </b-button>
        </div>
      </div>
      <div class="columns">
        <div class="column is-9">
          <div class="box " style="padding: 0px; border-radius: 10px">
           
            <div
              class="level has-background-link-light"
              style="padding: 10px 20px; border-radius: 10px 10px 0px 0px"
            >
              <div>
                <p class="subtitle has-text-link">Daftar Ide Bisnis</p>
              </div>

              <b-field class="is-info">
                <b-input
                  placeholder="Search..."
                  type="search"
                  icon="magnify"
                  icon-clickable
                  @icon-click="searchIconClick"
                  rounded
                ></b-input>
              </b-field>
            </div>
            <b-table
              :data="data"
              :columns="columns"
              :selected.sync="selected"
              :paginated="isPaginated"
              :per-page="perPage"
              style="padding: 15px"
            >
              <b-table-column field="id" label="ID" numeric v-slot="props">
                <small>{{ props.row.id_ide }}</small>
              </b-table-column>
              <b-table-column
                field="date"
                label="Kategori"
                v-slot="props"
                centered
              >
                <b-button
                  type="is-link"
                  size="is-small"
                  style="margin-right: 5px"
                >
                  {{ props.row.jenis_ide }}
                </b-button>
                <b-table-column field="tanggal" label="Tanggal" v-slot="props">
                  <small>{{ props.row.tanggal_listing_ide }}</small>
                </b-table-column>
                <b-button type="is-success" size="is-small">
                  {{ props.row.kategori_ide }}
                </b-button>
              </b-table-column>
              <b-table-column field="tanggal" label="Tanggal" v-slot="props">
                <small>{{ props.row.tanggal_listing_ide }}</small>
              </b-table-column>

              <b-table-column field="judul" label="Judul" v-slot="props">
                <div class="a">
                  {{ props.row.nama_ide }}
                </div>
              </b-table-column>

              <b-table-column
                field="Deskripsi"
                label="Deskripsi"
                v-slot="props"
              >
                <div class="b">
                  {{ props.row.deskripsi_ide }}
                </div>
              </b-table-column>

              <b-table-column field="modal_ide" label="Modal" v-slot="props">
                {{ props.row.modal_ide }}
              </b-table-column>

              <b-table-column field="actions" label="Aksi" centered>
                <idebisnismodal />
               
              </b-table-column>
            </b-table>
          </div>
        </div>
        <div class="column is-3">
          <div class="card" style="border-radius: 10px">
             <div
            class="card has-background-white"
            style="border-radius: 10px "
          >
            <div class="card-image">
              <figure class="image is-3by3">
                <img
                  style="border-radius: 10px 10px 0px 0px"
                  :src="
                    selected.gambar_ide
                      ? selected.gambar_ide
                      : 'https://bulma.io/images/placeholders/128x128.png'
                  "
                  :alt="selected.judul"
                />
              </figure>
            </div>
            <div class="card-content is-overlay">
              <div class="media">
                <span
                  style="
                    background-color: #234dba;
                    color: #fff;
                    display: inline-block;
                    padding: 4px 8px;
                    shadow: none;
                    border-radius: 6px;
                  "
                >
                  {{ selected.tanggal_update_ide }}
                </span>
              </div>
            </div>
          </div>
          <div class="card-content has-background-white">
            <p class="title is-4">
              {{ selected.nama_ide }}
            </p>
            <b-taglist>
              <b-tag type="is-primary">{{ selected.modal_ide }}</b-tag>
              <b-tag type="is-success">{{ selected.jenis_ide }}</b-tag>
              <b-tag type="is-danger">{{ selected.kategori_ide }}</b-tag>
            </b-taglist>

            <hr />
            <div class="media-content">
              <p class="subtitle is-6">{{ selected.deskripsi_ide }}</p>
            </div>
            <hr />
            <div
              class="level has-background-link"
              style="padding: 10px 10px; border-radius: 6px"
            >
              <div class="media-content has-text-white">
                <p class="subtitle is-6 has-text-white">Daftar Ide Bisni ini</p>
              </div>
              <section>
                <b-button>Daftar</b-button>
              </section>
            </div>
            <b-taglist>
              ID:
              <b>{{ selected.id_user_upload_ide }}</b>
              , Nama User:
              <b>Tidak ada</b>
            </b-taglist>
          </div>
          </div>
         
        </div>
       
      </div>
    </div>
  </div>
</template>


<script>

import idebisnismodal from "@/app/home/komponen/idebisnimodal";
import sidebar from "@/app/home/komponen/sidebar";

export default {
  components: { idebisnismodal, sidebar },
  data() {
    const data = require("@/app/home/data/sample.json");

    return {
      isImageModalActive: false,
      isCardModalActive: false,
      open: false,
      overlay: true,
      fullheight: true,
      right: true,
      perPage: 10,
      isPaginated: true,
      data,
      selected: data[1],
       isActive: false
    };
  },
};
</script>
<style>
div.b {
  width: 300px;
  word-wrap: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
div.a {
  width: 200px;
  word-wrap: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>