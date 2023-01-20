import { defineStore } from "pinia";

import { useErrorsStore } from "@/stores/errors";

import api from "@/api";
import _, { toInteger } from "lodash";

import router from "@/router/index";

import { computed, ref, type Ref } from "vue";

import type { User, TelegramUser, DiscordUser } from "@/types/user";
import {
  deleteJWTAuthorizationToken,
  getJWTAuthorizationToken,
  getJWTAuthorizationTokenOrNull,
  setJWTAuthorizationToken,
} from "@/helpers/auth/jwt";

export const useUserStore = defineStore("user", () => {
  const initial_user: User = { state: "loading" };
  const user: Ref<User> = ref(initial_user);
  loadUser()
    .then((us) => (user.value = us))
    .catch((err) => {
      user.value = { state: "unauthenticated" };
      console.error(err);
    });
  const errorsStore = useErrorsStore();

  function parseTelegramUser(telegramUser: TelegramUser): User {
    return {
      name: `${telegramUser.first_name} ${telegramUser.last_name}`,
      avatar: telegramUser.photo_url,
      telegramUser,
      state: "telegram",
    };
  }

  function parseDiscordUser(discordUser: DiscordUser): User {
    const accessToken = getJWTAuthorizationToken()?.accessToken;

    if (!accessToken)
      throw new Error("accessToken cannot be null with discord user");

    return {
      name: `${discordUser.username}`,
      avatar: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
      discordUser,
      discordUserCredentials: {
        accessToken,
      },
      state: "discord",
    };
  }

  async function loadUser(): Promise<User> {
    const userToken = getJWTAuthorizationTokenOrNull();
    if (!userToken) return { state: "unauthenticated" };

    // Load user
    if (userToken.userType == "Discord user") {
      const response = await api.get("https://discord.com/api/v10/users/@me", {
        headers: {
          Authorization: `Bearer ${userToken.accessToken}`,
        },
      });

      return parseDiscordUser(response.data);
    } else if (userToken.userType == "Telegram user") {
      const response = await api.get("/api/telegram/users/@me", {
        headers: {
          Authorization: `Bearer ${userToken.rawToken}`,
        },
      });

      return parseTelegramUser(response.data);
    } else {
      console.error("Invalid JWT Authorization token. Unauthenticated");
      deleteJWTAuthorizationToken();
      return { state: "unauthenticated" };
    }
  }

  async function reloadUser(force = false): Promise<User> {
    const userToken = getJWTAuthorizationTokenOrNull();
    if (!userToken)
      throw new Error(
        "JWT Authorization token is not provided. Cannot load user."
      );

    // Escape multiple user loading when one is already in a process
    if (user.value.state == "loading" && !force) {
      await new Promise((resolve) => {
        const interval = setInterval(async () => {
          if (!(user.value.state == "loading")) {
            clearInterval(interval);
            resolve(undefined);
          }
        }, 10);
      });

      return user.value;
    }

    user.value.state = "loading";

    // Load user
    const tempUser = await loadUser();

    user.value = tempUser;

    return user.value;
  }

  async function getUser(): Promise<User> {
    if (user.value.state != "unauthenticated" && user.value.state != "loading")
      return user.value;

    try {
      return await reloadUser();
    } catch (error: Error | any) {
      logout();
      console.error(error);
      errorsStore.addError(
        `Something went wrong. Cannot load user:\n${
          error?.message ? error.message : ""
        }`
      );
      return user.value;
    }
  }

  async function login_discord() {
    const popup = window.open(
      `${import.meta.env.VITE_API_URL}/api/auth/discord/redirect`,
      "",
      "width=500,height=900"
    );

    if (!popup) return errorsStore.addError("Cannot open popup");

    await new Promise((resolve) => {
      const interval = setInterval(async () => {
        if (popup.closed) {
          clearInterval(interval);
          resolve(undefined);
        }
      }, 500);
    });

    try {
      await reloadUser(true);
      postLogin();
    } catch (error: Error | any) {
      errorsStore.addError(
        `Login failed with error: \n${error?.message ?? ""}`
      );
    }
  }

  async function discord_callback(query_string: string) {
    try {
      const response = await api.get(
        `/api/auth/discord/callback?${query_string.replace(/^\?/, "")}`
      );

      setJWTAuthorizationToken(response.data);

      window.close();
    } catch (error: Error | any) {
      errorsStore.addError(
        `Something went wrong while logging ini with discord: ${
          error?.message ?? ""
        }`
      );
    }
  }

  async function login_telegram(query_string: string) {
    try {
      const response = await api.get(
        `/api/auth/telegram/callback?${query_string.replace(/^\?/, "")}`
      );

      setJWTAuthorizationToken(response.data);

      await reloadUser(true);
      postLogin();
    } catch (error: Error | any) {
      errorsStore.addError(
        `Login failed with error: \n${error?.message ?? ""}`
      );
      return false;
    }
  }

  function load_telegram_widget_script(mount_to = "telegram_load") {
    console.log("function");
    const telegram_widget_script = document.createElement("script");
    telegram_widget_script.setAttribute(
      "src",
      "https://telegram.org/js/telegram-widget.js?19"
    );
    telegram_widget_script.setAttribute(
      "data-telegram-login",
      import.meta.env.VITE_TELEGRAM_LOGIN
    );
    telegram_widget_script.setAttribute("data-size", "large");
    telegram_widget_script.setAttribute("data-auth-url", "/telegram_callback");
    telegram_widget_script.setAttribute("data-request-access", "write");
    telegram_widget_script.setAttribute("data-userpic", "false");
    const load_tg_widget_elems = document.getElementsByClassName(mount_to);

    for (const i in load_tg_widget_elems) {
      const load_tg_widget_elem = load_tg_widget_elems.item(toInteger(i));
      if (!load_tg_widget_elem) continue;

      load_tg_widget_elem.replaceChildren(telegram_widget_script);
    }

    // <script
    //   async
    //   src="https://telegram.org/js/telegram-widget.js?19"
    //   data-telegram-login=import.meta.env.VITE_TELEGRAM_LOGIN
    //   data-size="large"
    //   data-userpic="false"
    //   data-auth-url="/telegram_callback"
    //   data-request-access="write"
    // ></script>;
  }

  async function isAuthenticated(): Promise<boolean> {
    if (
      user.value.state != "unauthenticated" &&
      user.value.state != "loading"
    ) {
      return true;
    }

    await getUser();

    if (user.value.state != "unauthenticated" && user.value.state != "loading")
      return true;

    return false;
  }

  function logout() {
    deleteJWTAuthorizationToken();

    user.value = { state: "unauthenticated" };

    router.push("/");
  }

  function postLogin() {
    router.push("/dashboard");
  }

  return {
    user: user,
    getUser,
    reloadUser,
    login_discord,
    login_telegram,
    discord_callback,
    isAuthenticated,
    load_telegram_widget_script,
    logout,
  };
});
