const Vue = require('vue');
import VueCookies from 'vue3-cookies';

import $ from 'jquery';
window.$ = $;

import _ from 'lodash';
window._ = _;

import tippy from 'tippy.js';
window.tippy = tippy;

import { sha256 } from 'js-sha256';
window.sha256 = sha256;

import Cookies from 'js-cookie';
window.cookies_mgr = Cookies;

//global csrf token
let csrf_token = document.head.querySelector('meta[name="csrf-token"]');

if (csrf_token) {
  window.csrf_token = csrf_token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
  window.csrf_token = "";
}

// regenerate api key function
function regenerateApiKey(callback, ...params) {
  $.ajax({
    type: "POST",
    url: "/user/generateApiKey",
    headers: {
      "Accept": "application/json",
      "X-CSRF-TOKEN": window.csrf_token,
    },
    success(response) {
      console.debug("Api key generated. Receiving...");
      let apiKey = response.apiKey;
      let key_sha256_checksum = response.sha256;
      if (
        apiKey &&
        key_sha256_checksum &&
        apiKey !== "false" &&
        window.sha256(atob(apiKey)) == key_sha256_checksum
      ) {
        console.debug("API key signature check passed");

        window.cookies_mgr.set(
          'apiKey',
          apiKey,
          { expires: 28 }
        );

        window.cookies_mgr.set(
          'key_sha256_checksum',
          key_sha256_checksum,
          { expires: 28 }
        );

        console.log("apiKey saved");

        callback(...params)

      } else {
        console.error("API key signature check failed. Asking for regeneration...")
        window.regenerateApiKey();
      }

    },
    error(error) {
      console.error(error);
    }
  })
}
window.regenerateApiKey = regenerateApiKey;

function apiRequest(
  method,
  path,
  data,
  headers,
  success_callback,
  error_callback,
  contentType = "application/json",
) {

  var err_callback = error_callback;
  if (!error_callback)
    err_callback = console.error;

  if (!data) data = "";
  if (!headers) headers = [];
  if (!success_callback) success_callback = inf => console.log("request success", inf);

  var main_headers = {
    "Accept": "application/json",
    "X-CSRF-Token": window.csrf_token

  };

  if (window.cookies_mgr.get("apiKey")) {
    main_headers["Authorization"] = `Bearer ${atob(window.cookies_mgr.get("apiKey"))}`
  }

  $.ajax({
    type: method,
    url: path,
    contentType,
    data,
    headers: {
      ...headers,
      ...main_headers
    },
    success: success_callback,
    error(err) {
      if (err.status == 401 && err.responseText == '{"message":"Unauthenticated."}') {
        regenerateApiKey(apiRequest, method, path);
      } else {
        err_callback()
      }
    },
  })
}
window.apiRequest = apiRequest;

function resend_email_verification_notification() {
  apiRequest("POST", "/send-email-verification-notification");
}
window.resend_email_verification_notification = resend_email_verification_notification;

// localization
const VueI18n = require('vue-i18n');
const ruLang = require('./lang/ru.json');
const enLang = require('./lang/en.json')
const messages = {
  en: enLang,
  ru: ruLang,
};

// Создание экземпляра VueI18n с настройками
const i18n = new VueI18n.createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
});// createI18n({);


import Root from './components/rootComponent';
import Questionnaire from './components/questionnaireComponent';
import Dashboard from './components/dashboardComponent';
import TelegramDashboard from './components/telegramDashboardComponent';
import DiscordDashboard from './components/discordDashboardComponent';
import Settings from './components/settingsComponent.vue';
import Menu from './components/menuComponent.vue';
import Footer from './components/footerComponent.vue';
import DiscordGuildSetup from './components/discordGuildSetupComponent.vue';
import { info } from 'laravel-mix/src/Log';

const menu = Vue.createApp({
  el: '#menu',
},
);

menu.use(i18n);
menu.use(VueCookies)

menu.component('menu-component', Menu);
menu.mount('#menu');

const footer = Vue.createApp({
  el: '#footer',
},
);

footer.use(i18n);
footer.use(VueCookies);

footer.component('footer-component', Footer);
footer.mount('#footer');

const app = Vue.createApp({
  el: '#app',
},
);

app.use(i18n);
app.use(VueCookies);

app.component('root-component', Root);
app.component('questionnaire-component', Questionnaire);
app.component('dashboard-component', Dashboard);
app.component('telegram-dashboard-component', TelegramDashboard);
app.component('discord-dashboard-component', DiscordDashboard);
app.component('settings-component', Settings);
app.component('discord-guild-setup-component', DiscordGuildSetup);
app.mount('#app');

window.app = app;


