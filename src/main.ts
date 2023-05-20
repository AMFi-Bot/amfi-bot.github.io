import nProgress from "nprogress";

window.NProgress?.done();
nProgress.configure({ showSpinner: false });
nProgress.inc(0.7);

import { createApp } from "vue";
import { createPinia } from "pinia";
const pinia = createPinia();

import App from "@/App.vue";
import router from "@/router";

import { setupI18n } from "@/i18n";

import { plugin as VueTippy } from "vue-tippy";
import "tippy.js/dist/tippy.css"; // optional for styling

import VueClickAway from "vue3-click-away";

import DefaultLayoutVue from "./layouts/DefaultLayout.vue";
import LoadingLayoutVue from "./layouts/LoadingLayout.vue";

const i18n = setupI18n();

const app = createApp(App);

app.use(pinia);
app.use(i18n);
app.use(router);
app.use(VueClickAway);
app.use(
  VueTippy,
  // optional
  {
    directive: "tippy", // => v-tippy
    component: "tippy", // => <tippy/>
  }
);

app.component("DefaultLayout", DefaultLayoutVue);
app.component("LoadingLayout", LoadingLayoutVue);
app.component(
  "DiscordGuildLayout",
  () => import("./layouts/DiscordGuildLayout.vue")
);

app.mount("#app");
