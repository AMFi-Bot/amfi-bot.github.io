import type { DiscordUser, TelegramUser, User } from "@/types/user";
import { userType, type JWTWithRaw } from "@/types/auth";
import axios from "axios";

/**
 * Parses a raw telegram user object to the application user
 * @param telegramUser raw telegram user
 * @returns parsed user
 */
export function parseTelegramUser(telegramUser: TelegramUser): User {
  return {
    name: `${telegramUser.first_name} ${telegramUser.last_name}`,
    avatar: telegramUser.photo_url,
    telegramUser,
    state: "telegram",
  };
}

/**
 * Parses a raw discord user object to the application user
 * @param discordUser raw discord user
 * @param token JWT authorization token for an application
 * @returns parsed user
 */

export function parseDiscordUser(
  discordUser: DiscordUser,
  token: JWTWithRaw
): User {
  if (token.userType != userType.discord) {
    throw new Error("JWT token is not discord based");
  }
  return {
    name: `${discordUser.username}`,
    avatar: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
    discordUser,
    discordUserCredentials: {
      accessToken: token.discordAccessToken,
    },
    state: "discord",
  };
}

/**
 * Loads user from the servers
 * @param userToken JWT authorization token for an application
 * @returns An application user object
 */

export async function loadUser(userToken: JWTWithRaw): Promise<User> {
  if (userToken.userType == userType.discord) {
    const response = await axios.get("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bearer ${userToken.discordAccessToken}`,
      },
    });

    return parseDiscordUser(response.data, userToken);
  } else if (userToken.userType == userType.telegram) {
    // TODO: set an api for the telegram user
    const response = await axios.get("/api/telegram/users/@me", {
      headers: {
        Authorization: `Bearer ${userToken.rawToken}`,
      },
    });

    return parseTelegramUser(response.data);
  } else throw new Error("Invalid JWT Authorization token. Unauthenticated");
}
