export interface BaseUser {
  name: string;
  avatar?: string;
  privelege?: number;
}

export interface DiscordUserCredentials {
  accessToken: string;
}

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
}

export interface TelegramUser {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  photo_url?: string;
}

export interface User extends BaseUser {
  discordUser?: DiscordUser;
  discordUserCredentials?: DiscordUserCredentials;
  telegramUser?: TelegramUser;
}
