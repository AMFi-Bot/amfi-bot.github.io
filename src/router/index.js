import { createRouter, createWebHistory } from "vue-router";

// Auto loaded views

import RootView from "../views/RootView.vue";

// Lazy loaded views
const LoginView = () => import("../views/LoginView.vue");
const RegiserView = () => import("../views/RegisterView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: RootView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegiserView,
    },
  ],
});

export default router;
