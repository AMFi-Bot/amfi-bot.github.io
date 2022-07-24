import { defineStore } from "pinia";
import type { DiscordGuildType } from "./discordGuild";

import axios from "@/api";

import nProgress from "../nprogress";

import router from "../router/index";

type StateType = {
  guilds: DiscordGuildType[];
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
      } catch (error) {}
    },
    async loginGuild(id: string | number) {
      nProgress.inc();

      // Generate bot auth uri
      var discordURI = "https://discord.com/api/oauth2/authorize?";

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

      nProgress.done();

      window.router = router;
    },
    async loginGuildCallback(query_string: string) {
      window.opener.console.log(query_string);

      if (!window.opener || !window.opener.router) return;

      window.opener.router.push("/");

      window.opener.router = undefined;

      window.close();
    },
  },
});
