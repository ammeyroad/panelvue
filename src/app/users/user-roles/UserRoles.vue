<template>
  <div class="UserRoleLayout">
    <div class="UserRoleLayout-header">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h1 class="title is-3">
            Daftar Hak Akses Pengguna
            {{ user ? user.full_name : "" }}
          </h1>
        </div>
        <div class="column is-12">
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <router-link class="button" to="/users">
                  Kembali
                </router-link>
              </div>
            </div>

            <div class="level-right">
              <div class="level-item">
                <b-button @click="refreshData" :loading="isBusy" type="is-info">
                  Segarkan
                </b-button>
              </div>
              <div class="level-item">
                <b-button
                  @click="handleRoleCreate"
                  :loading="isBusy"
                  type="is-primary"
                >
                  Buat Hak Akses Baru
                </b-button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <div class="UserRoleLayout-body my-4">
      <UserRoleListTable
        :user="user"
        :loading="isBusy"
        :value="roles"
        @edit="handleRoleEdit"
        @remove="handleRoleRemove"
        editable
      />
    </div>

    <b-modal
      v-model="roleFormActive"
      has-modal-card
      trap-focus
      destroy-on-hide
      aria-role="dialog"
      aria-modal
    >
      <template #default="{ close }">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">{{ roleFormTitle }}</p>
            <button
              @click="close"
              type="button"
              class="delete"
              :disabled="isBusy"
            ></button>
          </header>
          <ValidationObserver v-slot="{ invalid }" slim>
            <section class="modal-card-body">
              <UserRoleForm
                :user="user"
                :roleBank="roleForm.roleBank"
                :roleType="roleForm.roleType"
                :validUntil="roleForm.validUntil"
                :edit="roleFormEdit"
                :excludedBanks="existingBanks"
                @processing="handleFormProcessing"
                @success="handleFormSuccess($event, close)"
                @error="handleFormError"
                ref="roleForm"
              />
            </section>
            <footer class="modal-card-foot">
              <b-button @click="close" :disabled="isBusy">
                Batal
              </b-button>
              <b-button
                @click="handleFormSubmit"
                type="is-primary"
                :disabled="invalid"
                :loading="isBusy"
              >
                Simpan
              </b-button>
            </footer>
          </ValidationObserver>
        </div>
      </template>
    </b-modal>

    <b-modal
      v-model="confirmModalActive"
      has-modal-card
      trap-focus
      destroy-on-hide
      aria-role="dialog"
      aria-modal
    >
      <template #default="{ close }">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ confirmModalTitle }}</p>
          <button
            @click="close"
            type="button"
            class="delete"
            :disabled="isBusy"
          ></button>
        </header>
        <section class="modal-card-body">
          <p>{{ confirmModalMessage }}</p>
        </section>
        <footer class="modal-card-foot">
          <b-button
            @click="handleConfirmation"
            type="is-primary"
            :loading="isBusy"
          >
            Ya
          </b-button>
          <button class="button" type="button" @click="close">
            Tidak
          </button>
        </footer>
      </template>
    </b-modal>
  </div>
</template>

<script src="./user-roles.js"></script>
