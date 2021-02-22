<template>
  <div class="UserLayout">
    <div class="UserLayout-header">
      <div class="level">
        <div class="level-left">
          <h1 class="title is-1">Daftar Pengguna</h1>
        </div>
      </div>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <router-link
              v-if="canCreateUser"
              class="button is-info"
              to="/users/create"
            >
              Buat Pengguna Baru
            </router-link>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <AprSelect
              v-model="search.defaultRole"
              :items="roles"
              id="SelectRole"
              withoutAll
            ></AprSelect>
          </div>
          <div class="level-item">
            <AprTextField
              v-model="search.filter"
              id="TxtUserName"
              placeholder="Nama User"
            ></AprTextField>
          </div>

          <div class="level-item">
            <button class="button" @click="refreshData">Cari</button>
          </div>
        </div>
      </nav>
    </div>

    <div class="UserLayout-body mt-4">
      <UserListTable
        @delete="confirmDeleteUser"
        :value="data"
        :editable="canEditUser"
        :loading="isBusy"
      ></UserListTable>
    </div>

    <div class="UserLayout-footer mt-4">
      <AprPagination
        :meta="meta"
        @next="handlePageChanged"
        @previous="handlePageChanged"
      />
    </div>
  </div>
</template>

<script src="./users-list.js"></script>
<style lang="scss" scoped src="./users-list.scss"></style>
