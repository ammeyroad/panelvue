<template>
  <div>
    <sidebar />

    <div class="main">
      <br />
      <div class="level" style="padding: 10px 0px; border-radius: 10px">
        <div>
          <p class="subtitle has-text-link"><b>Tambah Ide Bisnis</b></p>
        </div>
        <div class="buttons">
          <b-button
            tag="router-link"
            icon-left="arrow-left"
            to="/idebisnisdaftar"
            type="is-link"
            outlined
          >
            Kembali
          </b-button>
        </div>
      </div>

      <div class="columns">
        <div class="column is-8">
          <div class="box" style="padding: 20px; border-radius: 10px">
            <form @submit.prevent="add">
              <b-field grouped>
                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">Upload Gambar</small>
                  </template>
                  <b-upload v-model="gambar_ide" multiple drag-drop expanded>
                    <div class="content has-text-centered">
                      <br />
                      <b-icon icon="upload" size="is-medium"></b-icon>
                      <br />
                      <label for="my-file">
                        <small>Ukuran terbaik 600x800</small>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        @change="previewImage"
                        class="form-control-file"
                        id="my-file"
                      />
                      <br />
                      <span>-</span>
                    </div>
                  </b-upload>
                </b-field>
              </b-field>
              <br />
              <b-field grouped>
                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">Estimasi Modal</small>
                  </template>
                  <p class="control">
                    <b-button type="is-link" label="Rp." />
                  </p>
                  <b-input
                    v-model="modal_ide"
                    type="number"
                    placeholder="0"
                    expanded
                  ></b-input>
                </b-field>

                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">Tanggal</small>
                  </template>

                  <b-datepicker
                    ref="datepicker"
                    v-model="tanggal_listing_ide"
                    expanded
                    placeholder="Select a date"
                  ></b-datepicker>
                </b-field>
              </b-field>
              <br />
              <b-field grouped>
                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">Judul Bisnis</small>
                  </template>
                  <b-input
                    v-model="nama_ide"
                    placeholder="Judul Pelatihan"
                    icon="pen"
                  ></b-input>
                </b-field>
                <b-field>
                  <template #label>
                    <small class="has-text-link">Sub Judul Bisnis</small>
                    <b-tooltip type="is-dark" label="Tidak lebih dari 4 kata">
                      <b-icon
                        size="is-small"
                        icon="help-circle-outline"
                      ></b-icon>
                    </b-tooltip>
                  </template>
                  <b-input placeholder="Judul Pelatihan" icon="pen"></b-input>
                </b-field>
              </b-field>
              <br />
              <b-field grouped>
                <template #label>
                  <small class="has-text-link">Deskripsi Bisnis</small>
                </template>
                <div class="editor" >
                  <h2>Bilingual Personality Disorder</h2>
                  <figure class="image image-style-side">
                    <img
                      src="https://c.cksource.com/a/1/img/docs/sample-image-bilingual-personality-disorder.jpg"
                    />
                    <figcaption>One language, one person.</figcaption>
                  </figure>
                  <p>
                    This may be the first time you hear about this made-up
                    disorder but it actually isn’t so far from the truth. Even
                    the studies that were conducted almost half a century show
                    that
                    <strong>
                      the language you speak has more effects on you than you
                      realise
                    </strong>
                    .
                  </p>
                  <p>
                    One of the very first experiments conducted on this topic
                    dates back to 1964.
                    <a
                      href="https://www.researchgate.net/publication/9440038_Language_and_TAT_content_in_bilinguals"
                    >
                      In the experiment
                    </a>
                    designed by linguist Ervin-Tripp who is an authority expert
                    in psycholinguistic and sociolinguistic studies, adults who
                    are bilingual in English in French were showed series of
                    pictures and were asked to create 3-minute stories. In the
                    end participants emphasized drastically different dynamics
                    for stories in English and French.
                  </p>
                  <p>
                    Another ground-breaking experiment which included bilingual
                    Japanese women married to American men in San Francisco were
                    asked to complete sentences. The goal of the experiment was
                    to investigate whether or not human feelings and thoughts
                    are expressed differently in
                    <strong>different language mindsets</strong>
                    .
                    <Here>is a sample from the the experiment:</Here>
                  </p>
                  
                </div>
                
              </b-field>
              <br />
              
              <b-field grouped>
                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">Penempatan Promo</small>
                  </template>
                  <div
                    class="block"
                    label="Push Promo"
                    message="This email is invalid"
                  >
                    <section class="b-tooltips">
                      <b-tooltip position="is-bottom" multilined>
                        <b-checkbox
                          v-model="checkboxGroup"
                          type="is-link"
                          native-value="Slider"
                        >
                          HOME SLIDER
                        </b-checkbox>
                        <template v-slot:content>
                          <p>
                            <img
                              src="https://buefy.org/static/img/buefy-light.7df103a.png"
                              width="101"
                              height="39"
                              alt=""
                              style="
                                display: block;
                                margin-left: auto;
                                margin-right: auto;
                              "
                            />
                          </p>
                          <p style="text-align: center">
                            bagian Home paling atas
                          </p>
                        </template>
                      </b-tooltip>

                      <b-tooltip position="is-top" multilined>
                        <b-checkbox
                          v-model="checkboxGroup"
                          type="is-link"
                          native-value="Section"
                        >
                          HOME SECTION
                        </b-checkbox>
                        <template v-slot:content>
                          <p>
                            <img
                              src="https://buefy.org/static/img/buefy-light.7df103a.png"
                              width="101"
                              height="39"
                              alt=""
                              style="
                                display: block;
                                margin-left: auto;
                                margin-right: auto;
                              "
                            />
                          </p>
                          <p style="text-align: center">
                            bagian Home paling atas
                          </p>
                        </template>
                      </b-tooltip>

                      <b-tooltip position="is-right" multilined>
                        <b-checkbox
                          v-model="checkboxGroup"
                          type="is-link"
                          native-value="Kategori"
                        >
                          KATEGORI SLIDER
                        </b-checkbox>
                        <template v-slot:content>
                          <p>
                            <img
                              src="https://buefy.org/static/img/buefy-light.7df103a.png"
                              width="101"
                              height="39"
                              alt=""
                              style="
                                display: block;
                                margin-left: auto;
                                margin-right: auto;
                              "
                            />
                          </p>
                          <p style="text-align: center">
                            bagian Home paling atas
                          </p>
                        </template>
                      </b-tooltip>
                    </section>
                  </div>
                </b-field>
              </b-field>
              <br />
              <b-field grouped>
                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">Kategori Bisnis</small>
                  </template>
                  <b-select
                    v-model="kategori_ide"
                    placeholder="Select a character"
                    expanded
                  >
                    <option value="10jt">5-10 juta</option>
                    <option value="15jt">10-15 juta</option>
                    <option value="20jt">15-20 Juta</option>
                  </b-select>
                </b-field>
                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">Tag</small>
                    <b-tooltip
                      type="is-dark"
                      label="tekan enter untuk tag selanjutnya"
                    >
                      <b-icon
                        size="is-small"
                        icon="help-circle-outline"
                      ></b-icon>
                    </b-tooltip>
                  </template>
                  <b-taginput
                    type="is-info"
                    v-model="jenis_ide"
                    :data="filteredTags"
                    autocomplete
                    allow-new="allowNew"
                    open-on-focus="openOnFocus"
                    field="user.first_name"
                    icon="label"
                    placeholder="Add a tag"
                    @typing="getFilteredTags"
                  ></b-taginput>
                </b-field>
              </b-field>
              <br />
              <b-field grouped>
                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">ID Bisnis</small>
                  </template>
                  <b-input value="23" v-model="id_ide" readonly></b-input>
                </b-field>
                <b-field expanded>
                  <template #label>
                    <small class="has-text-link">User Upload</small>
                  </template>
                  <b-input
                    value="23"
                    placeholder="userupload"
                    v-model="id_user_upload_ide"
                  >
                    >
                  </b-input>
                </b-field>
              </b-field>

              <hr />
              <div class="buttons">
                <b-button
                  tag="router-link"
                  icon-left="plus"
                  to="/tambahpelatihan"
                  type="is-link"
                >
                  SUBMIT IDE BISNIS
                </b-button>
                <b-button
                  tag="router-link"
                  icon-left="delete"
                  to="/ap"
                  type="is-danger"
                  outlined
                >
                  Batal
                </b-button>
              </div>
            </form>
          </div>
        </div>

        <div class="column is-4">
          <div class="box" style="padding: 0px; border-radius: 10px">
            <div class="output">
              <div class="box" style="padding: 0px; border-radius: 10px">
                <div
                  class="card has-background-white"
                  style="border-radius: 10px"
                >
                  <div class="card-image">
                    <figure v-if="preview" class="image is-3by3">
                      <img
                        style="border-radius: 10px 10px 0px 0px"
                        :src="preview"
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
                        {{ tanggal_listing_ide }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="card-content">
                  <p class="title is-4">
                    {{ nama_ide }}
                  </p>
                  <b-taglist>
                    <b-tag type="is-primary">{{ modal_ide }}</b-tag>
                    <b-tag type="is-success">{{ jenis_ide }}</b-tag>
                    <b-tag type="is-danger">{{ kategori_ide }}</b-tag>
                    <b-tag type="is-success">{{ checkboxGroup }}</b-tag>
                  </b-taglist>

                  <hr />
                  <div class="media-content">
                    <p class="subtitle is-6">{{ deskripsi_ide }}</p>
                  </div>
                  <hr />
                  <div
                    class="level has-background-link"
                    style="padding: 10px 10px; border-radius: 6px"
                  >
                    <div class="media-content has-text-white">
                      <p class="subtitle is-6 has-text-white">
                        Daftar Ide Bisni ini
                      </p>
                    </div>
                    <section>
                      <b-button>Daftar</b-button>
                    </section>
                  </div>
                  <b-taglist>
                    ID:
                    <b>{{ id_ide }}</b>
                    , Nama User:
                    <b>{{ id_user_upload_ide }}</b>
                  </b-taglist>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import sidebar from "@/app/home/komponen/sidebar";
export default {
  components: { sidebar },
  data() {
    return {
      preview: "https://via.placeholder.com/150/197d29",
      image: "https://via.placeholder.com/150/197d29",
      nama_ide: "Judul Ide Bisnis",
      checkboxGroup: [],
      file: "https://via.placeholder.com/150/197d29",
      kategori_ide: "10jt",
      jenis_ide: ["Barang"],
      promo_ide: [],
      es: "",
      modal_ide: "2000",
      tanggal_listing_ide: new Date(),
      id_user_upload_ide: "",
      id_ide: "23",
      content: "",
    };
  },
  computed: {
    sampleFormat() {
      const dtf = new Intl.DateTimeFormat(this.locale, { timezome: "UTC" });
      return dtf.format(new Date(2000, 11, 25, 12));
    },
  },
  methods: {
    previewImage: function (event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
};
</script>
