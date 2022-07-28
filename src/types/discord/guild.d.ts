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
  module_moderation: any;
  module_automoderation: any;
  module_commands: any;
  module_features: any;
  channels: any;
  roles: any;
};
