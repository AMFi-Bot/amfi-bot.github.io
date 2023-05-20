export enum userType {
  discord = "discord",
  telegram = "telegram",
}

export interface JWTBase {
  sub: string;
  aud: string;
  nbf: string;
  scope: string[];
  iss: string;
  iat: number;
  exp: number;
}

export interface JWTDiscordBased extends JWTBase {
  userType: userType.discord;
  discordAccessToken: string;
}

export interface JWTTelegramBased extends JWTBase {
  userType: userType.telegram;
}

export type JWT = JWTDiscordBased | JWTTelegramBased;

export type JWTWithRaw = JWT & {
  rawToken: string;
};
