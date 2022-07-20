import { nProgress } from "./nProgress";

nProgress.configure({ showSpinner: false });
nProgress.inc();

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "./axios";

// localization
import { createI18n } from "vue-i18n";
import enLocale from "./assets/locales/en.json";
import ruLocale from "./assets/locales/ru.json";
const messages = {
  en: enLocale,
  ru: ruLocale,
};

// Создание экземпляра VueI18n с настройками
const i18n = new createI18n({
  locale: "en", // set locale
  fallbackLocale: "ru", // set fallback locale
  messages, // set locale messages
});

import { createPinia } from "pinia";
const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(i18n);
app.use(router);

app.mount("#app");

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
