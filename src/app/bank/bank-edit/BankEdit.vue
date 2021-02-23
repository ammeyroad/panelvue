<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <div class="is-clearfix">
        <div class="cats is-pulled-right has-text-right">
          <small>
            <router-link class="button is-link is-light mr-2" to="/banks">
              kembali
            </router-link>
            <br />
          </small>
        </div>
        <div>
          <h2>UBAH DATA BAK</h2>
          <small>Deskripsi Singkat Halamananya</small>
        </div>
        <hr />
      </div>
    </div>

    <div class="column is-6">
      <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
        <form @submit.prevent="handleSubmit(submitForm)" ref="form">
           <section>
        <b-field>
            <b-input placeholder="Email" type="email"></b-input>
        </b-field>

        <b-field>
            <b-input placeholder="Number" :use-html5-validation="false"
                type="number"
                min="10"
                max="20">
            </b-input>
        </b-field>

        <b-field>
            <b-input placeholder="User handle (custom validation for only lowercase)"
              type="text"
              required useHtml5Validation="false"
              validation-message="Only lowercase is allowed"
              pattern="[a-z]*">
            </b-input>
        </b-field>

        <b-field>
            <b-input placeholder="URL" type="url"></b-input>
        </b-field>

        <b-field>
            <b-input type="textarea"
                minlength="10"
                maxlength="100"
                placeholder="Maxlength automatically counts characters">
            </b-input>
        </b-field>
    </section>
        </form>
      </ValidationObserver>
    </div>

    
  </div>
</template>

<script src="./bank-edit.js"></script>
<style lang="scss" scoped src="C:\Users\Admin\Desktop\APR\DEKSTOP\fase satu\apr-frontend-master\src\shared\layouts\apr-base-layout\mainbase.scss"></style>

