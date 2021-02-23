<template>
  <b-field
    :message="isErrorExist ? errors[0] : null"
    :type="isErrorExist ? 'is-danger' : null"
  >
    <template slot="label">
      {{ label }}
      <RequiredLabel v-if="required" />
    </template>
    <b-input
      @input="emit('input', $event)"
      :id="id"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      :disabled="disabled"
      :readonly="readonly && !disabled"
      :required="required"
      :name="name"
      size=""
    ></b-input>
  </b-field>
</template>

<script src="./apr-text-field.js"></script>
