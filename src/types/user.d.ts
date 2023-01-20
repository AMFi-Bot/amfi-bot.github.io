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

export type BaseUser = {
  name: string;
  avatar?: string;
  privelege?: number;
};

export type User =
  | ({
      discordUser: DiscordUser;
      discordUserCredentials: DiscordUserCredentials;
      state: "discord";
    } & BaseUser)
  | ({
      telegramUser: TelegramUser;
      state: "telegram";
    } & BaseUser)
  | {
      state: "loading" | "unauthenticated";
    };
