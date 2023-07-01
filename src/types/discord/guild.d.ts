import type { RESTAPIPartialCurrentUserGuild } from "discord-api-types/v10";
import type { GeneralModule } from "./modules/general/generalModule";

export type BotGuild = {
  id: string;
  generalModule: GeneralModule;
};

export interface PartialCurrentUserGuild
  extends RESTAPIPartialCurrentUserGuild {
  bot_exists: boolean;
}
