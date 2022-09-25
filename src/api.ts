import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import _ from "lodash";

import nProgress from "./nprogress";

export const baseOptions: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  maxRedirects: 0,
};

axios.defaults = _.merge(axios.defaults, baseOptions);

export function defaulErrorHandler(error: AxiosError) {
  console.error(`Axios error: ${error.message}`);
  console.error(error);

  nProgress.done();

  throw error;
}

const api = axios.create(baseOptions);
api.interceptors.response.use((r) => r, defaulErrorHandler);

export default api;

export { api };
