import { useDiscordGuildStore } from "@/stores/discordGuild";
import type { RouteRecordRaw } from "vue-router";

export const route: RouteRecordRaw = {
  path: "guilds/:guild_id/",
  meta: { layout: "DiscordGuildLayout" },
  beforeEnter: async (to, from, next) => {
    const discordGuildStore = useDiscordGuildStore();

    const guild_id = to.params.guild_id as string;
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
      component: () => import("@/views/Discord/Guild/DashboardView.vue"),
    },
    {
      path: "general",
      name: "DiscordGuildGeneral",
      component: () => import("@/views/Discord/Guild/GeneralView.vue"),
    },
    {
      path: "moderation",
      name: "DiscordGuildModeration",
      component: () => import("@/views/Discord/Guild/DashboardView.vue"),
    },
    {
      path: "automoderation",
      name: "DiscordGuildAutomoderation",
      component: () => import("@/views/Discord/Guild/DashboardView.vue"),
    },
    {
      path: "commands",
      name: "DiscordGuildCommands",
      component: () => import("@/views/Discord/Guild/DashboardView.vue"),
    },
    {
      path: "features",
      name: "DiscordGuildFeatures",
      component: () => import("@/views/Discord/Guild/DashboardView.vue"),
    },
  ],
};

export default route;
