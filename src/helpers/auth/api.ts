import { getAxiosInstance } from "../microservices/api";

/**
 * base URL for the authorization server microservice
 */
export const baseURL = import.meta.env.VITE_AUTHORIZATION_SERVER_URL;

export default getAxiosInstance(baseURL);
