import type { JWTAuthorizationToken } from "@/types/api/base";
import jwtDecode from "jwt-decode";

export const JWTAuthorizationTokenName = "Token";

/**
 *
 * Returns JWT Authorization token or updates the page if it is not exist
 *
 * @returns User JWT Authorization token
 */
export function getJWTAuthorizationToken(): JWTAuthorizationToken & {
  rawToken: string;
} {
  const token = getJWTAuthorizationTokenOrNull();

  if (!token) {
    window.location.href = "/";

    throw new Error("A JWT token does not exist or have expired");
  }

  return token;
}

/**
 *
 * Returns JWT Authorization token or null if it is not exist
 *
 * @returns User JWT Authorization token
 */
export function getJWTAuthorizationTokenOrNull():
  | (JWTAuthorizationToken & { rawToken: string })
  | null {
  const rawToken = localStorage.getItem(JWTAuthorizationTokenName);
  if (!rawToken) return null;

  const token: JWTAuthorizationToken = jwtDecode(rawToken);

  const tokenExp = new Date(0);
  tokenExp.setUTCSeconds(token.exp);

  if (tokenExp.getTime() < new Date().getTime()) {
    deleteJWTAuthorizationToken();

    return null;
  }

  return { ...token, rawToken };
}

/**
 * Setts user JWT Authorizaion token
 * @param rawToken JWT raw token
 */
export function setJWTAuthorizationToken(rawToken: string) {
  localStorage.setItem(JWTAuthorizationTokenName, rawToken);
}

/**
 * Deletes user jwt authorization token
 */
export function deleteJWTAuthorizationToken() {
  localStorage.removeItem(JWTAuthorizationTokenName);
}
