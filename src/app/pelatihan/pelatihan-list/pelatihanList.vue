
<template>
  <div>
    <form @submit.prevent="add">
      <b-field label="id"><b-input  type="text" v-model="form.id" /></b-field>
      <b-input type="text" v-model="form.judul" />
      <b-input type="file" v-model="form.gambar" />
      <b-input type="text" v-model="form.tag" />
      <button type="submit" v-show="!updateSubmit">Tambah</button>
      <button type="button" v-show="updateSubmit" @click="update(form)">
        Update
      </button>
    </form>
    <ul v-for="user in users" :key="user.id">
      <li>
        <span>
          {{ user.id }} | {{ user.judul }} | {{ user.gambar }} | {{ user.tag }}
        </span>
        &#160;
        <button @click="edit(user)">Edit</button>
        ||
        <button @click="del(user)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      file: {},
      checkboxGroup: [],
      tags: [],
      form: {
        id: "",
        judul: "",
        gambar: "",
        tag: "",
      },
      users: "",
      updateSubmit: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      axios
        .get("http://34.87.110.181/APR/AprIde/readAll")
        .then(res => {
          this.users = res.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    add() {
      axios.post("https://sheetdb.io/api/v1/y06kd2tyjoxaf", this.form).then(res => {
        this.load();
        this.form.id = "";
        this.form.judul = "";
        this.form.gambar = "";
        this.form.tag = "";
      });
    },
    edit(user) {
      this.updateSubmit = true;
      this.form.id = user.id;
      this.form.judul = user.judul;
      this.form.gambar = user.gambar;
      this.form.tag = user.tag;
    },
    update(form) {
      return axios
        .put("http://localhost:3000/users/" + form.id, {judul: this.form.judul, gambar: this.form.gambar, tag: this.form.tag})
        .then(res => {
          this.load();
          this.form.id = "";
          this.form.judul = "";
          this.form.gambar = "";
          this.form.tag = "";
          this.updateSubmit = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    del(user) {
      axios.delete("http://localhost:3000/users/" + user.id).then(res => {
        this.load();
        let index = this.users.indexOf(form.judul);
        this.users.splice(index, 1);
      });
    },
  },
};
</script>