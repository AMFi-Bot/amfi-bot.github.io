import { useUserStore } from "@/stores/user";
import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
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
];

export default routes;
