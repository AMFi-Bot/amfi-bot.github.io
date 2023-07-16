import type { BotGuild } from "@/types/discord/guild";
import _ from "lodash";
import { discordBotAPI } from "./api";
import { getAuthorizationHeader } from "../auth/jwt";

export class Guild {
  public readonly id;
  private guild: BotGuild;

  constructor(guild: BotGuild) {
    this.guild = _.cloneDeep(guild);
    this.id = guild.id;
  }

  public get(): BotGuild {
    return _.cloneDeep(this.guild);
  }

  private set(guild: BotGuild) {
    if (guild.id != this.id) throw new Error("The guild id is falsified");

    this.guild = _.cloneDeep(guild);
  }

  /**
   * Setts and pushes a guild to the amfi bot server
   * @param guild A bot guild object to be pushed to the server
   */
  public async update(guild: BotGuild) {
    const newGuild = _.cloneDeep(guild);

    // Push a guild to the server
    await discordBotAPI.put(`/api/discord/guilds/${this.id}`, newGuild, {
      headers: {
        Authorization: getAuthorizationHeader("api"),
      },
    });

    this.set(newGuild);
  }

  /**
   * Fetches a Discord bot guild object from the server
   */
  public static async fetchGuild(guildId: string): Promise<Guild> {
    const response = await discordBotAPI.get(`/api/discord/guilds/${guildId}`, {
      headers: {
        Authorization: getAuthorizationHeader("api"),
      },
    });

    const botGuild: BotGuild = response.data;

    const guild: Guild = new Guild(botGuild);
    return guild;
  }
}

export default Guild;
