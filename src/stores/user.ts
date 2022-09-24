import { defineStore } from "pinia";

import { useErrorsStore } from "@/stores/errors";

import axios from "@/api";
import { toInteger } from "lodash";

import router from "@/router/index";

import { AxiosError } from "axios";
import { ref, type Ref } from "vue";
import jwtDecode from "jwt-decode";

import type { JWTAuthorizationToken } from "@/types/api/base";
import type { User, TelegramUser, DiscordUser } from "@/types/users";

export const useUserStore = defineStore("user", () => {
  const user: Ref<User | undefined> = ref();
  const loading: Ref<boolean> = ref(false);

  function setTelegramUser(telegramUser: TelegramUser) {
    user.value = {
      name: `${telegramUser.first_name} ${telegramUser.last_name}`,
      avatar: telegramUser.photo_url,
      telegramUser,
    };

    return user.value;
  }

  function setDiscordUser(discordUser: DiscordUser) {
    const accessToken = getJWTAuthorizationToken()?.accessToken;

    if (!accessToken)
      throw new Error("accessToken cannot be null with discord user");

    user.value = {
      name: `${discordUser.username}`,
      avatar: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
      discordUser,
      discordUserCredentials: {
        accessToken,
      },
    };

    return user.value;
  }

  async function loadUser() {
    const userToken = getJWTAuthorizationToken();
    if (!userToken) return false;

    if (user.value) {
      if (!loading.value) {
        return user;
      } else {
        await new Promise((resolve) => {
          const interval = setInterval(async () => {
            if (!loading.value) {
              clearInterval(interval);
              resolve(undefined);
            }
          }, 100);
        });

        return user;
      }
    }

    loading.value = true;

    // Load user
    if (userToken?.userType == "Discord user") {
      if (!userToken.accessToken) {
        logout();
        loading.value = false;

        return false;
      }
      try {
        const response = await axios.get(
          "https://discord.com/api/v10/users/@me",
          {
            headers: {
              Authorization: `Bearer ${userToken.accessToken}`,
            },
          }
        );

        const user = response.data;

        setDiscordUser(user);

        console.log(user);

        loading.value = false;

        return user;
      } catch {
        loading.value = false;

        logout();

        return false;
      }
    } else if (userToken?.userType == "Telegram user") {
      try {
        const response = await axios.get("/api/telegram/users/@me", {
          headers: {
            Authorization: `Bearer ${userToken.rawToken}`,
          },
        });

        const user = response.data;

        setTelegramUser(user);

        loading.value = false;

        console.log(user);

        return user;
      } catch {
        logout();

        loading.value = false;

        return false;
      }
    } else {
      logout();

      loading.value = false;

      return false;
    }
  }

  async function login_discord() {
    const popup = window.open(
      `${import.meta.env.VITE_API_URL}/api/auth/discord/redirect`,
      "",
      "width=500,height=900"
    );

    if (!popup) return useErrorsStore().addError("Cannot open popup");

    await new Promise((resolve) => {
      const interval = setInterval(async () => {
        if (popup.closed) {
          clearInterval(interval);
          resolve(undefined);
        }
      }, 500);
    });

    if (await loadUser()) {
      postLogin();
    } else {
      useErrorsStore().addError("Login failed.");
    }
  }

  async function discord_callback(query_string: string) {
    try {
      const response = await axios.get(
        `/api/auth/discord/callback?${query_string.replace(/^\?/, "")}`
      );

      localStorage.setItem("Token", response.data);

      window.close();
    } catch {
      useErrorsStore().addError("Cannot login with discord.");
    }
  }

  async function login_telegram(query_string: string) {
    try {
      const response = await axios.get(
        `/api/auth/telegram/callback?${query_string.replace(/^\?/, "")}`
      );

      localStorage.setItem("Token", response.data);

      if (await loadUser()) {
        postLogin();
      } else {
        useErrorsStore().addError("Login failed.");
      }
    } catch (error) {
      const errorsStore = useErrorsStore();

      if (error instanceof AxiosError)
        errorsStore.addError(
          `Something went wrong: ${error.message}. ${
            error.response ? error.response.data : ""
          }`
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
    if (user.value && !loading.value) {
      return true;
    }
    if (await loadUser()) return true;

    return false;
  }

  async function logout() {
    localStorage.removeItem("Token");

    user.value = undefined;

    router.push("/");
  }

  async function postLogin() {
    router.push("/dashboard");
  }

  function throwAuthError(error: AxiosError) {
    const errorsStore = useErrorsStore();

    let err_message = `Oops somtehing went wrong: ${error.message}`;

    if (error.response && error.response.data) {
      type responseType = {
        error: {
          message: string;
        };
      };
      const response_data = <responseType>error.response.data;
      if (response_data.error && response_data.error.message) {
        err_message += ` ${response_data.error.message}`;
      }
    }

    errorsStore.addError(err_message);
  }

  function getJWTAuthorizationToken():
    | (JWTAuthorizationToken & { rawToken: string })
    | null {
    const rawToken = localStorage.getItem("Token");
    if (!rawToken) return null;

    const token: JWTAuthorizationToken = jwtDecode(rawToken);

    return { ...token, rawToken };
  }

  return {
    user,
    loading,
    loadUser,
    login_discord,
    login_telegram,
    discord_callback,
    isAuthenticated,
    load_telegram_widget_script,
    logout,
  };
});
