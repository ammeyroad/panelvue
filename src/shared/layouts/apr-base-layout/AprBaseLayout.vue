<template>
  <div class="sidebar-page has-background-light">
    <section class="sidebar-layout">
      <aside class="hero has-background-white is-fullheight">
        <div class="sticky" style="border-radius: 10px">
          <b-sidebar
            position="static"
            expand-on-hover
            :reduce="reduce"
            type="is-white"
            open
          >
            <div
              class="p-0"
              style="
                border-radius: 0px 0px 10px 10px;
                border: 0px solid #234dba;
              "
            >
              <div
                style="
                  border-radius: 0px 0px 10px 0px;
                  background-color: #234dba;
                  padding: 10px;
                "
              >
                <img
                  img src="../../../../public/images/aprlogoputih.png">
                  
               
              </div>
              
              <br />
              <b-menu class="subtitle is-5 has-text-link" style="padding: 15px">
                <b-menu-list>
                  <b-menu-item
                    tag="router-link"
                    to="/home"
                    pack="uil"
                    icon="home"
                    label="Beranda"
                  ></b-menu-item>
                </b-menu-list>
                <hr />
                <b-menu-list>
                  <b-menu-item icon="lamp" label="Ide Bisnis">
                    <b-menu-item
                      tag="router-link"
                      to="/idedaftar"
                      pack="uil"
                      icon="table"
                      label="Daftar"
                    ></b-menu-item><b-menu-item
                      tag="router-link"
                      to="/ideform"
                      icon="plus"
                      label="Tambah"
                    ></b-menu-item>
                    
                  </b-menu-item>
                </b-menu-list>
                <b-menu-list>
                  <b-menu-item icon="pen" label="Pelatihan">
                    <b-menu-item
                      tag="router-link"
                      to="/pelatihandaftar"
                      pack="uil"
                      icon="table"
                      label="Daftar"
                    ></b-menu-item><b-menu-item
                      tag="router-link"
                      to="/pelatihanform"
                      icon="plus"
                      label="Tambah"
                    ></b-menu-item>
                    
                  </b-menu-item>
                </b-menu-list>
                <b-menu-list>
                  <b-menu-item icon="book" label="Artikel">
                  <b-menu-item
                      tag="router-link"
                      to="/discoverydaftar"
                      pack="uil"
                      icon="table"
                      label="Daftar"
                    ></b-menu-item><b-menu-item
                      tag="router-link"
                      to="/discoveryform"
                      icon="plus"
                      label="Tambah"
                    ></b-menu-item>
                    
                  </b-menu-item>
                </b-menu-list>
                <hr />
                <b-menu-list>
                  <b-menu-item
                    pack="uil"
                    icon="logout"
                    label="keluar"
                  ></b-menu-item>
                </b-menu-list>
              </b-menu>
            </div>
          </b-sidebar>
        </div>
      </aside>

      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child px-4">
            <nav
              class="level box has-background-white p-4 sticky"
              style="border-radius: 0px 0px 10px 10px; padding: 12px"
            >
              <div class="level-left">
                <div class="level-item">
                  <b-switch type="is-info"  size="is-small" v-model="reduce" />

                  <img
                    class="is-rounded"
                    src="../../../../public/images/aaa.png"
                    width="260"
                    alt="Placeholder image"
                  />
                </div>
              </div>
              <div class="level-right">
                <b-dropdown
                  position="is-bottom-left"
                  :triggers="['hover']"
                  aria-role="list"
                >
                  <template #trigger>
                    <figure class="image is-48x48">
                      <img
                        class="is-rounded"
                        src="../../../../public/images/img_avatar2.png"
                        width="48"
                        height="48"
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
            <div class="columns" style="padding: 20px 10px">
              <div class="columns is-multiline">
                <slot></slot>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reduce: false,
      activeTab: 0,
      checkboxGroup: [],
    };
  },
  components: {},
};
</script>

<style lang="scss">
.p-1 {
  padding: 1em;
}
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;

  .sidebar-layout {
    display: flex;
    flex-direction: row;
  }
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
.is-mini-expand {
  .menu-list a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.sticky {
  position: sticky;
  top: 0px;
  z-index: 2;
}

.bradius {
  border-radius: 10px;
}
@import "https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css";
@import "https://unicons.iconscout.com/release/v2.1.11/css/unicons.css";
</style>
