import { createRouter, createWebHistory } from "vue-router";
import nProgress from "nprogress";

import { useUserStore } from "@/stores/user";

import {
  authenticated,
  discordAuthenticated,
  telegramAuthenticated,
} from "./middlewares/authenticationGuard";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: import("@/views/RootView.vue"),
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },

    {
      path: "/login_callback",
      name: "login_callback",
      component: import("@/views/LoginCallback.vue"),
      meta: {
        layout: "LoadingLayout",
      },
    },
    {
      path: "/discord_bot_callback",
      name: "discord_bot_auth",
      component: import("@/views/DiscordBotAuthCallback.vue"),
      meta: {
        layout: "LoadingLayout",
      },
    },

    {
      path: "/loading",
      name: "loading",
      component: import("@/views/LoadingView.vue"),
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
          component: import("@/views/Discord/DashboardView.vue"),
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
        },
      ],
    },
  ],
});

router.beforeResolve(authenticated);

router.afterEach(() => {
  nProgress.done();
});

export default router;
