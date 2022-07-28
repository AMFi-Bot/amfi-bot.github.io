import api from "@/api";
import type { apiSuccessResponseType } from "@/types/api/base";
import type { DiscordBotGuild } from "@/types/discord/guild";
import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useErrorsStore } from "./errors";

type LoadingType = {
  loading: boolean;
  loaded: boolean;
};

export const useDiscordGuildStore = defineStore("discordGuild", {
  state(): DiscordBotGuild & LoadingType {
    return {
      id: "",
      name: "",
      icon: "",
      module_general: {},
      module_moderation: {},
      module_automoderation: {},
      module_commands: {},
      module_features: {},
      channels: {},
      roles: {},
      loaded: false,
      loading: false,
    };
  },
  actions: {
    async loadGuild(id: string | number) {
      try {
        const response = <apiSuccessResponseType>(
          (await api.get(`/api/v1/discord/guilds/${id}`)).data
        );

        this.$state = { ...response.data.guild };
        this.loading = false;
        this.loaded = true;

        return this.$state;
      } catch (error) {
        const errorsStore = useErrorsStore();

        errorsStore.addError("Cannot load guilds");

        return false;
      }
    },

    async getGuild(id: string | number) {
      if (this.loaded) {
        return this.$state;
      } else {
        return await this.loadGuild(id);
      }
    },
  },
});
