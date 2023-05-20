import { defineStore } from "pinia";

import { useErrorsStore } from "@/stores/errors";

import router from "@/router/index";

import { ref, type Ref } from "vue";

import type { User } from "@/types/user";
import { deleteJWT, getJWTOrNull } from "@/helpers/auth/jwt";

import { OAuth2AuthorizeFlow } from "@/helpers/auth/oauth2";
import { loadUser } from "@/helpers/auth/user";
import { UserSetManager } from "@/helpers/auth/userSetManager";

export const useUserStore = defineStore("user", () => {
  const userSetter = new UserSetManager();

  const user: Ref<User> = ref({ state: "loading" });

  if (getJWTOrNull()) reloadUser(true);
  else user.value = { state: "unauthenticated" };

  const errorsStore = useErrorsStore();

  function setUser(newUser: User, setter: string) {
    if (userSetter.approveSetter(setter)) user.value = newUser;
    else throw new Error("The given user setter cannot be approved");
  }

  async function reloadUser(force = false): Promise<User> {
    const userToken = getJWTOrNull();
    if (!userToken)
      throw new Error(
        "JWT Authorization token is not provided. Cannot load user."
      );

    // Escape multiple user loading when one is already in a process
    if (user.value.state == "loading" && !force) return await getUser();

    const setter = userSetter.reinitSetter();

    try {
      setUser({ state: "loading" }, setter);

      // Load user
      setUser(await loadUser(userToken), setter);
    } catch (e) {
      /* empty */
    }

    return await getUser();
  }

  async function getUser(): Promise<User> {
    if (user.value.state == "loading") await awaitForUserLoading();

    return user.value;
  }

  async function awaitForUserLoading() {
    await new Promise((resolve) => {
      const interval = setInterval(async () => {
        if (!(user.value.state == "loading")) {
          clearInterval(interval);
          resolve(undefined);
        }
      }, 10);
    });
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
    const user = await getUser();

    return user.state != "unauthenticated";
  }

  function logout() {
    deleteJWT();

    setUser({ state: "unauthenticated" }, userSetter.reinitSetter());

    userSetter.clearSetters();

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
