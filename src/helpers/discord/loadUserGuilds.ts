import type {
  DiscordUserGuild,
  DiscordUserGuildRAW,
} from "@/types/discord/guild";
import axios from "axios";
import { getJWT } from "../auth/jwt";
import { userType } from "@/types/auth";

/**
 * Loads user discord guilds list from discord or amfiBot api.
 * @param loadFrom Source from guilds will be loaded.
 * @returns User discord guilds list (filtered by admin permission)
 */
export default async function (): Promise<DiscordUserGuild[]> {
  const token = getJWT();

  if (token.userType != userType.discord)
    throw new Error("Cannot load user guilds: the user is not of discord type");

  const response = await axios.get(
    "https://discord.com/api/v10/users/@me/guilds",
    {
      headers: {
        Authorization: `Bearer ${token.discordAccessToken}`,
      },
    }
  );

  const userGuilds: DiscordUserGuildRAW[] = response.data;

  const userAdminGuilds = userGuilds.filter(
    (guild) => (Number.parseInt(guild.permissions) & 0x8) == 0x8
  );

  return await loadRegisteredList(userAdminGuilds);
}

export async function loadRegisteredList(
  rawUserGuilds: DiscordUserGuildRAW[]
): Promise<DiscordUserGuild[]> {
  const guildsIds = rawUserGuilds.map((g) => g.id);

  console.log(guildsIds);

  const response = await axios.post(
    `${import.meta.env.VITE_DISCORD_API_URL}/api/discord/guilds/registered`,
    guildsIds,
    {
      headers: {
        Authorization: `Bearer ${getJWT().rawToken}`,
      },
    }
  );

  const registeredGuilds: string[] = response.data;

  return rawUserGuilds.map((g) => {
    const bot_exists: boolean = registeredGuilds.includes(g.id);

    const guild: DiscordUserGuild = {
      ...g,
      bot_exists,
    };

    return guild;
  });
}
