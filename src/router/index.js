import { createRouter, createWebHistory } from "vue-router";
import BuilderView from "../views/BuilderView.vue";

const routes = [
  {
    path: "/",
    name: "builder",
    component: BuilderView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
