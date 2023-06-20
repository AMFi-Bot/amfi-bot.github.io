import type { RESTAPIPartialCurrentUserGuild } from "discord-api-types/v10";

export type BotGuild = {
  id: string;
  generalModule: GeneralModule;
};

export type GeneralModule = {
  logChannel?: string?;
  logEnabled?: boolean;
  logTypes?: string[];
};

export interface PartialCurrentUserGuild
  extends RESTAPIPartialCurrentUserGuild {
  bot_exists: boolean;
}
