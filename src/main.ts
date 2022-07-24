import { nProgress } from "./nprogress";

nProgress.configure({ showSpinner: false });
nProgress.inc();

import { createApp } from "vue";
import { createPinia } from "pinia";
const pinia = createPinia();

import App from "@/App.vue";
import router from "@/router";

import axios from "@/api";

import { setupI18n } from "@/i18n";

import { plugin as VueTippy } from "vue-tippy";
import "tippy.js/dist/tippy.css"; // optional for styling

import DefaultLayoutVue from "./layouts/DefaultLayout.vue";
import LoadingLayoutVue from "./layouts/LoadingLayout.vue";

const i18n = setupI18n();

const app = createApp(App);

app.use(pinia);
app.use(i18n);
app.use(router);
app.use(
  VueTippy,
  // optional
  {
    directive: "tippy", // => v-tippy
    component: "tippy", // => <tippy/>
  }
);

app.component("LoadingLayout", LoadingLayoutVue);
app.component("DefaultLayout", DefaultLayoutVue);

app.mount("#app");

nProgress.inc();

// import base scss files

import "./assets/scss/base.scss";
import "./assets/scss/menu.scss";
import "./assets/scss/footer.scss";
import "./assets/scss/root.scss";
import "./assets/scss/error.scss";

nProgress.inc();
