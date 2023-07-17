import DiscordGuildLayoutVue from "@/layouts/DiscordGuildLayout.vue";
import { useDiscordGuildStore } from "@/stores/discordGuild";
import { useErrorsStore } from "@/stores/errors";

import generalModule from "./modules/general";

import type { RouteRecordRaw } from "vue-router";

export const route: RouteRecordRaw = {
  path: "guilds/:guild_id/",
  meta: { layout: DiscordGuildLayoutVue, type: "discordGuild" },
  beforeEnter: async (to, from, next) => {
    const discordGuildStore = useDiscordGuildStore();

    const guild_id = to.params.guild_id as string;
    if (!guild_id) return next({ name: "discord_dashboard" });

    try {
      await discordGuildStore.loadGuild(guild_id);
      return next();
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        useErrorsStore().addError(
          `Something went wrong and we cannot load the guild: ${err.message}`
        );
      } else {
        useErrorsStore().addError(
          `Something went wrong and we cannot load the guild.`
        );
      }

      return next({ name: "discord_dashboard" });
    }
  },
  children: [
    {
      path: "",
      name: "DiscordDashboard",
      component: () => import("@/views/Discord/Guild/DashboardView.vue"),
    },
    generalModule,
  ],
};

export default route;
