import { defineStore } from "pinia";

import { api } from "@/api";

import { useErrorsStore } from "./errors";

import router from "../router/index";
import type { DiscordUserGuild } from "@/types/discord/guild";
import { ref, type Ref } from "vue";
import loadUserGuilds from "@/helpers/discord/loadUserGuilds";

export const useDiscordGuildsStore = defineStore("discordGuilds", () => {
  const guilds: Ref<DiscordUserGuild[] | undefined> = ref();
  const loading: Ref<boolean> = ref(false);

  async function loadGuilds() {
    try {
      loading.value = true;

      const userGuilds: DiscordUserGuild[] = await loadUserGuilds("bot");

      guilds.value = userGuilds;

      loading.value = false;
    } catch (error) {
      console.error(error);

      useErrorsStore().addError(
        "Oops something went wrong and we cannot get your guilds list."
      );

      loading.value = false;
    }
  }

  async function loginGuild(id: string | number) {
    const popupURI = `${
      import.meta.env.VITE_API_URL
    }/api/discord/guilds/auth/redirect?discordGuildId=${id}`;

    // Open popup
    const popup = window.open(popupURI, "", "width=500,height=900");

    if (!popup) return;

    await new Promise((resolve) => {
      const interval = setInterval(async () => {
        if (popup.closed) {
          clearInterval(interval);
          resolve(undefined);
        }
      }, 500);
    });

    router.push(`/discord/guilds/${id}`);
  }

  async function loginGuildCallback(query_string: string) {
    try {
      await api.get(
        `/api/discord/guilds/auth/callback?${query_string.replace(/^\?/, "")}`
      );

      window.close();
    } catch (error) {
      console.error(error);

      useErrorsStore().addError(
        "Oops something went wrong and we cannot load guild."
      );
    }
  }

  return {
    guilds,
    loading,
    loadGuilds,
    loginGuild,
    loginGuildCallback,
  };
});
