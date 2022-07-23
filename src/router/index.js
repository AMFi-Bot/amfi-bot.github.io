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
const DiscordBotAuthCallback = () =>
  import("../views/DiscordBotAuthCallback.vue");

//Discord components
const DiscordDashboardView = () => import("../views/Discord/DashboardView.vue");

export async function isAuthenticated(from) {
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

export async function discordAuthenticated(to, from, next) {
  const { useUserStore } = await import("../stores/user");
  const userStore = useUserStore();

  if (userStore && userStore.logged && userStore.discord_id) {
    next();
  }

  next(from);
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
      path: import.meta.env.VITE_DISCORD_BOT_CALLBACK_URL,
      name: "discord_bot_auth",
      component: DiscordBotAuthCallback,
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

    {
      path: "/discord",
      beforeEnter: [authenticatedGuard, discordAuthenticated],
      children: [
        {
          path: "dashboard",
          name: "discord_dashboard",
          component: DiscordDashboardView,
        },
        {
          path: "guilds/{id}",
          component: DiscordDashboardView,
        },
      ],
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
