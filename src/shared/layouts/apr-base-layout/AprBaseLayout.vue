<template>

  <div>
    <div class="sidenav" style="padding: 15px">
      <b-image src="http://localhost:8080/images/logo.png"></b-image>
      <hr
        style="
          height: 1px;
          border-width: 0;
          color: blue;
          background-color: blue;
        "
      />

      <b-menu has-text-light>
        <b-menu-list label="">
          <apr-navbar />
          <b-menu-list label="">
           
            <b-menu-item icon="view-dashboard" label="HOME"></b-menu-item>
          </b-menu-list>

          <b-menu-item
            icon="lamp"
            :active="isActive"
            expanded
            style="
                  color: #fff;
                  font-color: #fff:
                  font-weight: bold;
                  border-radius: 6px;
                "
          >
            <template #label="props">
              IDE BISNIS
              <b-icon
                class="is-pulled-right"
                :icon="props.expanded ? 'menu-down' : 'menu-right'"
              ></b-icon>
            </template>
            <b-menu-item icon="account" label="Ide Bisnis"></b-menu-item>
            <b-menu-item icon="cash-multiple" label="Tambah Ide"></b-menu-item>
          </b-menu-item>

          <b-menu-item icon="speedometer" :active="isActive" expanded>
            <template #label="props">
              PELATIHAN
              <b-icon
                class="is-pulled-right"
                :icon="props.expanded ? 'menu-down' : 'menu-right'"
              ></b-icon>
            </template>
            <b-menu-item icon="apps" label="Dafar"></b-menu-item>
            <b-menu-item icon="plus" label="Tambah"></b-menu-item>
          </b-menu-item>
          <b-menu-item icon="cellphone-link" :active="isActive" expanded>
            <template #label="props">
              BERITA
              <b-icon
                class="is-pulled-right"
                :icon="props.expanded ? 'menu-down' : 'menu-right'"
              ></b-icon>
            </template>
            <b-menu-item icon="account" label="List Berita"></b-menu-item>
            <b-menu-item icon="cash-multiple" label="Tambah"></b-menu-item>
          </b-menu-item>
        </b-menu-list>
        <hr
          style="
            height: 1px;
            border-width: 0;
            color: blue;
            background-color: blue;
          "
        />
        <b-menu-list label="">
          <b-button icon="account" type="is-light" expanded>Keluar</b-button>
        </b-menu-list>
      </b-menu>
    </div>

    <div class="main">
      <div class="sticky" style="background-color: #f8f8f8;">
        <p></p>
        <div
          class="level has-background-link"
          style="padding: 10px 20px; border-radius: 10px"
        >
         <p>lalal</p>
        </div>
      </div>
      <br />
      <header class="is-clearfix">
        <div class="cats is-pulled-right has-text-right">
          <small>
            APR
            <br />
            Dashboard
            <br />
            <span class="has-text-weight-bold has-text-link">v.0.1</span>
          </small>
        </div>
        <div>
          <h2
            style="
              font-size: 24px;
              font-weight: 600;
              padding-bottom: 0.5rem;
              color: #234bda;
            "
          >
            PELATIHAN
          </h2>
          <small>Selamat Datang Kembali di Aplikasi Kami</small>
        </div>
        <hr
          style="
            height: 1px;
            border-width: 0;
            color: grey;
            background-color: grey;
          "
        />
      </header>
      <div class="columns">
        <div class="column is-9">
          <div class="box" style="border-radius: 10px">
           
          </div>
        </div>
        <div class="column is-3">
         
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./apr-base-layout.js"></script>
