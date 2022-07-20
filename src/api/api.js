import axios from "axios";

import { baseOptions } from "../axios";
import _ from "lodash";

import { useErrorsStore } from "../stores/errors";

export const apiOptions = _.merge(baseOptions, {});

export const apiErrorHandler = (error) => {
  console.error(`API returned an error: ${error.message}`);
  console.error(error);

  const errorsStore = useErrorsStore();
  errorsStore.addAPIError(error);

  throw error;
};

export const apiWithoutErrorHandler = axios.create(apiOptions);

const api = axios.create(apiOptions);
api.interceptors.response.use((r) => r, apiErrorHandler);

export { api };

export default api;
