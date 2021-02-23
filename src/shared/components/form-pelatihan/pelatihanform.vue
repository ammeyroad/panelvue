<template>
  <form @submit.prevent="add">
    <b-steps>
      <b-step-item label="Pelatihan" icon="account-key">
        <section>
          <b-field grouped>
            <b-field label="ID Pelatihan" required expanded>
              <b-field><b-input type="text" disabled></b-input></b-field>
            </b-field>
            <b-field label="Pilih Tanggal" expanded>
              <b-datepicker
                placeholder="tanggal"
                icon="calendar-today"
                locale="locale"
                editable
              ></b-datepicker>
            </b-field>
          </b-field>
          <br />
          <b-field label="Upload Gambar">
            <b-upload v-model="file" drag-drop required expanded>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"></b-icon>
                  </p>
                  <span>
                    {{ file.name || "ukuran terbaik adalah 600x800" }}
                  </span>
                </div>
              </section>
            </b-upload>
          </b-field>

          <b-field label="Judul">
            <b-input value="Kevin Garvey" minlength="30"></b-input>
          </b-field>

          <br />
          <b-field label="Deskripsi"></b-field>
          <div id="editor">
            <p>
              <strong>Lorem ipsum dolor sit amet</strong>
              , consectetur adipisicing elit. Asperiores facere rem nostrum
              molestiae. Minus, amet recusandae nam vel explicabo nisi error
              quaerat magnam excepturi veniam.
            </p>
          </div>
        </section>
      </b-step-item>
      <b-step-item label="Mentor" icon="account">
        <section>
          <br />
          <b-field label="Foto Mentor">
            <b-upload v-model="mentorpic">
              <a class="button is-primary is-fullwidth">
                <b-icon icon="upload"></b-icon>
                <span>{{ mentorpic.name || "Click to upload" }}</span>
              </a>
            </b-upload>
          </b-field>
          <b-field grouped>
            <b-field label="Name" expanded>
              <b-field>
                <b-select placeholder="Title">
                  <option>Mr</option>
                  <option>Mrs</option>
                </b-select>
                <b-input placeholder="Name" expanded></b-input>
              </b-field>
            </b-field>
            <b-field label="Konsultasi" expanded>
              <b-field>
                <b-select placeholder="Title">
                  <option>Telpon</option>
                  <option>Email</option>
                </b-select>
                <b-input placeholder="telp/email" expanded></b-input>
              </b-field>
            </b-field>
          </b-field>

          <br />
          <b-field grouped>
            <b-field label="Promo">
              <b-checkbox
                v-model="checkboxGroup"
                size="is-medium"
                native-value="Silver"
              >
                Slider Utama
              </b-checkbox>
              <b-checkbox
                v-model="checkboxGroup"
                size="is-medium"
                native-value="Flint"
              >
                Tampilan Utama
              </b-checkbox>
              <b-checkbox
                v-model="checkboxGroup"
                size="is-medium"
                native-value="Vane"
              >
                Slider Kategori
              </b-checkbox>
            </b-field>
            <b-field label="Harga" expanded>
              <p class="control">
                <b-button type="is-link" label="Rp." />
              </p>
              <b-input type="number" placeholder="0" expanded></b-input>
            </b-field>
          </b-field>
          <div class="block"></div>
          <br />
          <b-field label="Jenis Tag">
            <b-taginput maxtags="5" :value="['Barang']"></b-taginput>
          </b-field>
          <button type="submit" v-show="!updateSubmit">Tambah</button>
        </section>
      </b-step-item>
      <b-step-item label="Preview" icon="account-plus"></b-step-item>

    </b-steps>
 
  </form>
</template>

<script>
export default {
  data() {
    return {
      file: {},
      mentorpic: {},
    };
  },
};
</script>

 