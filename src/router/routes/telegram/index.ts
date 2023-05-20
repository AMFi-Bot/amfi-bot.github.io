import { telegramAuthenticated } from "@/router/middlewares/authenticationGuard";
import type { RouteRecordRaw } from "vue-router";

export const route: RouteRecordRaw = {
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
};

export default route;
