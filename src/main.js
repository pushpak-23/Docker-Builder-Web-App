import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// Import Prism.js and required languages
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // Default Prism.js theme
import "prismjs/components/prism-yaml"; // YAML syntax highlighting
import "prismjs/components/prism-docker"; // Dockerfile syntax highlighting

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
