<template>
  <div class="field">
    <label
      v-if="isLabelExist"
      :class="{ 'has-text-danger': isErrorExist }"
      :for="id"
      class="label"
    >
      {{ label }}
    </label>

    <div class="control">
      <textarea
        :class="{ 'is-danger': isErrorExist }"
        :id="id"
        :placeholder="placeholder"
        :style="{ resize }"
        :value="value"
        :rows="rows"
        :name="name"
        class="textarea"
        @input="emit('input', $event.target.value)"
      ></textarea>
    </div>

    <p v-if="isErrorExist" class="help is-danger">
      {{ errors[0] }}
    </p>
  </div>
</template>

<script src="./apr-textarea.js"></script>
