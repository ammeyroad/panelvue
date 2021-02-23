<template>
  <div class="sidenav" style="padding: 10px">
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
          <b-menu-list label="">
            <b-menu-item icon="view-dashboard" label="HOME"  tag="router-link" to="/home"></b-menu-item>
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
            <b-menu-item icon="account" label="Ide Bisnis" tag="router-link" to="/idebisnisdaftar"></b-menu-item>
            <b-menu-item icon="cash-multiple" label="Tambah Ide" tag="router-link" to="/idebisnistambah"></b-menu-item>
          </b-menu-item>

          <b-menu-item icon="speedometer" :active="isActive" expanded>
            <template #label="props">
              PELATIHAN
              <b-icon
                class="is-pulled-right"
                :icon="props.expanded ? 'menu-down' : 'menu-right'"
              ></b-icon>
            </template>
            <b-menu-item icon="apps" label="Dafar" tag="router-link" to="/pelatihandaftar"></b-menu-item>
            <b-menu-item icon="plus" label="Tambah" tag="router-link" to="/pelatihantambah"></b-menu-item>
          </b-menu-item>
          <b-menu-item icon="cellphone-link" :active="isActive" expanded>
            <template #label="props">
              BERITA
              <b-icon
                class="is-pulled-right"
                :icon="props.expanded ? 'menu-down' : 'menu-right'"
              ></b-icon>
            </template>
            <b-menu-item icon="account" label="List Berita" tag="router-link" to="/beritadaftar"></b-menu-item>
            <b-menu-item icon="cash-multiple" label="Tambah" tag="router-link" to="/beritatambah"></b-menu-item>
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
</template>

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
.sidenav {
  height: 100%;
  width: 230px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #ffffff;
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 14px;
  line-height: 1.6;

  color: #aa0202;
  display: block;
}

.sidenav a:hover {
  color: #234dba;
  font-weight: bold;
}

.main {
  margin-left: 230px; /* Same as the width of the sidenav */
  padding: 0px 40px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

.sticky {
  position: -webkit-sticky;
  position: sticky;

  z-index: 2;
  top: 20;
}
</style>