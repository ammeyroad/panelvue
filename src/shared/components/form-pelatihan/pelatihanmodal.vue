<template>
  <section>
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      v-model="open"
     
    >
      <section style="padding: 20px; background-color: white">
        
        <form @submit.prevent="add">
          
            <br />
           
              <b-field grouped>
                <b-field label="Nomor Id" expanded>
                  <b-input placeholder="212" disabled></b-input>
                </b-field>
                <b-field  expanded>
                  <template #label>
                Label with custom <sm class="has-text-primary is-italic">style</sm>
            </template>
                  <b-button
                    @click="$refs.datepicker.toggle()"
                    icon-left="calendar-today"
                    type="is-primary"
                  />
                  <b-datepicker
                    ref="datepicker"
                    expanded
                    placeholder="Select a date"
                  ></b-datepicker>
                </b-field>
              </b-field>
              <br />
              <b-field grouped>
                <b-field label="Kategori" expanded>
                  <b-select placeholder="Select a character" expanded>
                    <option value="10jt">5-10 juta</option>
                    <option value="15jt">10-15 juta</option>
                    <option value="20jt">15-20 Juta</option>
                  </b-select>
                </b-field>
                <b-field label="Tag" expanded>
                  <b-taginput
                    type="is-info"
                    v-model="tags"
                    :data="filteredTags"
                    autocomplete
                    :allow-new="allowNew"
                    :open-on-focus="openOnFocus"
                    field="user.first_name"
                    icon="label"
                    placeholder="Add a tag"
                    @typing="getFilteredTags"
                  ></b-taginput>
                </b-field>
              </b-field>
              <br />
              <b-field grouped>
                <b-field label="Promo" expanded>
                  <div
                    class="block"
                    label="Push Promo"
                    message="This email is invalid"
                  >
                    <section class="b-tooltips">
                      <b-tooltip position="is-bottom" multilined>
                        <b-checkbox
                          v-model="checkboxGroup"
                          type="is-link"
                          native-value="Slider"
                        >
                          HOME SLIDER
                        </b-checkbox>
                        <template v-slot:content>
                          <p>
                            <img
                              src="https://buefy.org/static/img/buefy-light.7df103a.png"
                              width="101"
                              height="39"
                              alt=""
                              style="
                                display: block;
                                margin-left: auto;
                                margin-right: auto;
                              "
                            />
                          </p>
                          <p style="text-align: center">
                            bagian Home paling atas
                          </p>
                        </template>
                      </b-tooltip>

                      <b-tooltip position="is-top" multilined>
                        <b-checkbox
                          v-model="checkboxGroup"
                          type="is-link"
                          native-value="Section"
                        >
                          HOME SECTION
                        </b-checkbox>
                        <template v-slot:content>
                          <p>
                            <img
                              src="https://buefy.org/static/img/buefy-light.7df103a.png"
                              width="101"
                              height="39"
                              alt=""
                              style="
                                display: block;
                                margin-left: auto;
                                margin-right: auto;
                              "
                            />
                          </p>
                          <p style="text-align: center">
                            bagian Home paling atas
                          </p>
                        </template>
                      </b-tooltip>

                      <b-tooltip position="is-right" multilined>
                        <b-checkbox
                          v-model="checkboxGroup"
                          type="is-link"
                          native-value="Kategori"
                        >
                          KATEGORI SLIDER
                        </b-checkbox>
                        <template v-slot:content>
                          <p>
                            <img
                              src="https://buefy.org/static/img/buefy-light.7df103a.png"
                              width="101"
                              height="39"
                              alt=""
                              style="
                                display: block;
                                margin-left: auto;
                                margin-right: auto;
                              "
                            />
                          </p>
                          <p style="text-align: center">
                            bagian Home paling atas
                          </p>
                        </template>
                      </b-tooltip>
                    </section>
                  </div>
                </b-field>
              </b-field>
              <br />
              <b-field grouped>
                <b-field label="Upload Gambar" expanded>
                  <b-upload v-model="dropFiles" multiple drag-drop expanded>
                    <section class="section">
                      <div class="content has-text-centered">
                        <p>
                          <b-icon icon="upload" size="is-large"></b-icon>
                        </p>
                        <p>ukuran terbaik adalah 600x800</p>
                      </div>
                    </section>
                  </b-upload>
                </b-field>
              </b-field>
              <br />
              <b-field grouped>
                <b-field label="Judul" expanded>
                  <b-input placeholder="Judul Pelatihan" icon="pen"></b-input>
                </b-field>
              </b-field>
              <br />
              <b-field grouped label="Deskripsi">
                <div id="editor">
                  <p>
                    <strong>Lorem ipsum dolor sit amet</strong>
                    , consectetur adipisicing elit. Asperiores facere rem
                    nostrum molestiae. Minus, amet recusandae nam vel explicabo
                    nisi error quaerat magnam excepturi veniam.
                  </p>
                </div>
              </b-field>
              <br />
              <b-field grouped>
                <b-field label="Estimasi Modal" expanded>
                  <p class="control">
                    <b-button type="is-link" label="Rp." />
                  </p>
                  <b-input type="number" placeholder="0" expanded></b-input>
                </b-field>

                <b-field label="User" expanded>
                  <b-input placeholder="userpost" icon="account"></b-input>
                </b-field>
              </b-field>
           
        </form>
      </section>
      
    </b-sidebar>
    <div class="buttons">
      <b-button
        type="is-warning"
        size="is-small"
        @click="open = true"
        icon-right="pen"
      />
      <b-button
        type="is-danger"
        size="is-small"
        @click="open = true"
        icon-right="delete"
      />
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      file: {},
      checkboxGroup: [],
      tags: [],
      allowNew: true,
      open: false,
      overlay: true,
      fullheight: true,
      fullwidth: false,
      right: false,
    };
  },
};
</script>

<style>
.p-1 {
  padding: 1em;
}
</style>
