<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <div class="is-clearfix">
        <div class="cats is-pulled-right has-text-right">
          <small>
            <router-link class="button is-link is-light mr-2" to="/banks">
              kembali
            </router-link>
            <router-link class="button is-link" :to="`/banks/${id}/edit`">
              Ubah Data
            </router-link>
            <br />
          </small>
        </div>
        <div>
          <h2>Judul</h2>
          <small>Deskripsi Singkat Halamananya</small>
        </div>
        <hr />
      </div>
    </div>

    <div class="column is-3">
     
    </div>

    <div class="column is-9">
      
    </div>

     <div class="box">
      <img class="card-img-top" src="holder.js/100x180/" alt="">
      <div class="card-body">
        <h4 class="card-title">Title</h4>
        <p class="card-text">Text</p>
      </div>
  </div>
</template>
