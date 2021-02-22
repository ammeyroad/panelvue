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
      <div
        :class="{ 'is-danger': isErrorExist, 'is-fullwidth': isFullWidth }"
        class="select"
      >
        <select
          :id="id"
          @change="selectOption($event.target.value)"
          :disabled="disabled"
          :required="required"
        >
          <option v-if="!withoutAll" value="" disabled selected>
            {{ placeholder }}
          </option>
          <option
            v-for="(item, key) in items"
            :key="key"
            :selected="isSelected(item.value)"
            :value="item.value"
          >
            {{ item.text }}
          </option>
        </select>
      </div>
    </div>

    <p v-if="isErrorExist" class="help is-danger">{{ errors[0] }}</p>
  </div>
</template>

<script src="./apr-select.js"></script>
