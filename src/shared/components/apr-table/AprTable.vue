<template>
  <div class=" table
          is-hoverable">
    <table class=" table
          is-hoverable is-striped">
      <thead>
        <slot name="header"></slot>
      </thead>

      <tbody>
        <slot name="body"></slot>
      </tbody>
    </table>
  </div>
</template>

<script src="./apr-table.js"></script>
<style lang="scss" scoped src="./apr-table.scss"></style>
