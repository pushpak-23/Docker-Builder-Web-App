<script setup>
import { ref } from "vue";

const props = defineProps({
  items: Object,
  title: String,
});

const emit = defineEmits(["update:items"]);

const newKey = ref("");
const newValue = ref("");

function addItem() {
  if (newKey.value) {
    const updated = { ...props.items, [newKey.value]: newValue.value };
    emit("update:items", updated);
    newKey.value = "";
    newValue.value = "";
  }
}

function removeItem(key) {
  const { [key]: _, ...rest } = props.items;
  emit("update:items", rest);
}
</script>

<template>
  <div class="mb-6">
    <h3 class="text-lg font-medium mb-2">{{ title }}</h3>
    <div class="flex gap-2 mb-2">
      <input
        v-model="newKey"
        placeholder="Key"
        class="flex-1 px-2 py-1 border rounded"
      />
      <input
        v-model="newValue"
        placeholder="Value"
        class="flex-1 px-2 py-1 border rounded"
      />
      <button
        @click="addItem"
        class="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Add
      </button>
    </div>
    <div v-if="Object.keys(items).length" class="space-y-1">
      <div
        v-for="(value, key) in items"
        :key="key"
        class="flex items-center justify-between bg-gray-50 p-2 rounded"
      >
        <span class="font-mono text-sm"
          ><span class="text-indigo-600">{{ key }}</span
          >=<span class="text-emerald-600">{{ value }}</span></span
        >
        <button
          @click="removeItem(key)"
          class="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>
