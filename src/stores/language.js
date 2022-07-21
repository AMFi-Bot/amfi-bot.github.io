import { defineStore } from "pinia";
import { getI18nLocale, setI18nLanguage, SUPPORT_LOCALES } from "../i18n";
import js_cookie from "js-cookie";
import nProgress from "../nProgress";

export const useLanguageStore = defineStore("language", {
  state() {
    return { language: getI18nLocale() };
  },
  actions: {
    switchLanguage(language) {
      nProgress.inc();
      if (SUPPORT_LOCALES.indexOf(language) === -1) return false;

      this.language = language;

      js_cookie.set("locale", language, { expires: 99999999999 });
      setI18nLanguage(window.i18n, language);

      nProgress.done();

      return this.getLanguage;
    },
  },
  getters: {
    getLanguage() {
      return this.language;
    },
  },
});
