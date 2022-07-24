import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";
import nProgress from "@/nprogress";

import { useUserStore } from "@/stores/user";

// Auto loaded views

import RootView from "@/views/RootView.vue";
import LoadingView from "@/views/LoadingView.vue";

// Lazy loaded views
const LoginView = () => import("@/views/LoginView.vue");
const RegiserView = () => import("@/views/RegisterView.vue");
const TelegramAuth = () => import("@/views/TelegramAuth.vue");
const DiscordAuth = () => import("@/views/DiscordAuth.vue");
const DashboardView = () => import("@/views/DashboardView.vue");
const DiscordBotAuthCallback = () =>
  import("@/views/DiscordBotAuthCallback.vue");

//Discord components
const DiscordDashboardView = () => import("@/views/Discord/DashboardView.vue");

export async function discordAuthenticated(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const { useUserStore } = await import("@/stores/user");
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
      meta: { noAuth: true },
    },
    {
      path: "/register",
      name: "register",
      component: RegiserView,
      meta: { noAuth: true },
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
      meta: { requiresAuth: true },
    },

    {
      path: "/discord",
      // beforeEnter: [authenticatedGuard, discordAuthenticated],
      meta: { requiresAuth: true },
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

router.beforeResolve(async (to, from, next) => {
  nProgress.inc();

  const userStore = useUserStore();

  if (to.meta.requiresAuth && !(await userStore.isAuthenticated())) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  } else if (to.meta.noAuth && (await userStore.isAuthenticated())) {
    // this route NO requires auth and needs to be protected from authenticated user,
    // check if logged in
    // if yes, redirect to previos page.
    return from;
  }

  nProgress.inc();
  next();
});

router.afterEach((to, from) => {
  nProgress.done();
});
export default router;
