<template>
  <div class="columns">
    <div class="column is-6 is-offset-3">
      <div class="columns is-multiline">
        <div class="column is-12">
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <router-link class="button" to="/account-type">
                  Kembali
                </router-link>
              </div>
            </div>

            <div class="level-right">
              <div class="level-item">
                <router-link class="button is-info" to="/account-type/1/edit">
                  Ubah Data
                </router-link>
              </div>
            </div>
          </nav>
        </div>

        <div class="column is-12">
          <div class="box is-shadowless has-text-justified">
            <div class="mb-4">
              <p class="heading">Deskripsi</p>
              <p class="title is-size-6">
                Nulla porttitor massa id neque aliquam vestibulum morbi blandit
                cursus risus at ultrices mi tempus imperdiet nulla malesuada
                pellentesque elit eget gravida cum sociis natoque penatibus et
                magnis dis parturient montes nascetur ridiculus mus mauris vitae
                ultricies leo integer malesuada nunc vel risus commodo viverra
                maecenas accumsan lacus vel facilisis
              </p>
            </div>

            <div class="mb-4">
              <p class="heading">Waktu Pembuatan</p>
              <p class="title is-size-6">31 Desember 2020, 20.20</p>
            </div>

            <div class="mb-4">
              <p class="heading">Waktu Pembuatan Terakhir</p>
              <p class="title is-size-6">31 Desember 2020, 20.20</p>
            </div>

            <div class="mb-4">
              <p class="heading">Tabel Suku Bunga</p>
              <p class="title is-size-6">
                Tabel Suku bunga
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./account-type-detail.js"></script>
