<template>
   <div class="block has-text-link">
            <template v-for="(page, index) in pages">
              <div
                v-if="page.children"
                :key="index"
                class="navbar-item is-arrowless has-dropdown is-hoverable"
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

          </div>
</template>

<script src="./apr-navbar.js"></script>

<style>
.navbar-brand {
  height: 70px;
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

