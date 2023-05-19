import api from "axios";
import { getAuthorizationHeader, getJWT } from "@/helpers/auth/jwt";
import loadUserGuilds from "@/helpers/discord/loadUserGuilds";
import type {
  DiscordBotGuild,
  DiscordGuild,
  DiscordUserGuild,
} from "@/types/discord/guild";
import axios from "axios";
import _ from "lodash";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useErrorsStore } from "./errors";

export const useDiscordGuildStore = defineStore("discordGuild", () => {
  const guild: Ref<DiscordBotGuild | undefined> = ref();
  const oldGuild: Ref<DiscordBotGuild | undefined> = ref();
  const discordGuild: Ref<DiscordGuild | undefined> = ref();
  const loading: Ref<boolean> = ref(false);

  async function loadDiscordGuild(id: string): Promise<DiscordGuild | false> {
    try {
      const userGuilds: DiscordUserGuild[] = await loadUserGuilds();

      console.log(userGuilds);

      const userGuild: DiscordUserGuild | undefined = userGuilds.find(
        (guild) => guild.id == id
      );

      console.log(userGuild);

      if (!userGuild)
        throw new Error(
          `Cannot load discord guild. Guild with id ${id} does not exist in user guilds list.`
        );

      // Load guild channels
      const response = await axios.get(`/api/discord/guilds/${id}/channels`, {
        headers: {
          Authorization: getAuthorizationHeader("api"),
        },
      });

      discordGuild.value = {
        ...userGuild,
        channels: response.data,
      };

      return discordGuild.value;
    } catch (error) {
      console.error(error);
      useErrorsStore().addError(
        "Oops. Something went wrong and we cannot load discord guild. Please try again"
      );

      return false;
    }
  }

  async function loadGuild(id: string) {
    loading.value = true;
    try {
      const response = await api.get(`/api/discord/guilds/${id}`, {
        headers: {
          Authorization: `Bearer ${getJWT().rawToken}`,
        },
      });

      loading.value = false;

      const loadedGuild = _.cloneDeep(response.data);
      if (!loadedGuild.module_general) loadedGuild.module_general = {};

      guild.value = loadedGuild;

      return guild.value;
    } catch (error) {
      loading.value = false;

      const errorsStore = useErrorsStore();
      errorsStore.addError(
        "Oops. Something went wrong and we cannot load guild from bot server. Please try again"
      );

      return false;
    }
  }

  async function getGuild(id?: string) {
    if (guild.value && !loading.value) {
      return guild;
    } else if (id) {
      return await loadGuild(id);
    } else {
      return false;
    }
  }

  async function syncGuild() {
    if (!guild.value || !oldGuild.value) return false;

    if (!_.isEqual(oldGuild.value, guild.value)) {
      try {
        await api.put(`/api/discord/guilds/${guild.value.id}`, guild.value, {
          headers: {
            Authorization: getAuthorizationHeader("api"),
          },
        });

        oldGuild.value = _.cloneDeep(guild.value);

        return guild.value;
      } catch (error) {
        const errorsStore = useErrorsStore();

        errorsStore.addError(
          "Oops. Somwhthing went wrong while syncing guild. Please try again."
        );

        return false;
      }
    }
  }

  function resetGuildChanges() {
    if (!guild.value || !oldGuild.value) return false;

    guild.value = _.cloneDeep(oldGuild.value);

    return guild.value;
  }

  function updateModule(module_name: "general", data: any) {
    if (!guild.value) return false;

    if (!oldGuild.value) oldGuild.value = _.cloneDeep(guild.value);

    guild.value[`module_${module_name}`] = _.cloneDeep(data);
  }

  function updateModuleProperty(
    module_name: "general",
    propety_name: string,
    property_value: any
  ) {
    if (!guild.value) return false;

    const module = _.cloneDeep(guild.value[`module_${module_name}`]) || {};

    module[propety_name] = _.cloneDeep(property_value);
    return updateModule(module_name, module);
  }

  async function loadModule(module_name: "general") {
    if (!guild.value?.id) return false;

    const loadedGuild = await loadGuild(guild.value.id);
    if (!loadedGuild) return false;

    const loadedModule = loadedGuild[`module_${module_name}`];

    return loadedModule;
  }

  return {
    guild,
    loading,
    oldGuild,
    discordGuild,
    loadDiscordGuild,
    loadGuild,
    getGuild,
    updateModule,
    updateModuleProperty,
    loadModule,
    syncGuild,
    resetGuildChanges,
  };
});
