<template>
  <AprBaseLayout>
    <div class="container is-fluid ">
      <div class="box has-background-link p-0">
        <div class="level" style="padding: 0px; border-radius: 5px">
          <div class="level-left">
            <figure class="image is-128x128 m-4" style="border: 2px">
              <img
                class="is-rounded"
                src="../../../public/images/img_avatar2.png"
                width="248"
                height="248"
                alt="Placeholder image"
              />
            </figure>
            <p class="title is-5 pl-4 has-text-white">
              <small class="subtitle is-6 has-text-white">Welcome back,</small>
              <br />
              Nama User Name,
              <br />
              <br />
              <small class="subtitle is-6 has-text-white">
                It's really nice to see you again
              </small>
              <br />
            </p>
          </div>
          <div class="level-right box has-background-white has-text-right">
            <p class="title is-5 pl-4  has-text-right">
              <small class="subtitle is-6 ">
                Start using Admin Panel
                <br />
                and content management tools
              </small>
              <br />

              <br />
              Learn More
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="container is-fluid">
      <br />
      <div class="columns">
        <div class="column is-full">
          <div class="box">
            <div
              class="level has-background-success-light"
              style="padding: 10px; border-radius: 5px"
            >
              <div class="level-left p-4">
                <p class="title is-5">
                  Pelatihan
                  <br />
                  <small class="subtitle is-6">Daftar Pelatihan Terbaru</small>
                </p>
              </div>
              <div class="level-right">
                <b-button
                  tag="router-link"
                  icon-left="eye"
                  to="/pelatihandaftar"
                  type="is-light"
                ></b-button>
              </div>
            </div>
            <b-table
              :data="data"
              paginated="false"
              pagination-simple
              per-page="5"
            >
              <b-table-column
                field="id"
                label="ID"
                width="40"
                sortable
                numeric
                v-slot="props"
              >
                {{ props.row.id_ide }}
              </b-table-column>

              <b-table-column
                field="nama_ide"
                label="Judul"
                sortable
                v-slot="props"
              >
                {{ props.row.nama_ide }}
              </b-table-column>

              <b-table-column
                field="nama_mentor"
                label="Mentor"
                sortable
                v-slot="props"
                centered
              >
                {{ props.row.nama_mentor }}
              </b-table-column>

               <b-table-column
                field="modal_ide"
                label="Modal"
                sortable
                v-slot="props"
                centered
              >
               Rp. {{ props.row.modal_ide }}
              </b-table-column>

              <b-table-column
                field="kategori_ide"
                label="Kategori"
                sortable
                v-slot="props"
                centered
              >
                {{ props.row.kategori_ide }}
              </b-table-column>

              <b-table-column
                field="jenis_ide"
                label="Jenis"
                sortable
                v-slot="props"
                centered
              >
                {{ props.row.jenis_ide }}
              </b-table-column>

              <b-table-column
                field="tanggal_listing_ide"
                label="Tanggal"
                sortable
                centered
                v-slot="props"
              >
                <span class="tag is-success">
                  {{
                    new Date(props.row.tanggal_listing_ide).toLocaleDateString()
                  }}
                </span>
              </b-table-column>

               
               <b-table-column
                field="promosi_ide"
                label="Promosi"
                sortable
                v-slot="props"
                centered
              >
                {{ props.row.promosi_ide }}
              </b-table-column>
            </b-table>
          </div>
        </div>
        
      </div>
      <div class="columns">
        <div class="column is-half">
          <div class="box">
            <div
              class="level has-background-success-light"
              style="padding: 10px; border-radius: 5px"
            >
              <div class="level-left p-4">
                <p class="title is-5">
                  Ide Bisnis
                  <br />
                  <small class="subtitle is-6">Daftar Ide Bisnis Terbaru</small>
                </p>
              </div>
              <div class="level-right">
                <b-button
                  tag="router-link"
                  icon-left="eye"
                  to="/idedaftar"
                  type="is-light"
                ></b-button>
              </div>
            </div>
            <b-table
              :data="data"
              paginated="false"
              pagination-simple
              per-page="5"
            >
              <b-table-column
                field="id"
                label="ID"
                width="40"
                sortable
                numeric
                v-slot="props"
              >
                {{ props.row.id_ide }}
              </b-table-column>

              <b-table-column
                field="nama_ide"
                label="Judul"
                sortable
                v-slot="props"
              >
                {{ props.row.nama_ide }}
              </b-table-column>

              <b-table-column
                field="kategori_ide"
                label="Kategori"
                sortable
                v-slot="props"
                centered
              >
                {{ props.row.kategori_ide }}
              </b-table-column>

              <b-table-column
                field="jenis_ide"
                label="jenis"
                sortable
                v-slot="props"
                centered
              >
                {{ props.row.jenis_ide }}
              </b-table-column>

              <b-table-column
                field="tanggal_listing_ide"
                label="tanggal"
                sortable
                centered
                v-slot="props"
              >
                <span class="tag is-success">
                  {{
                    new Date(props.row.tanggal_listing_ide).toLocaleDateString()
                  }}
                </span>
              </b-table-column>
            </b-table>
          </div>
        </div>
        <div class="column is-half">
          <div class="box">
            <div
              class="level has-background-success-light"
              style="padding: 10px; border-radius: 5px"
            >
              <div class="level-left p-4">
                <p class="title is-5">
                  Artikel
                  <br />
                  <small class="subtitle is-6">Daftar Artikel Terbaru</small>
                </p>
              </div>
              <div class="level-right">
                <b-button
                  tag="router-link"
                  icon-left="eye"
                  to="/discoverydaftar"
                  type="is-light"
                ></b-button>
              </div>
            </div>
            <b-table
              :data="data"
              paginated="false"
              pagination-simple
              per-page="5"
            >
              <b-table-column
                field="id"
                label="ID"
                width="40"
                sortable
                numeric
                v-slot="props"
              >
                {{ props.row.id_ide }}
              </b-table-column>

              <b-table-column
                field="nama_ide"
                label="Judul"
                sortable
                v-slot="props"
              >
                {{ props.row.nama_ide }}
              </b-table-column>

              <b-table-column
                field="kategori_ide"
                label="Kategori"
                sortable
                v-slot="props"
                centered
              >
                {{ props.row.kategori_ide }}
              </b-table-column>

              <b-table-column
                field="jenis_ide"
                label="jenis"
                sortable
                v-slot="props"
                centered
              >
                {{ props.row.jenis_ide }}
              </b-table-column>

              <b-table-column
                field="tanggal_listing_ide"
                label="tanggal"
                sortable
                centered
                v-slot="props"
              >
                <span class="tag is-success">
                  {{
                    new Date(props.row.tanggal_listing_ide).toLocaleDateString()
                  }}
                </span>
              </b-table-column>
            </b-table>
          </div>
        </div>
      </div>
      
      
     
    </div>

   
  </AprBaseLayout>
