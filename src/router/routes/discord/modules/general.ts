import type { RouteRecordRaw } from "vue-router";

export const route: RouteRecordRaw = {
  path: "general",
  children: [
    {
      path: "",
      name: "DiscordGuildGeneral",
      component: () =>
        import("@/views/Discord/Guild/modules/general/GeneralView.vue"),
    },
    {
      path: "logging",
      name: "DGGLogging",
      component: () =>
        import("@/views/Discord/Guild/modules/general/LoggingView.vue"),
    },
  ],
};

export default route;
