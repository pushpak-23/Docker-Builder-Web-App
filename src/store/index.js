import { defineStore } from "pinia";

export const useDockerStore = defineStore("docker", {
  state: () => ({
    selectedOutputs: ["Dockerfile", "docker-compose"],
    baseImage: "node:latest",
    exposedPorts: [],
    volumes: [],
    environmentVariables: {},
    networks: ["bridge"],
    buildContext: ".",
    customCommands: [],
  }),
  actions: {
    updateConfig(payload) {
      Object.keys(payload).forEach((key) => {
        this[key] = payload[key];
      });
    },
  },
  getters: {
    generatedDockerfile: (state) => {
      return (
        `FROM ${state.baseImage}\n` +
        (state.exposedPorts.length
          ? `EXPOSE ${state.exposedPorts.join(" ")}\n`
          : "") +
        Object.entries(state.environmentVariables)
          .map(([key, value]) => `ENV ${key}=${value}`)
          .join("\n")
      );
    },
    generatedCompose: (state) => {
      return (
        `version: '3'\nservices:\n  app:\n` +
        `    build: ${state.buildContext}\n` +
        `    ports:\n` +
        state.exposedPorts.map((port) => `      - "${port}:${port}"`).join("\n")
      );
    },
  },
});
