<template>
  <div class="container is-fluid">
    <br />
    <div class="level">
      <div class="level-left">
        <p class="title is-5 has-text-link">
          Form
          <br />
          <small class="subtitle is-6 has-text-link">
            Form Pelatihan
          </small>
        </p>
      </div>
      <div class="level-right">
        <b-button
          tag="router-link"
          icon-left="arrow-left"
          to="/pelatihandaftar"
          size="is-medium"
          type="is-link"
          outlined
        >
          Kembali
        </b-button>
      </div>
    </div>
<hr
      style="
        height: 1px;
        border-width: 0;
        color: gray;
        background-color: #234dba;
      "
    />
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
                <small class="has-text-link">Gambar Ide Bisnis</small>
              </template>

              <div class="file is-boxed is-link is-fullwidth">
                <label class="file-label">
                  <input
                    class="file-input form-control"
                    type="file"
                    @change="GetImage"
                  />
                  <span class="file-cta">
                    <span class="file-icon m-2">
                      <i class="fas fa-upload"></i>
                      <span class="pl-4">
                        upload gambar (jpg.png)
                        <br />
                      </span>
                      <br />
                    </span>
                    <span class="file-label"></span>
                  </span>
                  <span class="file-name">
                    {{ gambar_ide.name || "ukuran terbaik 600x800" }}
                  </span>
                </label>
              </div>
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
               <b-field grouped>
            <b-field>
              <template #label>
                <small class="has-text-link">Gambar Mentor</small>
              </template>
              <b-upload v-model="gambar_ide" expanded>
                <a class="button is-primary is-fullwidth">
                  <b-icon icon="upload"></b-icon>
                  <span>
                    {{ gambar_ide.name || "ukuran terbaik 600 x 800" }}
                  </span>
                </a>
              </b-upload>
            </b-field>
            <b-field expanded>
              <template #label>
                <small class="has-text-link">Nama Mentor</small>
                <b-tooltip type="is-dark" label="Mr atau Mrs">
                  <b-icon
                    size="is-small"
                    icon="help-circle"
                    type="is-info"
                  ></b-icon>
                </b-tooltip>
              </template>
              <b-field>
                <b-select placeholder="Mr.">
                  <option>Mr.</option>
                  <option>Ms.</option>
                </b-select>
                <b-input placeholder="Name" v-model="nama_mentor" expanded></b-input>
              </b-field>
            </b-field>
            <b-field expanded>
              <template #label>
                <small class="has-text-link">Kontak Konsultasi</small>
                <b-tooltip type="is-dark" label="pilih email atau nomor telfon">
                  <b-icon
                    size="is-small"
                    icon="help-circle"
                    type="is-info"
                  ></b-icon>
                </b-tooltip>
              </template>
              <b-field>
                <b-select placeholder="Telfon">
                  <option>Telfon</option>
                  <option>Email</option>
                </b-select>
                <b-input placeholder="Name" v-model="kontak_mentor" expanded></b-input>
              </b-field>
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
                to="/pelatihandaftar"
                type="is-link"
              >
                SUBMIT
              </b-button>
              <b-button
                tag="router-link"
                icon-left="delete"
                to="/pelatihandaftar"
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
                    gambar_ide
                      ? gambar_ide
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
             <div
            class="level box has-background-link-light"
            style="padding: 10px 10px; border-radius: 6px"
          >
            
            <section>
              <img  
                style="border-radius: 10px 10px 10px 10px"
                src="../../../public/images/img_avatar2.png" width="60px"
                alt="nama_ide"
              />
            </section>
            <div class="media-content pl-4">
              <p class="title is-6">{{ nama_mentor }}</p>
              <p class="subtitle is-6">Kontak : {{ kontak_mentor }}</p>
            </div>
          </div>
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
      nama_ide: null,
      sub_nama_ide: null,
      modal_ide: null,
      kategori_ide: null,
      jenis_ide: null,
      promosi_ide: [null],
      deskripsi_ide:
        "eiciendis voluptateovident rerum culpa nquis hic commodi nesciunt rem tenetur doloremque ipsam i sunt voluptatem rerum illo velit",
      tanggal_ide: new Date(),
      tanggal_listing_ide: null,
      tanggal_update_ide: null,
      gambar_ide: "",
      gambar_thumb_ide: null,
      id_user_upload_ide: null,
      nama_mentor: null,
      kontak_mentor: null,
    };
  },
   methods: {
    GetImage(e) {
      let image = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.gambar_ide = e.target.result;
      };
    },
  },
  setup() {
    const { user } = useState(["user"]);

    return {
      user,
    };
  },
};
</script>
