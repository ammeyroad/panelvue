<template>
  <div class="UserAuthLayout">
    <div class="UserAuthLayout-header">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h1 class="title is-3">
            Daftar Otentikasi Pengguna
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
                  @click="handleAuthCreate"
                  :loading="isBusy"
                  :disabled="!canCreateAuth"
                  type="is-primary"
                >
                  Buat Metode Otentikasi Baru
                </b-button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <div class="UserAuthLayout-body my-4">
      <UserAuthListTable
        :user="user"
        :loading="isBusy"
        :value="auths"
        @edit="handleAuthEdit"
        @remove="handleAuthRemove"
        @undo-update="handleAuthUndoUpdate"
        @validate="handleAuthValidate"
        editable
      ></UserAuthListTable>
    </div>

    <b-modal
      v-model="authFormActive"
      has-modal-card
      trap-focus
      destroy-on-hide
      aria-role="dialog"
      aria-modal
    >
      <template #default="{ close }">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">{{ authFormTitle }}</p>
            <button
              @click="close"
              type="button"
              class="delete"
              :disabled="isBusy"
            ></button>
          </header>
          <ValidationObserver v-slot="{ invalid }" slim>
            <section class="modal-card-body">
              <UserAuthForm
                :user="user"
                :authId="authForm.authId"
                :authType="authForm.authType"
                :edit="authFormEdit"
                :excludedAuthTypes="existingAuthTypes"
                @processing="handleFormProcessing"
                @success="handleFormSuccess($event, close)"
                @error="handleFormError"
                ref="authForm"
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
        <div class="modal-card">
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
              @click="handleConfirmation(close)"
              type="is-primary"
              :loading="isBusy"
            >
              Ya
            </b-button>
            <button class="button" type="button" @click="close">
              Tidak
            </button>
          </footer>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script src="./user-auths.js"></script>
