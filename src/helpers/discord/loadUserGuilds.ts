import type { DiscordUserGuild } from "@/types/discord/guild";
import { baseOptions } from "@/api";
import axios from "axios";
import { getJWTAuthorizationToken } from "../auth/jwt";

/**
 * Loads user discord guilds list from discord or amfiBot server.
 * @param loadFrom Source from guilds will be loaded.
 * @returns User discord guilds list (filtered by admin permission)
 */
export default async function (
  loadFrom: "discord" | "bot" = "discord"
): Promise<DiscordUserGuild[]> {
  const token = getJWTAuthorizationToken();

  const path: string =
    loadFrom == "bot"
      ? `${baseOptions.baseURL}/api/discord/guilds/@me`
      : "https://discord.com/api/v10/users/@me/guilds";

  const auth_header: string =
    loadFrom == "bot"
      ? `Bearer ${token.rawToken}`
      : `Bearer ${token.accessToken}`;

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
