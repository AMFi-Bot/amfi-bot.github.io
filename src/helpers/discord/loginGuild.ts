import api from "axios";

import { useErrorsStore } from "@/stores/errors";

import router from "@/router/index";

export async function loginGuild(id: string | number) {
  const popupURI = `${
    import.meta.env.VITE_API_URL
  }/api/discord/guilds/auth/redirect?discordGuildId=${id}`;

  // Open popup
  const popup = window.open(popupURI, "", "width=500,height=900");

  if (!popup) return;

  await new Promise((resolve) => {
    const interval = setInterval(async () => {
      if (popup.closed) {
        clearInterval(interval);
        resolve(undefined);
      }
    }, 500);
  });

  router.push(`/discord/guilds/${id}`);
}

export async function loginGuildCallback(query_string: string) {
  try {
    await api.get(
      `/api/discord/guilds/auth/callback?${query_string.replace(/^\?/, "")}`
    );

    window.close();
  } catch (error) {
    console.error(error);

    useErrorsStore().addError(
      "Oops something went wrong and we cannot load guild."
    );
  }
}
