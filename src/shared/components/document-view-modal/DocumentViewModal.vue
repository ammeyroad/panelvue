<template>
  <div class="modal-card">
    <div class="modalcard-head">
      <p class="modal-card-title">
        {{ filename }}
      </p>
    </div>
    <section class="modal-card-body">
      <div v-if="isImage" class="card-image">
        <figure class="image">
          <img :src="url" :alt="filename" />
        </figure>
      </div>
      <div v-else-if="isPdf" class="card-content">
        <div class="content">
          <object
            :data="url"
            type="application/pdf"
            width="100%"
            height="600"
            style="height: 85vh;"
          >
            <p>Peramban Anda tidak mendukung PDF!</p>
          </object>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "DocumentViewModal",

  props: {
    filename: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    mime: {
      type: String,
      required: false,
    },
  },

  computed: {
    isImage() {
      return this.mime && this.mime.startsWith("image/");
    },
    isPdf() {
      return this.mime && this.mime.startsWith("application/pdf");
    },
  },
};
</script>
