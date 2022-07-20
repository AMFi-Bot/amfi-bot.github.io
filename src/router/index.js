import { createRouter, createWebHistory } from "vue-router";
import nProgress from "../nProgress";

// Auto loaded views

import RootView from "../views/RootView.vue";
import LoadingView from "../views/LoadingView.vue";

// Lazy loaded views
const LoginView = () => import("../views/LoginView.vue");
const RegiserView = () => import("../views/RegisterView.vue");
const TelegramAuth = () => import("../views/TelegramAuth.vue");
const DiscordAuth = () => import("../views/DiscordAuth.vue");
const DashboardView = () => import("../views/DashboardView.vue");

export async function isAuthenticated() {
  const { useUserStore } = await import("../stores/user");
  const userStore = useUserStore();

  nProgress.inc();

  // User not loaded. Trying load User
  if (userStore.user.logged) {
    return true;
  } else {
    nProgress.inc();

    const user = await userStore.loadUser();

    nProgress.inc();

    if (user) return true;
  }

  return false;
}

export async function authenticatedGuard(to, from, next) {
  return (await isAuthenticated()) ? next() : next(from);
}

export async function noAuthenticatedGuard(to, from, next) {
  return !(await isAuthenticated()) ? next() : next(from);
}

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
      beforeEnter: noAuthenticatedGuard,
    },
    {
      path: "/register",
      name: "register",
      component: RegiserView,
      beforeEnter: noAuthenticatedGuard,
    },
    {
      path: import.meta.env.VITE_TELEGRAM_REDIRECT_URL,
      name: "telegram_auth",
      component: TelegramAuth,
    },
    {
      path: import.meta.env.VITE_DISCORD_CALLBACK_URL,
      name: "discord_auth",
      component: DiscordAuth,
    },
    {
      path: "/loading",
      name: "loading",
      component: LoadingView,
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      beforeEnter: authenticatedGuard,
    },
  ],
});

router.beforeResolve((to, from, next) => {
  nProgress.inc();
  next();
});

router.afterEach((to, from) => {
  nProgress.done();
});
export default router;
