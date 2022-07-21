import axiosm from "axios";
import _ from "lodash";

import nProgress from "./nProgress";

export const baseOptions = {
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  maxRedirects: 0,
};

axiosm.defaults = _.merge(axiosm.defaults, baseOptions);

export const defaulErrorHandler = (error) => {
  console.error(`Axios error: ${error.message}`);
  console.error(error);

  nProgress.done();

  throw error;
};

const axios = axiosm.create(baseOptions);
//axios.interceptors.response.use((r) => r, defaulErrorHandler);

export default axios;
