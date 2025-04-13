<script setup>
import { useDockerStore } from "../store";
import { storeToRefs } from "pinia";
import InputField from "../components/InputField.vue";
import KeyValueInput from "../components/KeyValueInput.vue";
import FilePreview from "../components/FilePreview.vue";

const store = useDockerStore();
const {
  selectedOutputs,
  baseImage,
  exposedPorts,
  environmentVariables,
  buildContext,
  generatedDockerfile,
  generatedCompose,
} = storeToRefs(store);
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8">Docker Configuration Builder</h1>

    <div class="grid md:grid-cols-2 gap-8">
      <div class="space-y-6">
        <!-- Configuration Section -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <InputField label="Base Image" v-model="baseImage" />
          <InputField label="Build Context" v-model="buildContext" />

          <KeyValueInput
            title="Environment Variables"
            :items="environmentVariables"
            @update:items="
              (val) => store.updateConfig({ environmentVariables: val })
            "
          />
        </div>
      </div>

      <!-- Preview Section -->
      <div class="space-y-6">
        <div
          v-if="selectedOutputs.includes('Dockerfile')"
          class="bg-gray-900 p-4 rounded-lg"
        >
          <h2 class="text-white text-lg mb-2">Dockerfile Preview</h2>
          <FilePreview :content="generatedDockerfile" />
        </div>

        <div
          v-if="selectedOutputs.includes('docker-compose')"
          class="bg-gray-900 p-4 rounded-lg"
        >
          <h2 class="text-white text-lg mb-2">docker-compose.yml Preview</h2>
          <FilePreview :content="generatedCompose" language="yaml" />
        </div>
      </div>
    </div>
  </div>
</template>
