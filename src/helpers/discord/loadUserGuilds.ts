import type { DiscordUserGuild } from "@/types/discord/guild";
import axios from "axios";
import { getJWT } from "../auth/jwt";
import { userType } from "@/types/auth";

/**
 * Loads user discord guilds list from discord or amfiBot api.
 * @param loadFrom Source from guilds will be loaded.
 * @returns User discord guilds list (filtered by admin permission)
 */
export default async function (
  loadFrom: "discord" | "api" = "discord"
): Promise<DiscordUserGuild[]> {
  const token = getJWT();

  const path: string =
    loadFrom == "api"
      ? `/api/discord/guilds/@me`
      : "https://discord.com/api/v10/users/@me/guilds";

  const auth_header =
    loadFrom == "api"
      ? `Bearer ${token.rawToken}`
      : loadFrom == "discord"
      ? token.userType == userType.discord
        ? `Bearer ${token.discordAccessToken}`
        : new Error("Cannot load from discord: the token is not discord-based")
      : new Error("Undefined loadFrom");

  if (auth_header instanceof Error) throw auth_header;

  const response = await axios.get(path, {
    headers: {
      Authorization: auth_header,
    },
  });

  const userGuilds: DiscordUserGuild[] = response.data;

  const userAdminGuilds = userGuilds.filter(
    (guild) => (Number.parseInt(guild.permissions) & 0x8) == 0x8
  );

  return userAdminGuilds;
}
