import { discordAuthenticated } from "@/router/middlewares/authenticationGuard";
import type { RouteRecordRaw } from "vue-router";

import discordGuildsRoute from "./guilds";

export const route: RouteRecordRaw = {
  path: "/discord",
  beforeEnter: [discordAuthenticated],
  meta: { requiresAuth: true },
  children: [
    {
      path: "dashboard",
      name: "discord_dashboard",
      component: import("@/views/Discord/DashboardView.vue"),
    },
    discordGuildsRoute,
  ],
};

export default route;
