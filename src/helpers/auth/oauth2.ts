import { useErrorsStore } from "@/stores/errors";
import { baseURL } from "../app";
import {
  codeChallengeMethod,
  performFinalPKCE_flow,
  performInitialPKCE_flow,
} from "./pkce";
import authAPI from "@/helpers/auth/api";
import { setJWT } from "./jwt";

/**
 * OAuth2 redirect path (redirect_uri = host/redirect_path)
 * Uses by router
 */
export const redirect_path = "login_callback";

/**
 * OAuth2 redirect uri
 */
export const redirect_uri = `${baseURL}${redirect_path}`;

export type tokenResponse = {
  access_token: string;
  scope: "openid";
  id_token: string;
  token_type: "Bearer";
  expires_in: number;
};

/**
 * Performs an oauth2 authorize flow with an authorization server
 */
export async function OAuth2AuthorizeFlow() {
  const { codeChallenge } = performInitialPKCE_flow();

  let url = `${
    import.meta.env.VITE_AUTHORIZATION_SERVER_URL
  }/oauth2/authorize?`;

  url += `client_id=${import.meta.env.VITE_CLIENT_ID}&`;
  url += `redirect_uri=${redirect_uri}&`;
  url += `response_type=code&`;
  url += `scope=openid&`;
  url += `code_challenge=${codeChallenge}&`;
  url += `code_challenge_method=${codeChallengeMethod}`;

  const popup = window.open(url, "", "width=500,height=900");

  if (!popup) throw new Error("Cannot open popup");

  await new Promise((resolve) => {
    const interval = setInterval(async () => {
      if (popup.closed) {
        clearInterval(interval);
        resolve(undefined);
      }
    }, 100);
  });
}

/**
 *
 * Second path of the OAuth2 authorization flow.
 * Exchanges an access token
 *
 * @param code OAuth2 authorization code grant
 */
export async function OAuth2Callback(code: string) {
  const code_verifier: string = performFinalPKCE_flow();

  try {
    const response = await authAPI.postForm(`/oauth2/token`, {
      code,
      grant_type: "authorization_code",
      client_id: import.meta.env.VITE_CLIENT_ID,
      redirect_uri,
      code_verifier,
    });

    const data: tokenResponse = response.data;

    setJWT(data.access_token);

    window.close();
  } catch (e) {
    if (e instanceof Error)
      useErrorsStore().addError(
        `Something went wrong while logging with discord: ${e?.message ?? ""}`
      );
    else useErrorsStore().addError(`An unhandled error occurred`);
  }
}
