export type DiscordGuildChannel = {
  id: string;
  guild_id: string;
  type: number;
  name: string;
};

export type DiscordGuildRole = {
  id: string;
  guild_id: string;
  name: string;
  permissions: number;
  position: number;
  color: number;
  hoist: boolean;
  managed: boolean;
  mentionable: boolean;
  icon?: string;
  unicode_emoji?: boolean;
  flags: number;
};

export type DiscordGuild = DiscordUserGuild & {
  channels: DiscordGuildChannel[];
};

export type DiscordBotGuild = {
  id: string;
  module_general: DiscordGuildGeneralModule;
};

export type DiscordGuildGeneralModule = {
  logChannel?: string;
  logEnabled?: boolean;
  logTypes?: string[];
  [X: string]: any;
};

export type DiscordUserGuild = {
  name: string;
  id: string | number;
  icon: string;
  permissions: string;
  roles: DiscordGuildRole[];
  bot_exists?: boolean;
};
