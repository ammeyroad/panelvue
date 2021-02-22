<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <router-link class="button" to="/customers">
              Kembali
            </router-link>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <router-link class="button is-info" to="/customers/1/edit">
              Ubah Data
            </router-link>
          </div>
        </div>
      </nav>
    </div>

    <div class="column is-3">
      <div class="box is-shadowless CustomerDetail-sidebar">
        <div class="has-text-centered mb-5">
          <figure class="image is-128x128 is-inline-block">
            <img
              class="is-rounded"
              src="https://bulma.io/images/placeholders/128x128.png"
            />
          </figure>
        </div>

        <div class="mb-4">
          <p class="heading">Nama</p>
          <p class="title is-size-6">Nama Lengkap Anda</p>
        </div>

        <div class="mb-4">
          <p class="heading">No. Identitas</p>
          <p class="title is-size-6">1234123412341234</p>
        </div>

        <div class="mb-4">
          <p class="heading">Tanggal Lahir</p>
          <p class="title is-size-6">31 Desember 2020</p>
        </div>

        <div class="mb-4">
          <p class="heading">Alamat</p>
          <p class="title is-size-6">
            Jl. In aja dulu, Blok A, No. 1, DKI Jakarta
          </p>
        </div>

        <div class="mb-4">
          <p class="heading">Jenis Kelamin</p>
          <p class="title is-size-6">Laki-laki</p>
        </div>

        <div class="mb-4">
          <p class="heading">No. Handphone</p>
          <p class="title is-size-6">0812321321</p>
        </div>

        <div>
          <p class="heading">Email</p>
          <p class="title is-size-6">email@mail.com</p>
        </div>
      </div>
    </div>

    <div class="column is-9">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="card is-shadowless">
            <div class="card-header">
              <div class="card-header-title">Data Pendapatan</div>
            </div>

            <div class="card-content">
              <div class="content">
                <div class="columns is-multiline">
                  <div class="column is-4">
                    <p class="heading">Pekerjaan</p>
                    <p class="title is-size-5">Karyawan Swasta</p>
                  </div>

                  <div class="column is-4">
                    <p class="heading">Pendapatan</p>
                    <p class="title is-size-5">Gaji</p>
                  </div>

                  <div class="column is-4">
                    <p class="heading">Jaminan</p>
                    <p class="title is-size-5">BKPB Kendaraan</p>
                  </div>

                  <div class="column is-4">
                    <p class="heading">No. Telepon</p>
                    <p class="title is-size-5">02112345678</p>
                  </div>

                  <div class="column is-4">
                    <p class="heading">Pekerjaan</p>
                    <p class="title is-size-5">Karyawan Swasta</p>
                  </div>

                  <div class="column is-12">
                    <p class="heading">Alamat Kantor</p>
                    <p class="title is-size-5">Jl. In saja dulu, DKI Jakarta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-12">
          <div class="card is-shadowless">
            <div class="card-header">
              <div class="card-header-title">Data Pembukaan Rekening</div>
            </div>

            <div class="card-content">
              <div class="content">
                <div class="columns is-multiline">
                  <div class="column is-4">
                    <div>
                      <p class="heading">Nama Produk</p>
                      <p class="title is-size-5">Tabungan/Deposito</p>
                    </div>
                  </div>

                  <div class="column is-4">
                    <div>
                      <p class="heading">Mata Uang</p>
                      <p class="title is-size-5">Rupiah</p>
                    </div>
                  </div>

                  <div class="column is-12">
                    <div>
                      <p class="heading">Tabel Suku Bunga</p>
                      <p class="title is-size-5">Nanti isinya tabel?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-12">
          <div class="card is-shadowless">
            <div class="card-header">
              <div class="card-header-title">Dokumen Pendukung</div>
            </div>

            <div class="card-content">
              <div class="content">
                <div class="columns is-multiline">
                  <div class="column is-4">
                    <p class="heading">Foto Pribadi</p>

                    <a
                      class="title is-size-5 has-text-link"
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat
                    </a>
                  </div>

                  <div class="column is-4">
                    <p class="heading">Dokumen Jaminan</p>

                    <a
                      class="title is-size-5 has-text-link"
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat
                    </a>
                  </div>

                  <div class="column is-4">
                    <p class="heading">Foto Konfirmasi</p>

                    <a
                      class="title is-size-5 has-text-link"
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat
                    </a>
                  </div>

                  <div class="column is-4">
                    <p class="heading">BPKB Kendaraan</p>

                    <a
                      class="title is-size-5 has-text-link"
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat
                    </a>
                  </div>

                  <div class="column is-4">
                    <p class="heading">Kartu Keluarga</p>

                    <a
                      class="title is-size-5 has-text-link"
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat
                    </a>
                  </div>

                  <div class="column is-4">
                    <p class="heading">Dokumen Lainnya</p>

                    <a
                      class="title is-size-5 has-text-link"
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./customer-detail.js"></script>
<style lang="scss" scoped src="./customer-detail.scss"></style>
