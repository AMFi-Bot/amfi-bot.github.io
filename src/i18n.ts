import {
  createI18n,
  type Composer,
  type VueI18n,
  type VueMessageType,
} from "vue-i18n";
import js_cookie from "js-cookie";

import en from "@/assets/locales/en";

export const SUPPORT_LOCALES = ["en", "ru"];

export function setupI18n(locale?: string) {
  if (locale) {
    if (SUPPORT_LOCALES.indexOf(locale) === -1) {
      locale = getI18nLocale() || "en";
    }
  } else {
    locale = getI18nLocale() || "en";
  }

  const i18n = createI18n({
    locale: locale,
    fallbackLocale: "en",
    messages: {
      en: en,
    },
    allowComposition: true,
  });

  if (locale && locale !== "en") {
    const loadMessage = async (locale: string) => {
      const messages = await import(`@/assets/locales/${locale}.ts`);

      // set locale and locale message
      i18n.global.setLocaleMessage(locale, messages.default);
    };

    loadMessage(locale);
  }

  return i18n;
}

export function getI18nLocale() {
  let locale = js_cookie.get("locale");

  if (locale && SUPPORT_LOCALES.indexOf(locale) === -1) {
    // Detect locale

    locale = window.navigator.language;

    locale = locale ? locale.split("-")[0] : "en";

    locale = SUPPORT_LOCALES.indexOf(locale) !== -1 ? locale : "en";

    js_cookie.set("locale", locale, { expires: 99999999999 });
  }

  return locale;
}

export async function setI18nLanguage(i18n: Composer, locale: string) {
  if (SUPPORT_LOCALES.indexOf(locale) === -1) return false;

  js_cookie.set("locale", locale, { expires: 99999999999 });

  await loadLocaleMessages(i18n, locale);

  i18n.locale.value = locale;

  return true;
}

export async function loadLocaleMessages(i18n: Composer, locale: string) {
  const messages = await import(`@/assets/locales/${locale}.ts`);

  // set locale and locale message
  i18n.setLocaleMessage(locale, messages.default);
}
