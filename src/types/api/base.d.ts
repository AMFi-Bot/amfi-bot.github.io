export type JWTAuthorizationToken = {
  userType: "Discord user" | "Telegram user";
  accessToken?: string;
  exp: number;
  iss: string;
  aud: string;
};
