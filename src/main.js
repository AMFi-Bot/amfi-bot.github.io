import $ from "jquery";
window.$ = $;

import _ from "lodash";
window._ = _;

import tippy from "tippy.js";
window.tippy = tippy;

import Cookies from "js-cookie";
window.cookies = Cookies;

import axios from "axios";
window.axios = axios;

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

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

axios.get("/sanctum/csrf-cookie");

// Создание экземпляра VueI18n с настройками
const i18n = new createI18n({
  locale: "en", // set locale
  fallbackLocale: "ru", // set fallback locale
  messages, // set locale messages
});

const app = createApp(App);

app.use(i18n);
app.use(router);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
