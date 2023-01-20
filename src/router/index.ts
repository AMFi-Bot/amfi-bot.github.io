import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";
import nProgress from "nprogress";

import { useErrorsStore } from "@/stores/errors";
import { useUserStore } from "@/stores/user";

// Auto loaded views

import RootView from "@/views/RootView.vue";

// Lazy loaded views
const LoadingView = () => import("@/views/LoadingView.vue");
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
  if (
    (await userStore.isAuthenticated()) &&
    userStore.user.state == "discord"
  ) {
    return next();
  }
  next("/");
  useErrorsStore().addError("You are not authenticated with discord.");
}
export async function telegramAuthenticated(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userStore = useUserStore();
  if (
    (await userStore.isAuthenticated()) &&
    userStore.user.state == "telegram"
  ) {
    return next();
  }
  next("/");
  useErrorsStore().addError("You are not authenticated with telegram.");
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: RootView,
      meta: {
        layout: "DefaultLayout",
      },
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
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
      meta: { requiresAuth: true },
      redirect: () => {
        const userStore = useUserStore();
        if (userStore.user.state == "telegram") {
          return { name: "telegram_dashboard" };
        } else if (userStore.user.state == "discord") {
          return { name: "discord_dashboard" };
        } else {
          return { path: "/" };
        }
      },
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
          meta: {
            layout: "DefaultLayout",
          },
        },
        {
          path: "guilds/:guild_id/",
          meta: { layout: "DiscordGuildLayout" },
          beforeEnter: async (to, from, next) => {
            const { useDiscordGuildStore } = await import(
              "@/stores/discordGuild"
            );
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
    {
      path: "/telegram",
      beforeEnter: [telegramAuthenticated],
      meta: { requiresAuth: true },
      children: [
        {
          path: "dashboard",
          name: "telegram_dashboard",
          component: () => import("@/views/Telegram/TelegramDashboard.vue"),
          meta: { layout: "LoadingLayout" },
        },
      ],
    },
  ],
});

router.beforeResolve(async (to, from, next) => {
  nProgress.inc();

  if (
    to.meta.requiresAuth &&
    !(await (await useUserStore()).isAuthenticated())
  ) {
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
