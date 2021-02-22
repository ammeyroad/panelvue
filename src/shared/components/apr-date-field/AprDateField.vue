<template>
  <b-field
    :message="isErrorExist ? errors[0] : null"
    :type="errors.length > 0 ? 'is-danger' : null"
  >
    <template slot="label">
      {{ label }}
      <RequiredLabel v-if="required" />
    </template>
    <b-datepicker
      @input="emit('input', $event)"
      :value="value"
      :disabled="disabled"
      :min-date="min"
      :max-date="max"
      :placeholder="placeholder"
      :locale="locale"
      :date-formatter="dateDisplayFormatter"
      icon="calendar-today"
      trap-focus
    >
      <button
        v-if="today"
        class="button is-primary"
        type="button"
        @click="$emit('input', new Date())"
      >
        <b-icon icon="calendar-today"></b-icon>
        <span>Hari Ini</span>
      </button>

      <button
        v-if="clearable"
        class="button is-danger"
        type="button"
        @click="$emit('input', null)"
      >
        <b-icon icon="close"></b-icon>
        <span>Bersihkan</span>
      </button>
    </b-datepicker>
  </b-field>
</template>

<script src="./apr-date-field.js"></script>
