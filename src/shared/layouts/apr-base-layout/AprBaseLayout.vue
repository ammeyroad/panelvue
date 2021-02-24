<template>
  <div class="columns has-background-light">
    <div
      class="column has-background-info fullheight is-1 pl-4 sticky"
      style="width: 150px; padding: 10px"
    >
      <div class="sticky">
        
          <div>
            <p style="padding: 10px 14px">
              <img
                src="../../../../public/images/aprlogoputih.png"
                width="150px"
                alt=""
              />
            </p>
            
            <hr style="height:1px;border-width:0;color:gray;background-color:#234dba">
            <div class="buttons">
              <b-button tag="router-link"
                to="/home" label="Beranda" type="is-info" icon-left="home" />
            </div>
            <div class="buttons">
              <b-button tag="router-link"
                to="/idedaftar" label="Ide Bisnis" type="is-info" icon-left="lamp" />
              <b-button
              tag="router-link"
                to="/pelatihandaftar"
                label="Pelatihan"
                type="is-info"
                icon-left="view-dashboard"
              />
              <b-button  tag="router-link"
                to="/discoverydaftar" label="Discover" type="is-info" icon-left="book" />
            </div>
          </div><hr style="height:1px;border-width:0;color:gray;background-color:#234dba">
          <div class="buttons">
           
            <b-button  tag="router-link"
                to="/login" label="Keluar" type="is-info" icon-left="logout" />
          </div>
       
      </div>
      <div></div>
    </div>
    <div class="column px-6">
      <nav
        class="level has-background-light sticky"
        style="border-radius: 0px 0px 10px 10px; padding: 10px"
      >
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <strong class="has-text-info">APR ADMIN</strong>
              Panel
            </p>
          </div>
        </div>
        <div class="level-right">
          
          <b-dropdown
            v-model="navigation"
            position="is-bottom-left"
            :triggers="['hover']"
            aria-role="list"
          >
            <template #trigger>
              <figure class="image is-48x48">
                <img
                  class="is-rounded"
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </template>

            <b-dropdown-item custom aria-role="listitem">
              <b>Rafael Beraldo</b>
            </b-dropdown-item>
            <hr class="dropdown-divider" aria-role="listitem" />
            <b-dropdown-item value="settings">
              <b-icon icon="book-open"></b-icon>
              Settings
            </b-dropdown-item>
            <b-dropdown-item value="logout" aria-role="listitem">
              <b-icon icon="logout"></b-icon>
              Logout
            </b-dropdown-item>
          </b-dropdown>
        </div>
        
      </nav>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
.sticky {
  position: sticky;
  top: 0px;
  z-index: 2;
}
</style>
