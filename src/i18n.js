import { createI18n } from "vue-i18n";
import js_cookie from "js-cookie";

export const SUPPORT_LOCALES = ["en", "ru"];

export function setupI18n(locale = null) {
  const options = {
    locale: locale ? locale : getI18nLocale(),
    fallbackLocale: "en",
  };

  const i18n = createI18n(options);

  setI18nLanguage(i18n, options.locale);

  return i18n;
}

export function getI18nLocale() {
  var locale = js_cookie.get("locale");

  if (SUPPORT_LOCALES.indexOf(locale) === -1) {
    // Detect locale

    locale = window.navigator.userLanguage || window.navigator.language;

    locale = locale ? locale.split("-")[0] : "en";

    locale = SUPPORT_LOCALES.indexOf(locale) !== -1 ? locale : "en";

    js_cookie.set("locale", locale, { expires: 99999999999 });
  }

  return locale;
}

export async function setI18nLanguage(i18n, locale) {
  await loadLocaleMessages(i18n, locale);

  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }
}

export async function loadLocaleMessages(i18n, locale) {
  const messages = await import(`./assets/locales/${locale}.json`);

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);
}
