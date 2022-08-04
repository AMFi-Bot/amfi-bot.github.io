import { defineStore } from "pinia";

import axios, { api } from "@/api";

import nProgress from "../nprogress";

import router from "../router/index";
import type { apiSuccessResponseType } from "@/types/api/base";
import type { DiscordGuild } from "@/types/discord/guild";

type StateType = {
  guilds: DiscordGuild[];
  loading: boolean;
  loaded: boolean;
};

export const useDiscordGuildsStore = defineStore("discordGuilds", {
  state(): StateType {
    return {
      guilds: [],
      loading: true,
      loaded: false,
    };
  },
  actions: {
    async loadGuilds() {
      try {
        const response = await axios.get("/api/v1/discord/guilds");

        this.guilds = response.data.data.guilds;
        this.loading = false;
        this.loaded = true;
      } catch (error) {
        console.error(error);
      }
    },
    async loginGuild(id: string | number) {
      nProgress.inc();

      // Generate bot auth uri
      let discordURI = "https://discord.com/api/oauth2/authorize?";

      // client id
      discordURI += `client_id=${import.meta.env.VITE_DISCORD_BOT_ID}&`;

      // bot permissions on guild
      discordURI += `permissions=8&`;

      // redirect uri, callback, where popup will redirected when discord authenticated
      discordURI += `redirect_uri=${
        import.meta.env.VITE_FRONTEND_URL +
        import.meta.env.VITE_DISCORD_BOT_CALLBACK_URL
      }&`;

      // Discord will return code to redirect callback uri
      discordURI += `response_type=code&`;

      // Bot will authenticated as user(scope=bot) and as interaction bot commands(scope=applications.commands)
      discordURI += `scope=bot%20applications.commands&`;

      // Guild id where bot will logged in
      discordURI += `guild_id=${id}&`;

      // Disallows user to re-select guild in discord auth menu
      discordURI += `disable_guild_select=true`;

      // Open popup
      const popup = window.open(discordURI, "", "width=500,height=900");

      if (!popup) return;

      nProgress.done();

      await new Promise((resolve) => {
        const interval = setInterval(async () => {
          if (popup.closed) {
            clearInterval(interval);
            resolve(undefined);
          }
        }, 500);
      });

      router.push(`/discord/guilds/${id}`);
    },
    async loginGuildCallback(query_string: string) {
      try {
        await api.post(`/api/v1/discord/guilds?${query_string}`);

        window.close();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
