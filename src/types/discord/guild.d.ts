export type DiscordUserGuild = {
  name: string;
  id: string | number;
  icon: string;
  permissions: number;
  bot_exists: boolean;
};

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

export type DiscordBaseGuild = {
  id: string;
  name: string;
  icon?: string;
  channels: DiscordGuildChannel[];
  roles: DiscordGuildRole[];
};

export type DiscordGuildGeneralModule = {
  id: string;
  logChannel?: string;
  logEnabled?: boolean;
  logTypes?: string[];
  [x: string]: any;
  created_at?: string;
  updated_at?: string;
};

export type DiscordFullGuild = DiscordBaseGuild & {
  module_general?: DiscordGuildGeneralModule;
};
