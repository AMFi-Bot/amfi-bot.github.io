import api from "@/api";
import type { DiscordFullGuild } from "@/types/discord/guild";
import axios from "axios";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import { useErrorsStore } from "./errors";

type LoadingType = {
  loading: boolean;
  loaded: boolean;
};

export const useDiscordGuildStore = defineStore("discordGuild", () => {
  const guild: Ref<DiscordFullGuild | undefined> = ref();
  const loading: Ref<boolean> = ref(false);

  async function loadGuild(id: string | number) {
    try {
      loading.value = true;
      const response = await api.get(`/api/v1/discord/guilds/${id}?load=full`);

      guild.value = response.data.data.guild;
      loading.value = false;

      return guild;
    } catch (error) {
      loading.value = false;

      const errorsStore = useErrorsStore();
      errorsStore.addError("Cannot load guilds");

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

  async function updateModule(module_name: "general", data: any) {
    if (!guild.value) return false;

    try {
      const response = await api.put(
        `/api/v1/discord/guilds/${guild.value.id}/modules/${module_name}`,
        data
      );

      guild.value[`module_${module_name}`] = response.data.data;

      return guild.value[`module_${module_name}`];
    } catch (error) {
      const errorsStore = useErrorsStore();

      errorsStore.addError("Cannot update module");

      return false;
    }
  }

  async function updateModuleProperty(
    module_name: "general",
    propety_name: string,
    property_value: any
  ) {
    if (!guild.value) return false;

    let module = guild.value[`module_${module_name}`];
    if (!module)
      module = {
        id: guild.value.id,
      };

    module[propety_name] = property_value;
    return await updateModule(module_name, module);
  }

  async function loadModule(module_name: "general") {
    loading.value = true;

    if (!guild.value) {
      loading.value = false;
      return false;
    }

    if (guild.value[`module_${module_name}`]) {
      loading.value = false;
      return guild.value[`module_${module_name}`];
    }

    try {
      const response = await axios.get(
        `/api/v1/discord/guilds/${guild.value.id}/modules/module_${module_name}`
      );

      guild.value[`module_${module_name}`] =
        response.data.data[`module_${module_name}`];

      loading.value = false;

      return guild.value[`module_${module_name}`];
    } catch (error: any) {
      loading.value = false;
      if (
        error &&
        error.response &&
        error.response.status &&
        error.response.status === 404
      ) {
        guild.value[`module_${module_name}`] = { id: guild.value.id };
        return false;
      }
      const errorsStore = useErrorsStore();

      errorsStore.addError(`Cannot load module ${module_name}`);

      useRouter().push({ name: "DiscordDashboard" });

      return false;
    }
  }

  return {
    guild,
    loading,
    loadGuild,
    getGuild,
    updateModule,
    updateModuleProperty,
    loadModule,
  };
});
