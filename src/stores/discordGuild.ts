import { defineStore } from "pinia";

export type DiscordGuildType = {
  name: string;
  id: string | number;
  icon: string;
  bot_exists: boolean;
};

type LoadingType = {
  loading: false;
  loaded: false;
};

export const useDiscordGuildStore = defineStore("discordGuild", {
  state(): DiscordGuildType & LoadingType {
    return {
      name: "",
      id: "",
      icon: "",
      bot_exists: false,
      loaded: false,
      loading: false,
    };
  },
});
