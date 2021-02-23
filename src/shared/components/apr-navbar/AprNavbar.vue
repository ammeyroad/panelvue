<template>
  <div class="">
    <template v-for="(page, index) in pages">
      <div
        v-if="page.children"
        :key="index"
        class="navbar-item has-dropdown "
      >
        <router-link
          v-if="page.link"
          :to="page.link"
          class="navbar-link"
          active-class="is-active"
        >
          {{ page.name }}
        </router-link>
        <a v-else href="#" class="navbar-link">
          {{ page.name }}
        </a>

        <div class="navbar-dropdown is-right">
          <router-link
            v-for="(childPage, childIndex) in page.children"
            :key="`${index}-${childIndex}`"
            :to="childPage.link"
            active-class="is-active"
            class="navbar-item"
          >
            {{ childPage.name }}
          </router-link>
        </div>
      </div>
      <router-link
        v-else
        :key="index"
        :to="page.link"
        active-class="is-active"
        class="navbar-item"
      >
        {{ page.name }}
      </router-link>
    </template>

    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link is-arrowless">
        <figure class="image is-24x24">
          <img
            class="is-rounded"
            src="https://bulma.io/images/placeholders/24x24.png"
          />
        </figure>
      </a>

      <div class="navbar-dropdown is-right">
        <a @click="handleChangePassword" class="navbar-item">Ubah Password</a>
        <hr class="navbar-divider" />
        <a @click.prevent="handleLogout" class="navbar-item">Keluar</a>
      </div>
    </div>
  </div>
</template>

<script src="./apr-navbar.js"></script>
