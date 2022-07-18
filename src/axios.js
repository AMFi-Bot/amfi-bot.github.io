import axios from "axios";

export const defaulErrorHandler = (error) => {
  console.error(`Axios error: ${error.message}`);
  console.error(error);
};

export default axios.create();

import { apiErrorHandler, api } from "./api/api";

export { apiErrorHandler, api };
