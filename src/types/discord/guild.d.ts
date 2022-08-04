export type DiscordGuild = {
  name: string;
  id: string | number;
  icon: string;
  bot_exists: boolean;
};

export type DiscordBotGuild = {
  id: string;
  name: string;
  icon?: string;
  module_general: any;
  channels: any;
  roles: any;
};
