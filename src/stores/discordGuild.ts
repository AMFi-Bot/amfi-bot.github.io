import api from "@/api";
import type { apiSuccessResponseType } from "@/types/api/base";
import type { DiscordBotGuild } from "@/types/discord/guild";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
// import { useRoute, useRouter } from "vue-router";
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
      channels: [],
      roles: [],
      loaded: false,
      loading: false,
    };
  },
  actions: {
    async loadGuild(id: string | number) {
      try {
        const response = await api.get(
          `/api/v1/discord/guilds/${id}?load=full`
        );

        this.$state = response.data.data.guild;
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

    async updateModule(module_name: "general", data: any) {
      try {
        const response = await api.put(
          `/api/v1/discord/guilds/${this.id}/modules/${module_name}`,
          data
        );

        this.$state[`module_${module_name}`] = response.data.data;

        return this.$state[`module_${module_name}`];
      } catch (error) {
        const errorsStore = useErrorsStore();

        errorsStore.addError("Cannot update module");

        return false;
      }
    },

    async updateModuleProperty(
      module_name: "general",
      propety_name: string,
      property_value: any
    ) {
      const module = this.$state[`module_${module_name}`];
      module[propety_name] = property_value;
      return await this.updateModule(module_name, module);
    },

    async loadModule(module_name: "general") {
      if (this.$state[`module_${module_name}`])
        return this.$state[`module_${module_name}`];
      try {
        const response = await axios.get(
          `/api/v1/discord/guilds/${this.id}/modules/module_${module_name}`
        );

        this.$state[`module_${module_name}`] =
          response.data.data[`module_${module_name}`];

        return this.$state[`module_${module_name}`];
      } catch {
        const errorsStore = useErrorsStore();

        errorsStore.addError(`Cannot load module ${module_name}`);

        useRouter().push({ name: "DiscordDashboard" });

        return false;
      }
    },
  },
});
