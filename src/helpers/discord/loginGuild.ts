import api from "axios";

import { useErrorsStore } from "@/stores/errors";

import router from "@/router/index";
import axios from "axios";
import { getJWT } from "../auth/jwt";
import { baseURL } from "../app";

/**
 * Registers a guild in the bot space (simply, adds the bot to the user guild)
 * @param id The id of the guild
 */
export async function registerGuild(id: string) {
  const uri =
    "https://discord.com/api/oauth2/authorize" +
    `?client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}` +
    "&scope=applications.commands%20bot" +
    `&guild_id=${id}` +
    "&permissions=8" +
    "&disable_guild_select=true" +
    "&response_type=code" +
    `&redirect_uri=${baseURL}discord_bot_callback`;

  // Open popup
  const popup = window.open(uri, "", "width=500,height=900");

  if (!popup) throw new Error("Cannot open a popup window.");

  await new Promise((resolve) => {
    const interval = setInterval(async () => {
      if (popup.closed) {
        clearInterval(interval);
        resolve(undefined);
      }
    }, 100);
  });

  const response = await axios.get(
    `${
      import.meta.env.VITE_DISCORD_API_URL
    }/api/discord/guilds/registered/${id}`
  );

  if (response.data === true) router.push(`/discord/guilds/${id}`);
  else if (response.data === false) {
    useErrorsStore().addError(
      "Guild is not registered and the bot was not added to it."
    );
  }
}

export async function registerGuildCallback(query_string: string) {
  try {
    await api.get(
      `${
        import.meta.env.VITE_DISCORD_API_URL
      }/api/discord/guilds/register?${query_string.replace(/^\?/, "")}`,
      {
        headers: {
          Authorization: `Bearer ${getJWT().rawToken}`,
        },
      }
    );

    window.close();
  } catch (error) {
    console.error(error);

    useErrorsStore().addError(
      "Oops something went wrong and we cannot register guild."
    );
  }
}
