import { nProgress } from "./nProgress";

nProgress.configure({ showSpinner: false });
nProgress.inc();

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "./axios";

// localization
// import { createI18n } from "vue-i18n";
// import enLocale from "./assets/locales/en.json";
// import ruLocale from "./assets/locales/ru.json";
// const messages = {
//   en: enLocale,
//   ru: ruLocale,
// };

// Создание экземпляра VueI18n с настройками
// const i18n = new createI18n({
//   locale: "en", // set locale
//   fallbackLocale: "ru", // set fallback locale
//   messages, // set locale messages
// });

import { setupI18n } from "./i18n";

import { createPinia } from "pinia";
const pinia = createPinia();

import { plugin as VueTippy } from "vue-tippy";
import "tippy.js/dist/tippy.css"; // optional for styling

const i18n = setupI18n();

window.i18n = i18n;

const app = createApp(App);

app.use(i18n);
app.use(pinia);
app.use(router);
app.use(
  VueTippy,
  // optional
  {
    directive: "tippy", // => v-tippy
    component: "tippy", // => <tippy/>
  }
);

app.mount("#app");

console.log(app);

nProgress.inc();

// import css files

import "./assets/scss/base.scss";
import "./assets/scss/menu.scss";
import "./assets/scss/footer.scss";
import "./assets/scss/dashboard.scss";
import "./assets/scss/guild.scss";
import "./assets/scss/root.scss";
import "./assets/scss/auth.scss";
import "./assets/scss/discord_setup.scss";
import "./assets/scss/error.scss";

nProgress.inc();
