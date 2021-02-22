<template>
  <div class="container is-fluid">
    <br />
    <div class="level">
      <div class="level-left">
        <p class="title is-5 has-text-link">
          Ide Bisnis
          <br />
          <small class="subtitle is-6 has-text-link">
            Daftar Ide Bisnis Terbaru
          </small>
        </p>
      </div>
      <div class="level-right">
        <b-button
          tag="router-link"
          icon-left="plus"
          to="/ideform"
          type="is-link"
        >
          Tambah Ide Bisnis
        </b-button>
      </div>
    </div>

    <div class="columns">
      <div class="column mr-4">
        <b-tabs
          class="box px-4 is-shadowless"
          v-model="activeTab"
          style="border-radius: 10px"
        >
          <b-tab-item>
            <div class="level">
              <div class="level-left">
                <p class="subtitle is-4">Table Ide Bisnis</p>
              </div>
              <div class="level-right">
                <b-checkbox v-model="searchable" native-value="true">
                  Cari
                </b-checkbox>
              </div>
            </div>
            <b-table
              :data="data"
              paginated
              per-page="15"
              :selected.sync="selected"
              pagination-simple
              sort-icon="chevron"
              sort-icon-size="is-small"
            >
              <b-table-column
                field="id_ide"
                label="ID"
                width="40"
                numeric
                v-slot="props"
                :searchable="searchable"
              >
                {{ props.row.id_ide }}
              </b-table-column>

              <b-table-column
                field="nama_ide"
                label="Judul"
                v-slot="props"
                :searchable="searchable"
              >
                <div class="a">
                  {{ props.row.nama_ide }}
                </div>
              </b-table-column>

              <b-table-column
                field="deskripsi_ide"
                label="Deskripsi"
                v-slot="props"
                :searchable="searchable"
              >
                <div class="b">
                  {{ props.row.deskripsi_ide }}
                </div>
              </b-table-column>

              <b-table-column
                field="jenis_ide"
                label="Jenis"
                centered
                v-slot="props"
                :searchable="searchable"
              >
                {{ props.row.jenis_ide }}
              </b-table-column>
              <b-table-column
                field="kategori_ide"
                label="kategori"
                centered
                v-slot="props"
                :searchable="searchable"
              >
                <span class="tag is-success">
                  {{ props.row.kategori_ide }}
                </span>
              </b-table-column>
              <b-table-column
                field="tanggal_listing_ide"
                label="Tanggal"
                centered
                v-slot="props"
                :searchable="searchable"
              >
                {{
                  new Date(props.row.tanggal_listing_ide).toLocaleDateString()
                }}
              </b-table-column>

              <b-table-column
                custom-key="actions"
                cell-class="is-actions-cell"
                v-slot="props"
              >
                <div class="buttons is-right">
                  <button
                    class="button is-small is-info is-light"
                    type="button"
                    @click="activeTab = 1"
                  >
                    <b-icon icon="account-edit" />
                  </button>
                  <button
                    class="button is-small is-danger is-light"
                    
                    type="button"
                    @click.prevent="trashModal(props.row)"
                  >
                    <b-icon icon="trash-can" />
                  </button>
                </div>
              </b-table-column>
            </b-table>
          </b-tab-item>
          <b-tab-item>
            <div class="level">
              <div class="level-left">
                <p class="subtitle is-4">Edit</p>
              </div>
              <div class="level-right">
                <b-button label="Kembali" @click="activeTab = 0" />
              </div>
            </div>

            <form @submit.prevent="add" class="p-4">
              <!--upload gamvar -->
              <b-field grouped>
                <b-field>
                  <template #label>
                    <small class="has-text-link">Tanggal</small>
                  </template>
                  <b-datepicker
                    v-model="tanggal_ide"
                    placeholder="Click to select..."
                    icon="calendar-today"
                    trap-focus
                  ></b-datepicker>
                </b-field>
              </b-field>

              <b-field>
                <template #label>
                  <small class="has-text-link">Gambar</small>
                </template>
                <b-upload v-model="selected.gambar_ide" expanded>
                  <a class="button is-primary is-fullwidth is-large">
                    <b-icon icon="upload"></b-icon>
                    <span>{{ gambar_ide.name || "Click to upload" }}</span>
                  </a>
                </b-upload>
              </b-field>

              <!--estimasi modal dan taggal -->
              <b-field grouped>
                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">Estimasi Modal</small>
                  </template>
                  <b-input
                    v-model="selected.modal_ide"
                    type="number"
                    placeholder="0"
                    size="is-medium"
                    expanded
                    icon="wallet"
                  ></b-input>
                </b-field>
                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">Jenis</small>
                  </template>
                  <b-select
                    v-model="selected.jenis_ide"
                    placeholder="pilih jenis"
                    size="is-medium"
                    expanded
                  >
                    <option value="Jasa">Jasa</option>
                    <option value="Makanan">Minuman</option>
                    <option value="Barang">Barang</option>
                  </b-select>
                </b-field>
                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">Kategori</small>
                  </template>
                  <b-select
                    v-model="selected.kategori_ide"
                    size="is-medium"
                    placeholder="pilih kategori"
                    expanded
                  >
                    <option value="5 Juta">5-10 juta</option>
                    <option value="10 Juta">10-15 juta</option>
                    <option value="20 Juta">15-20 Juta</option>
                  </b-select>
                </b-field>
              </b-field>
              <hr />
              <!--judull -->
              <b-field grouped>
                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">Judul</small>
                  </template>
                  <b-input
                    v-model="selected.nama_ide"
                    size="is-medium"
                    placeholder="Judul "
                    icon="pen"
                  ></b-input>
                </b-field>
              </b-field>
              <!--deskirpsi -->
              <b-field grouped>
                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">Deskripsi Judul</small>
                    <b-tooltip type="is-dark" label="Anda Bisa Copas dari Word">
                      <b-icon
                        size="is-small"
                        icon="help-circle"
                        type="is-info"
                      ></b-icon>
                    </b-tooltip>
                  </template>
                  <div>
                    <textarea
                      name=""
                      id=""
                      v-model="selected.deskripsi_ide"
                      cols="130"
                      rows="10"
                    ></textarea>
                  </div>
                </b-field>
              </b-field>
              <hr />

              <!--promosi -->
              <template grouped label>
                <small class="has-text-link"><b>Deskripsi Judul</b></small>
                <b-tooltip
                  type="is-dark"
                  label="Penempatan promo dalam aplikasi"
                >
                  <b-icon
                    size="is-small"
                    icon="help-circle"
                    type="is-info"
                  ></b-icon>
                </b-tooltip>
              </template>
              <br />
              <b-field grouped>
                <b-field expanded>
                  <b-field>
                    <b-checkbox-button
                      v-model="selected.promosi_ide"
                      native-value="homeslider"
                      size="is-medium"
                      type="is-info"
                    >
                      <b-icon icon="view-dashboard"></b-icon>
                      <span>Slider Utama</span>
                    </b-checkbox-button>

                    <b-checkbox-button
                      v-model="selected.promosi_ide"
                      size="is-medium"
                      native-value="Halamandepan"
                      type="is-info"
                    >
                      <b-icon icon="link"></b-icon>
                      <span>Halaman Depan</span>
                    </b-checkbox-button>

                    <b-checkbox-button
                      v-model="selected.promosi_ide"
                      size="is-medium"
                      native-value="Sliderkategori"
                      type="is-info"
                    >
                      <b-icon icon="cellphone-link"></b-icon>
                      <span>Slider Kategori</span>
                    </b-checkbox-button>
                  </b-field>
                </b-field>
              </b-field>
              <br />
              <!--kategori dan tag -->
              <b-field grouped>
                <b-field expanded type="is-light">
                  <template #label>
                    <small class="has-text-link">ID</small>
                  </template>
                  <input
                    class="input is-light is-small"
                    type="text"
                    v-model="selected.id_ide"
                    placeholder="Info input"
                    readonly
                  />
                </b-field>
                <b-field expanded type="is-light">
                  <template #label>
                    <small class="has-text-link">User Upload</small>
                  </template>
                  <input
                    class="input is-light is-small"
                    type="text"
                    v-model="selected.id_user_upload_ide"
                    placeholder="Info input"
                    readonly
                  />
                </b-field>
              </b-field>
              <hr />
              <!--tombol submit-->
              <hr />

              <div class="buttons">
                <b-button
                  tag="router-link"
                  icon-left="plus"
                  to="/tambah"
                  type="is-link"
                >
                  Simpan Perubahan
                </b-button>
                <b-button
                  tag="router-link"
                  icon-left="delete"
                  to="/idedaftar"
                  type="is-danger"
                  outlined
                >
                  Batal
                </b-button>
              </div>
            </form>
          </b-tab-item>
        </b-tabs>
      </div>
      <div class="column is-one-quarter">
        <div
          class="box has-background-white"
          style="border-radius: 14px; padding: 0px"
        >
          <div class="card has-background-white" style="border-radius: 10px">
            <div class="card-image">
              <figure class="image is-3by3">
                <img
                  style="border-radius: 10px 10px 0px 0px"
                  :src="
                    selected.gambar_ide
                      ? selected.gambar_ide
                      : 'https://bulma.io/images/placeholders/128x128.png'
                  "
                  :alt="selected.gambar_ide"
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
                  {{ selected.tanggal_listing_ide }}
                </span>
              </div>
            </div>
          </div>
          <div class="card-content">
            <b-taglist>
              <b-tag type="is-primary" rounded>
                {{ selected.modal_ide }}
              </b-tag>
              <b-tag type="is-success" rounded>
                {{ selected.jenis_ide }}
              </b-tag>
              <b-tag type="is-danger" rounded>
                {{ selected.kategori_ide }}
              </b-tag>
            </b-taglist>
            <p class="title is-4">
              {{ selected.nama_ide }}
            </p>
            <hr />
            <div class="media-content">
              <p class="subtitle is-6"></p>
              <div v-html="selected.deskripsi_ide"></div>
            </div>
            <hr />
            <div
              class="level has-background-link-light"
              style="padding: 10px 10px; border-radius: 6px"
            >
              <div class="media-content">
                <p class="subtitle is-6">
                  Mulai dari Rp.{{ selected.modal_ide }}
                </p>
              </div>
              <section>
                <b-button class="is-link">Daftar</b-button>
              </section>
            </div>
            <b-taglist class="px-2">
              ID:
              <b>{{ selected.id_ide }}</b>
              , Nama User:
              <b>User id {{ selected.id_user_upload_ide }}</b>
            </b-taglist>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
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
    return {
      activeTab: 0,
      data,
      selected: data[1],
      id_ide: 1,
      nama_ide: "sub ide 1 dis voluptatem adipciendis ",
      sub_nama_ide: "sub ide 1 dis",
      modal_ide: 2000,
      kategori_ide: "10 Juta",
      jenis_ide: "Minuman",
      promosi_ide: ["Halamandepan", "Sliderkategori"],
      deskripsi_ide:
        "eiciendis voluptateovident rerum culpa nquis hic commodi nesciunt rem tenetur doloremque ipsam i sunt voluptatem rerum illo velit",
      tanggal_ide: new Date(),
      tanggal_listing_ide: "1970-01-01",
      tanggal_update_ide: "12-11-2020",
      gambar_ide: {},
      gambar_thumb_ide: "",
      id_user_upload_ide: "1",
      searchable: false,
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
