/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Points to the authorization server
   */
  readonly VITE_AUTHORIZATION_SERVER_URL: string;

  /**
   * Client ID for the authorization server
   */
  readonly VITE_CLIENT_ID: string;

  /**
   * Points to the amfi bot API that operates with the discord bot
   */
  readonly VITE_DISCORD_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
