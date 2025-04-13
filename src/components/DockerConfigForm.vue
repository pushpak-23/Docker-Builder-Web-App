<!-- components/DockerConfigForm.vue -->
<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        Base Configuration
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SmartInput
          label="Base Image"
          type="select"
          :options="[
            'node:latest',
            'python:3.9',
            'nginx:alpine',
            'postgres:15',
          ]"
          v-model="store.config.baseImage"
        />
        <SmartInput
          label="Build Context"
          type="text"
          v-model="store.config.buildContext"
        />
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Ports & Volumes</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SmartInput
          label="Expose Ports"
          type="multi"
          v-model="store.config.ports"
          placeholder="Add port (e.g. 3000)"
        />
        <SmartInput
          label="Volumes"
          type="multi"
          v-model="store.config.volumes"
          placeholder="Add volume (e.g. /app/data)"
        />
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        Environment & Commands
      </h3>
      <div class="space-y-4">
        <SmartInput
          label="Environment Variables"
          type="key-value"
          v-model="store.config.environment"
        />
        <SmartInput
          label="Command"
          type="text"
          v-model="store.config.command"
          placeholder="npm start"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDockerStore } from "../store
import SmartInput from "./SmartInput.vue";

const store = useDockerStore();
</script>
