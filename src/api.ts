import axios, { AxiosError, type CreateAxiosDefaults } from "axios";

export const baseOptions: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  maxRedirects: 0,
};

export function defaulErrorHandler(error: AxiosError) {
  console.error(`Axios error: ${error.message}`);
  console.error(error);

  throw error;
}

const api = axios.create(baseOptions);
api.interceptors.response.use((r) => r, defaulErrorHandler);

export default api;

export { api };
