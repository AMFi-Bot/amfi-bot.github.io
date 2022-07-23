import { defineStore } from "pinia";

import axios from "../api/api";

import nProgress from "../nProgress";

import router from "../router/index";

export const useDiscordGuildsStore = defineStore("discordGuilds", {
  state() {
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
    async loginGuild(id) {
      nProgress.inc();

      // `` +
      //   `?client_id=735374790403031051&permissions=8` +
      //   `&redirect_uri=http%3A%2F%2Fmy-app-dev.com%2Fdiscord%2Fnew_guild` +
      //   `&response_type=code&scope=bot%20applications.commands` +
      //   `&guild_id=${guild_id}&disable_guild_select=true`;

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
    async loginGuildCallback(query_string) {
      window.opener.console.log(query_string);

      window.opener.router.push("/");

      window.opener.router = undefined;

      window.close();
    },
  },
});
