import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";
import nProgress from "@/nprogress";

import { useUserStore } from "@/stores/user";
import { useErrorsStore } from "@/stores/errors";

// Auto loaded views

import RootView from "@/views/RootView.vue";
import LoadingView from "@/views/LoadingView.vue";
import { useDiscordGuildStore } from "@/stores/discordGuild";

// Lazy loaded views
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
  const userStore = useUserStore();
  if ((await userStore.isAuthenticated()) && userStore.user?.discordUser) {
    return next();
  }
  next("/");
  useErrorsStore().addError("You are not authenticated with discord.");
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
      path: "/telegram_callback",
      name: "telegram_auth",
      component: TelegramAuth,
      meta: {
        layout: "LoadingLayout",
      },
    },
    {
      path: "/discord_callback",
      name: "discord_auth",
      component: DiscordAuth,
      meta: {
        layout: "LoadingLayout",
      },
    },
    {
      path: "/discord_bot_callback",
      name: "discord_bot_auth",
      component: DiscordBotAuthCallback,
      meta: {
        layout: "LoadingLayout",
      },
    },

    {
      path: "/loading",
      name: "loading",
      component: LoadingView,
      meta: {
        layout: "LoadingLayout",
      },
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: { requiresAuth: true },
    },

    {
      path: "/discord",
      beforeEnter: [discordAuthenticated],
      meta: { requiresAuth: true },
      children: [
        {
          path: "dashboard",
          name: "discord_dashboard",
          component: DiscordDashboardView,
        },
        {
          path: "guilds/:guild_id/",
          meta: { layout: "DiscordGuildLayout" },
          beforeEnter: async (to, from, next) => {
            const discordGuildStore = useDiscordGuildStore();

            const guild_id = <string>to.params.guild_id;
            if (!guild_id) return next({ name: "discord_dashboard" });

            if (!(await discordGuildStore.getGuild(guild_id)))
              return next({ name: "discord_dashboard" });

            return next();
          },
          children: [
            {
              path: "",
              redirect: {
                name: "DiscordDashboard",
              },
            },
            {
              path: "dashboard",
              name: "DiscordDashboard",
              component: () =>
                import("@/views/Discord/Guild/DashboardView.vue"),
            },
            {
              path: "general",
              name: "DiscordGuildGeneral",
              component: () => import("@/views/Discord/Guild/GeneralView.vue"),
            },
            {
              path: "moderation",
              name: "DiscordGuildModeration",
              component: () =>
                import("@/views/Discord/Guild/DashboardView.vue"),
            },
            {
              path: "automoderation",
              name: "DiscordGuildAutomoderation",
              component: () =>
                import("@/views/Discord/Guild/DashboardView.vue"),
            },
            {
              path: "commands",
              name: "DiscordGuildCommands",
              component: () =>
                import("@/views/Discord/Guild/DashboardView.vue"),
            },
            {
              path: "features",
              name: "DiscordGuildFeatures",
              component: () =>
                import("@/views/Discord/Guild/DashboardView.vue"),
            },
          ],
        },
      ],
    },
  ],
});

router.beforeResolve(async (to, from, next) => {
  nProgress.inc();

  const userStore = useUserStore();

  if (to.meta.requiresAuth && !(await userStore.isAuthenticated())) {
    return {
      path: "/",
    };
  }

  nProgress.inc();
  next();
});

router.afterEach(() => {
  nProgress.done();
});
export default router;
