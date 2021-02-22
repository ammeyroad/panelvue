<template>
  <AprPlainLayout :background-image="backgroundImage">
    <section class="hero is-fullheight" style="border-radius: 20px;">
      <div class="hero-body " >
        <div class="container" >
          <div class="card pl-4 pb-4" style="background-color:  rgba(255, 255, 255, 0.87); border-radius: 14px; border-left-style: solid;
  border-left-color: #234dba;
  border-left-width: 14px;">
            <div class="card-content">
              <div class="container">

                 <div class="column is-12">
                   <figure>
                  <img
                    src="http://localhost:8080/images/logo.png"
                    width="306"
                   
                    alt=""
                  />
                </figure>
                <p class="title is-4" style="margin-top:100px">Selamat Datang</p>
                <p class="subtitle is-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec iaculis mauris.h
                </p>

                 </div>
                
              </div>

              <div class="container">
                <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
                  <form @submit.prevent="handleSubmit(submitForm)">
                    <div class="column is-12">
                      <div class="columns is-multiline">
                        <div class="column is-6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            rules="required"
                            name="Email atau no. handphone"
                          >
                            <AprTextField
                              v-model="username"
                              :errors="errors"
                              :disabled="isBusy"
                              id="TxtUsername"
                              label="Email atau No. Handphone"
                              placeholder="Masukkan email atau no. handphone"
                            ></AprTextField>
                          </ValidationProvider>
                        </div>

                        <div class="column is-6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            rules="required"
                            name="Kata sandi"
                          >
                            <AprTextField
                              v-model="password"
                              :errors="errors"
                              :disabled="isBusy"
                              id="TxtPassword"
                              label="Kata Sandi"
                              class="passowrd is-large"
                              placeholder="Masukkan kata sandi"
                              type="password"
                            ></AprTextField>
                          </ValidationProvider>
                        </div>

                        <div class="column is-4">
                          <button
                            :disabled="isBusy"
                            id="BtnLoginSubmit"
                            class="button is-link is-medium is-fullwidth"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </ValidationObserver>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </AprPlainLayout>
</template>

<script src="./login.js"></script>
