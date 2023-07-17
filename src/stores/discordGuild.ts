import { getAuthorizationHeader } from "@/helpers/auth/jwt";
import Guild from "@/helpers/discord/Guild";
import GuildManager from "@/helpers/discord/GuildManager";
import { discordBotAPI } from "@/helpers/discord/api";
import type {
  RESTGetAPIGuildChannelsResult,
  RESTGetAPIGuildResult,
} from "discord-api-types/v10";
import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";

export type FullDiscordGuild = RESTGetAPIGuildResult & {
  channels: RESTGetAPIGuildChannelsResult;
};

/**
 * Manages state of the current discord guild through the components
 */
export const useDiscordGuildStore = defineStore("discordGuild", () => {
  const guildManager: Ref<GuildManager | undefined> = ref();
  const discordGuild: Ref<FullDiscordGuild | undefined> = ref();
  const loading: Ref<boolean> = ref(false);

  /**
   * Loads a guild object from the server
   */
  async function loadGuild(guildId: string): Promise<GuildManager> {
    loading.value = true;

    try {
      guildManager.value = await fetchBotGuild(guildId);
      discordGuild.value = await fetchFullDiscordGuild(guildId);
    } finally {
      loading.value = false;
    }

    return guildManager.value;
  }

  async function fetchFullDiscordGuild(
    guildId: string
  ): Promise<FullDiscordGuild> {
    const discordBaseGuild: RESTGetAPIGuildResult = (
      await discordBotAPI.get(`/api/discord/guilds/${guildId}/discord_base`, {
        headers: { Authorization: getAuthorizationHeader() },
      })
    ).data;

    const discordGuildChannels: RESTGetAPIGuildChannelsResult = (
      await discordBotAPI.get(`/api/discord/guilds/${guildId}/channels`, {
        headers: { Authorization: getAuthorizationHeader() },
      })
    ).data;

    return { ...discordBaseGuild, channels: discordGuildChannels };
  }

  const fetchBotGuild = async (guildId: string): Promise<GuildManager> =>
    new GuildManager(await Guild.fetchGuild(guildId));

  /**
   * Resets the store.
   */
  function resetGuild() {
    guildManager.value = undefined;
    loading.value = false;
  }

  /**
   * @returns The guild manager and discord guild or throws an error if undefined
   */
  function getDiscordAndBotGuildOrError() {
    const GM: GuildManager | undefined = guildManager.value;
    const DG: FullDiscordGuild | undefined = discordGuild.value;

    if (!GM || !DG)
      throw new Error("The guild manager or discord guild is undefined");

    return {
      guildManager: GM,
      discordGuild: DG,
    };
  }

  return {
    guildManager,
    discordGuild,
    loading: computed(() => loading.value),
    loadGuild,
    resetGuild,
    getDiscordAndBotGuildOrError,
  };
});
