import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
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
];

export default routes;
