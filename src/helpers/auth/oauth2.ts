import { baseURL } from "../app";

/**
 * OAuth2 redirect path (redirect_uri = host/redirect_path)
 * Uses by router
 */
export const redirect_path = "login_callback";

/**
 * OAuth2 redirect uri
 */
export const redirect_uri = `${baseURL}${redirect_path}`;
