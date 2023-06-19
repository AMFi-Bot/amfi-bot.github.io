import type { BotGuild } from "@/types/discord/guild";
import type Guild from "./Guild";
import _ from "lodash";

/**
 * Manages a guild object.
 * Adds methods to sync the guild with the server
 */
export class GuildManager {
  public readonly guildId: string;
  public readonly guild: Guild;
  public newGuild: BotGuild;

  constructor(guild: Guild) {
    this.guild = guild;
    this.guildId = guild.id;

    this.newGuild = _.cloneDeep(guild.get());
  }

  public synced(): boolean {
    return _.isEqual(this.guild.get(), this.newGuild);
  }

  public async sync() {
    await this.guild.update(this.newGuild);

    this.newGuild = _.cloneDeep(this.guild.get());
  }

  public resetChanges() {
    this.newGuild = _.cloneDeep(this.guild.get());
  }
}

export default GuildManager;
