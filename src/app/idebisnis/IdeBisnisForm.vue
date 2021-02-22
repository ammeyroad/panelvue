<template>
  <div class="container is-fluid">
    <br />
    <div class="level">
      <div class="level-left">
        <p class="title is-5 has-text-link">
          Form
          <br />
          <small class="subtitle is-6 has-text-link">
            Form Ide Bisnis Terbaru
          </small>
        </p>
      </div>
      <div class="level-right">
        <b-button
          tag="router-link"
          icon-left="arrow-left"
          to="/idedaftar"
          type="is-link"
          outlined
        >
          Kembali
        </b-button>
      </div>
    </div>

    <div class="columns">
      <div class="column mr-4">
        <div class="box is-shadowless " style="border-radius: 10px">
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
                  size="is-medium"
                  trap-focus
                ></b-datepicker>
              </b-field>
              <b-field expanded type="is-light"></b-field>
            </b-field>

            <b-field>
              <template #label>
                <small class="has-text-link">Gambar</small>
              </template>
              <b-upload v-model="gambar_ide" expanded>
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
                  v-model="modal_ide"
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
                  v-model="jenis_ide"
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
                  v-model="kategori_ide"
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
                  v-model="nama_ide"
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
                    v-model="deskripsi_ide"
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
              <b-tooltip type="is-dark" label="Penempatan promo dalam aplikasi">
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
                    v-model="promosi_ide"
                    native-value="homeslider"
                    size="is-medium"
                    type="is-info"
                  >
                    <b-icon icon="view-dashboard"></b-icon>
                    <span>Slider Utama</span>
                  </b-checkbox-button>

                  <b-checkbox-button
                    v-model="promosi_ide"
                    size="is-medium"
                    native-value="Halamandepan"
                    type="is-info"
                  >
                    <b-icon icon="link"></b-icon>
                    <span>Halaman Depan</span>
                  </b-checkbox-button>

                  <b-checkbox-button
                    v-model="promosi_ide"
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
                  v-model="id_ide"
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
                  v-model="id_user_upload_ide"
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
                SUBMIT
              </b-button>
              <b-button
                tag="router-link"
                icon-left="delete"
                to="/daftar"
                type="is-danger"
                outlined
              >
                Batal
              </b-button>
            </div>
          </form>
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="box" style="border-radius: 14px; padding: 0px">
          <div class="card has-background-white" style="border-radius: 10px">
            <div class="card-image">
              <figure class="image is-3by3">
                <img
                  style="border-radius: 10px 10px 0px 0px"
                  :src="
                    gambar_ides
                      ? gambar_ides
                      : 'https://bulma.io/images/placeholders/128x128.png'
                  "
                  :alt="gambar_ide.name"
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
                  {{ new Date(tanggal_ide).toLocaleDateString() }}
                </span>
              </div>
            </div>
          </div>
          <div class="card-content">
            <b-taglist>
              <b-tag type="is-primary" rounded>Rp. {{ modal_ide }}</b-tag>
              <b-tag type="is-success" rounded>
                {{ jenis_ide }}
              </b-tag>
              <b-tag type="is-warning" rounded>
                {{ kategori_ide }}
              </b-tag>
            </b-taglist>
            <p class="title is-4">
              {{ nama_ide }}
            </p>
            <hr />
            <div class="media-content">
              <p class="subtitle is-6"></p>
              <div v-html="deskripsi_ide"></div>
            </div>
            <hr />
            <b-taglist class="px-2">
              ID:
              <b>{{ id_ide }}</b>
              , Nama User:
              <b>Tidak ada {{ id_user_upload_ide }}</b>
            </b-taglist>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useState } from "vuex-composition-helpers";
export default {
  name: "Home",
  data() {
    return {
      id_ide: 1,
      nama_ide: "sub ide 1 dis voluptatem adipciendis ",
      sub_nama_ide: "sub ide 1 dis",
      modal_ide: 2000,
      kategori_ide: "10 Juta",
      jenis_ide: "",
      promosi_ide: ["Halamandepan", "Sliderkategori"],
      deskripsi_ide:
        "eiciendis voluptateovident rerum culpa nquis hic commodi nesciunt rem tenetur doloremque ipsam i sunt voluptatem rerum illo velit",
      tanggal_ide: new Date(),
      tanggal_listing_ide: "1970-01-01",
      tanggal_update_ide: "12-11-2020",
      gambar_ide: {},
      gambar_thumb_ide: "",
      id_user_upload_ide: "1",
    };
  },

  setup() {
    const { user } = useState(["user"]);

    return {
      user,
    };
  },
};
</script>
