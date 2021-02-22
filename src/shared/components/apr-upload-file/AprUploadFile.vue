<template>
  <div class="field">
    <label
      v-if="isLabelExist"
      :class="{ 'has-text-danger': isErrorExist }"
      :for="id"
      class="label"
    >
      {{ label }}
      <RequiredLabel v-if="required" />
    </label>

    <div class="control">
      <input
        :class="{ 'is-danger': isErrorExist }"
        :data-max-files="validMaxFiles"
        :data-max-file-size="maxSize"
        :id="id"
        :multiple="isMultiple"
        :name="name"
        :required="required"
        class="filepond"
        type="file"
        @input="emit('input', $event.target.value)"
        @change="emit('change', $event)"
      />
    </div>

    <p v-if="isErrorExist" class="help is-danger">
      {{ errors[0] }}
    </p>
  </div>
</template>

<script src="./apr-upload-file.js"></script>
