import type {
  apiClientErrorResponseType,
  apiServerErrorResponseType,
} from "@/api";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

import { v4 } from "uuid";

type errorType = {
  text: string;
  count: number;
  id: string;
};

export const useErrorsStore = defineStore("errors", {
  state(): { errors: errorType[] } {
    return {
      errors: [],
    };
  },
  actions: {
    addError(text: string, cooldown = 20) {
      const id = v4();

      const last_error = this.errors[this.errors.length - 1];

      if (last_error && last_error.text == text) {
        last_error.id = id;
        last_error.count++;

        setTimeout(() => this.removeError(id), cooldown * 1000);

        return;
      }

      this.errors.push({ id, text, count: 1 });

      setTimeout(() => this.removeError(id), cooldown * 1000);
    },
    removeError(id: string) {
      this.errors = this.errors.filter((f) => !f || f.id !== id);
    },

    addAPIError(axios_error: AxiosError, message: string) {
      let error_message = `Oops, something went wrong: ${message || ""}`;

      const br_symbol = "\n";

      if (axios_error) {
        if (axios_error.message)
          error_message += br_symbol + axios_error.message;

        if (axios_error.response) {
          if (axios_error.response.status && axios_error.response.statusText)
            error_message +=
              br_symbol +
              axios_error.response.status +
              " " +
              axios_error.response.statusText;

          if (axios_error.response.data) {
            const clientError = <apiClientErrorResponseType>(
              axios_error.response.data
            );

            const serverError = <apiServerErrorResponseType>(
              axios_error.response.data
            );

            if (clientError.response_type === "Client error.") {
              if (clientError.error) {
                if (clientError.error.message) {
                  error_message += br_symbol + clientError.error.message;
                }
              }
            } else if (serverError.response_type === "Server error") {
              error_message +=
                br_symbol +
                `${serverError.response_type}. ${serverError.status} ${serverError.status_description}`;
            }
          }
        }
      }

      this.addError(error_message);
    },
  },
});
