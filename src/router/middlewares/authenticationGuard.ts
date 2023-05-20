import { useErrorsStore } from "@/stores/errors";
import { useUserStore } from "@/stores/user";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function authenticated(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (
    to.meta.requiresAuth &&
    !(await (await useUserStore()).isAuthenticated())
  ) {
    return {
      path: "/",
    };
  }

  next();
}

export async function discordAuthenticated(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userStore = useUserStore();
  if (
    (await userStore.isAuthenticated()) &&
    userStore.user.state == "discord"
  ) {
    return next();
  }
  next("/");
  useErrorsStore().addError("You are not authenticated with discord.");
}

export async function telegramAuthenticated(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userStore = useUserStore();
  if (
    (await userStore.isAuthenticated()) &&
    userStore.user.state == "telegram"
  ) {
    return next();
  }
  next("/");
  useErrorsStore().addError("You are not authenticated with telegram.");
}
