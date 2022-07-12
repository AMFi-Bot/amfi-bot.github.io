import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

// import css files
import "bootstrap/dist/css/bootstrap.css";

import "./assets/scss/base.scss";

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

import "bootstrap/dist/js/bootstrap.js";
