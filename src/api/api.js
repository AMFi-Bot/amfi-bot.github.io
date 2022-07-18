import axios from "axios";

import { useErrorsStore } from "../stores/errors";
const errorsStore = useErrorsStore();

export const apiOptions = {
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
};

export const apiErrorHandler = (error) => {
  console.error(`API returned an error: ${error.message}`);
  errorsStore.addAPIError(error);

  throw error;
};

export const apiWithoutErrorHandler = axios.create(apiOptions);

const api = axios.create(apiOptions);
api.interceptors.response.use((r) => r, apiErrorHandler);

export { api };

export default api;
