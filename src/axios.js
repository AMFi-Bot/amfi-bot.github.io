import axiosm from "axios";
import _ from "lodash";

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

  throw error;
};

const axios = axiosm.create(baseOptions);
//axios.interceptors.response.use((r) => r, defaulErrorHandler);

export default axios;
