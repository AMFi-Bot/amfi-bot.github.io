import { userType, type JWTWithRaw, type JWT } from "@/types/auth";
import jwtDecode from "jwt-decode";

export const JWTAuthorizationTokenName = "Token";

/**
 * Returns authorization header value by JWT Authorization token
 * @param type Type of authorization service
 * @returns authorization header value
 */
export function getAuthorizationHeader(
  type: "api" | "discord" = "api"
): string {
  const token = getJWT();

  if (type == "api") {
    return `Bearer ${token.rawToken}`;
  } else if (type == "discord" && token.userType == userType.discord) {
    return `Bearer ${token.discordAccessToken}`;
  }

  throw new Error("type is not valid.");
}

/**
 *
 * Returns JWT Authorization token or throws an error if it does not exist
 *
 * @returns User JWT Authorization token
 */
export function getJWT(): JWTWithRaw {
  const token = getJWTOrNull();

  if (!token)
    throw new Error("Unauthorized. A JWT token does not exist or have expired");

  return token;
}

/**
 *
 * Returns JWT Authorization token or null if it is not exist
 *
 * @returns User JWT Authorization token
 */
export function getJWTOrNull(): JWTWithRaw | null {
  const rawToken = localStorage.getItem(JWTAuthorizationTokenName);
  if (!rawToken) return null;

  const token: JWT = jwtDecode(rawToken);

  const tokenExp = new Date(0);
  tokenExp.setUTCSeconds(token.exp);

  if (tokenExp.getTime() < new Date().getTime()) {
    console.error("A JWT token has expired.");

    deleteJWT();

    return null;
  }

  return { ...token, rawToken };
}

/**
 * Setts user JWT Authorizaion token
 * @param rawToken JWT raw token
 */
export function setJWT(rawToken: string) {
  localStorage.setItem(JWTAuthorizationTokenName, rawToken);
}

/**
 * Deletes user jwt authorization token
 */
export function deleteJWT() {
  localStorage.removeItem(JWTAuthorizationTokenName);
}
