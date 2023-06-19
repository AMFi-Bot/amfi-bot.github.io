import { getAxiosInstance } from "../microservices/api";

export const discordBotAPI = getAxiosInstance(
  import.meta.env.VITE_DISCORD_API_URL
);
