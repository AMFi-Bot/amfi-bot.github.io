import { defineStore } from "pinia";

import { useErrorsStore } from "@/stores/errors";

import authAPI from "@/helpers/auth/api";
import axios from "axios";

import router from "@/router/index";

import { ref, type Ref } from "vue";

import type { User, TelegramUser, DiscordUser } from "@/types/user";
import {
  deleteJWTAuthorizationToken,
  getJWTAuthorizationToken,
  getJWTAuthorizationTokenOrNull,
  setJWTAuthorizationToken,
} from "@/helpers/auth/jwt";
import {
  codeChallengeMethod,
  performFinalPKCE_flow,
  performInitialPKCE_flow,
} from "@/helpers/auth/pkce";
import { redirect_uri } from "@/helpers/auth/oauth2";

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
      const response = await axios.get(
        "https://discord.com/api/v10/users/@me",
        {
          headers: {
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        }
      );

      return parseDiscordUser(response.data);
    } else if (userToken.userType == "Telegram user") {
      // TODO: set an api for telegram user
      const response = await axios.get("/api/telegram/users/@me", {
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
    } catch (e) {
      logout();
      console.error(e);

      if (e instanceof Error)
        errorsStore.addError(
          `Something went wrong. Cannot load user:\n${e.message ?? ""}`
        );
      else errorsStore.addError(`An unhandled error occurred`);

      return user.value;
    }
  }

  /**
   *
   * Perform oauth2 login with an authorization server
   *
   */
  async function loginFlow() {
    const { codeChallenge } = performInitialPKCE_flow();

    let url = `${
      import.meta.env.VITE_AUTHORIZATION_SERVER_URL
    }/oauth2/authorize?`;

    url += `client_id=${import.meta.env.VITE_CLIENT_ID}&`;
    url += `redirect_uri=${redirect_uri}&`;
    url += `response_type=code&`;
    url += `scope=openid&`;
    url += `code_challenge=${codeChallenge}&`;
    url += `code_challenge_method=${codeChallengeMethod}`;

    const popup = window.open(url, "", "width=500,height=900");

    if (!popup) return errorsStore.addError("Cannot open popup");

    await new Promise((resolve) => {
      const interval = setInterval(async () => {
        if (popup.closed) {
          clearInterval(interval);
          resolve(undefined);
        }
      }, 200);
    });

    try {
      await reloadUser(true);
      postLogin();
    } catch (e) {
      if (e instanceof Error)
        errorsStore.addError(
          `Login failed with an error: \n${e.message ?? ""}`
        );
      else errorsStore.addError(`An unhandled error occurred`);
    }
  }

  /**
   *
   * Second path of the OAuth2 authorization flow.
   * Exchanges an access token
   *
   * @param code OAuth2 authorization code grant
   */
  async function loginFlowCallback(code: string) {
    const code_verifier: string = performFinalPKCE_flow();

    try {
      const response = await authAPI.postForm(`/oauth2/token`, {
        code,
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_CLIENT_ID,
        redirect_uri,
        code_verifier,
      });

      console.log(response.data);

      //setJWTAuthorizationToken(response.data);

      //window.close();
    } catch (e) {
      if (e instanceof Error)
        errorsStore.addError(
          `Something went wrong while logging with discord: ${e?.message ?? ""}`
        );
      else errorsStore.addError(`An unhandled error occurred`);
    }
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
    loginFlow,
    loginFlowCallback,
    isAuthenticated,
    logout,
  };
});
