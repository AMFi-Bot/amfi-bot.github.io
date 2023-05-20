import { createRouter, createWebHistory } from "vue-router";
import nProgress from "nprogress";

import { authenticated } from "./middlewares/authenticationGuard";

import OAuth2Routes from "./routes/oauth2";
import MiscRoutes from "./routes/misc";
import DiscordRoute from "./routes/discord/index";
import TelegramRoute from "./routes/telegram/index";

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

    ...OAuth2Routes,
    ...MiscRoutes,
    DiscordRoute,
    TelegramRoute,
  ],
});

router.beforeResolve(authenticated);

router.afterEach(() => {
  nProgress.done();
});

export default router;
