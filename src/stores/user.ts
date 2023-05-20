import { defineStore } from "pinia";

import { useErrorsStore } from "@/stores/errors";

import router from "@/router/index";

import { ref, type Ref } from "vue";

import type { User } from "@/types/user";
import { deleteJWT, getJWT, getJWTOrNull } from "@/helpers/auth/jwt";

import { OAuth2AuthorizeFlow } from "@/helpers/auth/oauth2";
import { loadUser } from "@/helpers/auth/user";

export const useUserStore = defineStore("user", () => {
  const initial_user: User = { state: "loading" };
  const user: Ref<User> = ref(initial_user);
  reloadUser();
  const errorsStore = useErrorsStore();

  // TODO: implement a security logic to prevent multiple reloadUser instances reload the user.

  async function reloadUser(force = false): Promise<User> {
    const userToken = getJWTOrNull();
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
    user.value = await loadUser(userToken);

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
    try {
      await OAuth2AuthorizeFlow();
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
    deleteJWT();

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
    isAuthenticated,
    logout,
  };
});