</template>
<script>
import { useState } from "vuex-composition-helpers";

import AprBaseLayout from "@/shared/layouts/apr-base-layout/AprBaseLayout.vue";
const data = [
  {
    id_ide: "1",
    nama_ide:
      "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
    sub_nama_ide:
      "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
    modal_ide: "1000",
    kategori_ide: "10 Juta",
    jenis_ide: "Makanan",
    promosi_ide: ["Halamandepan", "Sliderkategori"],
    deskripsi_ide:
      "ullam et saepe reiciendis voluptatem adipisci nsit amet autem assumenda provident rerum culpa nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    tanggal_listing_ide: "1970-01-01",
    tanggal_update_ide: "1970-01-01",
    gambar_ide: "https://via.placeholder.com/600/92c952",
    gambar_thumb_ide: "",
    id_user_upload_ide: "1",
    nama_mentor: "Dinda Kanya",
    kontak_mentor: "0822-2333-22123",
  },
  {
    id_ide: "2",
    nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    sub_nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    modal_ide: "1000",
    kategori_ide: "10 Juta",
    jenis_ide: "Minuman",
    promosi_ide: ["Halamandepan", "Sliderkategori"],
    deskripsi_ide:
      "ullam et saepe reiciendis voluptatem adipisci nsit amet autem assumenda provident rerum culpa nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    tanggal_listing_ide: "1970-01-01",
    tanggal_update_ide: "1970-01-01",
    gambar_ide: "https://via.placeholder.com/600/24f355",
    gambar_thumb_ide: "",
    id_user_upload_ide: "1",
    nama_mentor: "Kevin Moses",
    kontak_mentor: "0822-322-22123",
  },
  {
    id_ide: "3",
    nama_ide:
      "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
    sub_nama_ide:
      "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
    modal_ide: "1000",
    kategori_ide: "10 Juta",
    jenis_ide: "Barang",
    promosi_ide: ["Halamandepan", "Sliderkategori"],
    deskripsi_ide:
      "reiciendis voluptatem adipisci nsit amet autem assumenda provident rerum culpa nquis hic coremque ipsam iure nquis sunt voluptatem rerum illo velit",
    tanggal_listing_ide: "1970-01-01",
    tanggal_update_ide: "1970-01-01",
    gambar_ide: "https://via.placeholder.com/600/24f355",
    gambar_thumb_ide: "",
    id_user_upload_ide: "1",
    nama_mentor: "Dinda Kanya",
    kontak_mentor: "0822-2333-22123",
  },
  {
    id_ide: "4",
    nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    sub_nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    modal_ide: "1000",
    kategori_ide: "10 Juta",
    jenis_ide: "Minuman",
    promosi_ide: ["Halamandepan", "Sliderkategori"],
    deskripsi_ide:
      "ullam et saepe reiciendis voluptatem adipisci nsit amet autem assumenda provident rerum culpa nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    tanggal_listing_ide: "1970-01-01",
    tanggal_update_ide: "1970-01-01",
    gambar_ide: "https://via.placeholder.com/600/92c952",
    gambar_thumb_ide: "",
    id_user_upload_ide: "1",
    nama_mentor: "Kevin Moses",
    kontak_mentor: "0822-322-22123",
  },
  {
    id_ide: "5",
    nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    sub_nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    modal_ide: "1000",
    kategori_ide: "10 Juta",
    jenis_ide: "Makanan",
    promosi_ide: ["Halamandepan", "Sliderkategori"],
    deskripsi_ide:
      "reiciendis voluptatem adipisci nsit amet autem assumenda provident rerum culpa nquis hic coremque ipsam iure nquis sunt voluptatem rerum illo velit",
    tanggal_listing_ide: "1970-01-01",
    tanggal_update_ide: "1970-01-01",
    gambar_ide: "https://via.placeholder.com/600/24f355",
    gambar_thumb_ide: "",
    id_user_upload_ide: "1",
    nama_mentor: "Dinda Kanya",
    kontak_mentor: "0822-2333-22123",
  },
  {
    id_ide: "6",
    nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    sub_nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    modal_ide: "1000",
    kategori_ide: "10 Juta",
    jenis_ide: "Barang",
    promosi_ide: ["Halamandepan", "Sliderkategori"],
    deskripsi_ide:
      "ullam et saepe reiciendis voluptatem adipisci nsit amet autem assumenda provident rerum culpa nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    tanggal_listing_ide: "1970-01-01",
    tanggal_update_ide: "1970-01-01",
    gambar_ide: "https://via.placeholder.com/600/9c184f",
    gambar_thumb_ide: "",
    id_user_upload_ide: "1",
    nama_mentor: "Kevin Moses",
    kontak_mentor: "0822-322-22123",
  },
  {
    id_ide: "7",
    nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    sub_nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    modal_ide: "1000",
    kategori_ide: "10 Juta",
    jenis_ide: "Makanan",
    promosi_ide: ["Halamandepan", "Sliderkategori"],
    deskripsi_ide:
      "reiciendis voluptatem adipisci nsit amet autem assumenda provident rerum culpa nquis hic coremque ipsam iure nquis sunt voluptatem rerum illo velit",
    tanggal_listing_ide: "1970-01-01",
    tanggal_update_ide: "1970-01-01",
    gambar_ide: "https://via.placeholder.com/600/56a8c2",
    gambar_thumb_ide: "",
    id_user_upload_ide: "1",
    nama_mentor: "Dinda Kanya",
    kontak_mentor: "0822-2333-22123",
  },
  {
    id_ide: "8",
    nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    sub_nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    modal_ide: "1000",
    kategori_ide: "10 Juta",
    jenis_ide: "Minuman",
    promosi_ide: ["Halamandepan", "Sliderkategori"],
    deskripsi_ide:
      "ullam et saepe reiciendis voluptatem adipisci nsit amet autem assumenda provident rerum culpa nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    tanggal_listing_ide: "1970-01-01",
    tanggal_update_ide: "1970-01-01",
    gambar_ide: "https://via.placeholder.com/600/24f355",
    gambar_thumb_ide: "",
    id_user_upload_ide: "1",
    nama_mentor: "Kevin Moses",
    kontak_mentor: "0822-322-22123",
  },
  {
    id_ide: "9",
    nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    sub_nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    modal_ide: "1000",
    kategori_ide: "10 Juta",
    jenis_ide: "Barang",
    promosi_ide: ["Halamandepan", "Sliderkategori"],
    deskripsi_ide:
      "reiciendis voluptatem adipisci nsit amet autem assumenda provident rerum culpa nquis hic coremque ipsam iure nquis sunt voluptatem rerum illo velit",
    tanggal_listing_ide: "1970-01-01",
    tanggal_update_ide: "1970-01-01",
    gambar_ide: "https://via.placeholder.com/600/9c184f",
    gambar_thumb_ide: "",
    id_user_upload_ide: "1",
    nama_mentor: "Kevin Moses",
    kontak_mentor: "0822-322-22123",
  },
  {
    id_ide: "10",
    nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    sub_nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    modal_ide: "1000",
    kategori_ide: "10 Juta",
    jenis_ide: "Minuman",
    promosi_ide: ["Halamandepan", "Sliderkategori"],
    deskripsi_ide:
      "ullam et saepe reiciendis voluptatem adipisci nsit amet autem assumenda provident rerum culpa nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    tanggal_listing_ide: "1970-01-01",
    tanggal_update_ide: "1970-01-01",
    gambar_ide: "https://via.placeholder.com/600/56a8c2",
    gambar_thumb_ide: "",
    id_user_upload_ide: "1",
    nama_mentor: "Dinda Kanya",
    kontak_mentor: "0822-2333-22123",
  },
  {
    id_ide: "11",
    nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    sub_nama_ide:
      "officia delectus consequatur vero aut veniam explicabo molestias",
    modal_ide: "1000",
    kategori_ide: "10 Juta",
    jenis_ide: "Minuman",
    promosi_ide: ["Halamandepan", "Sliderkategori"],
    deskripsi_ide:
      "ullam et saepe reiciendis voluptatem adipisci nsit amet autem assumenda provident rerum culpa nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    tanggal_listing_ide: "1970-01-01",
    tanggal_update_ide: "1970-01-01",
    gambar_ide: "https://via.placeholder.com/600/9c184f",
    gambar_thumb_ide: "",
    id_user_upload_ide: "1",
    nama_mentor: "Kevin Moses",
    kontak_mentor: "0822-322-22123",
  },
];
export default {
  name: "Home",
  components: {
    AprBaseLayout,
  },

  setup() {
    const { user } = useState(["user"]);

    return {
      data,
      user,
    };
  },
};
</script>

<style>
.box {
  border-radius: 12px;
}

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