<template>
  <transition name="fade">
    <div v-if="value" class="is-active modal">
      <div class="modal-background"></div>

      <div :style="{ width: state.validWidth }" class="modal-content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script src="./apr-modal.js"></script>
<style lang="scss" scoped src="./apr-modal.scss"></style>
