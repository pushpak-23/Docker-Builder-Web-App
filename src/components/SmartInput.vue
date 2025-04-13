<!-- components/SmartInput.vue -->
<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>

    <div v-if="type === 'select'" class="mt-1">
      <select
        v-model="localValue"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <div v-if="type === 'multi'" class="space-y-2">
      <div v-for="(item, index) in localValue" :key="index" class="flex gap-2">
        <input
          v-model="localValue[index]"
          class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          :placeholder="placeholder"
        />
        <button
          @click="localValue.splice(index, 1)"
          class="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
      <button
        @click="localValue.push('')"
        class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
      >
        + Add New
      </button>
    </div>

    <input
      v-if="type === 'text'"
      v-model="localValue"
      type="text"
      class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: [String, Array, Object],
  label: String,
  type: String,
  options: Array,
  placeholder: String,
});

const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
