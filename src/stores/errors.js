import { defineStore } from "pinia";

import { v4 } from "uuid";

export const useErrorsStore = defineStore("errors", {
  state() {
    return {
      errors: [],
    };
  },
  actions: {
    addError(text, cooldown = 20) {
      let id = v4();

      let last_error = this.errors[this.errors.length - 1];

      if (last_error && last_error.text == text) {
        last_error.id = id;
        last_error.count++;

        setTimeout(() => this.removeError(id), cooldown * 1000);

        return;
      }

      this.errors.push({ id, text, count: 1 });

      setTimeout(() => this.removeError(id), cooldown * 1000);
    },
    removeError(id) {
      this.errors = this.errors.filter((f) => f.id !== id);
    },

    addAPIError(axios_error, message) {
      var error_message = `Oops, something went wrong: ${message || ""}`;

      var br_symbol = "\n";

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
            if (axios_error.response.data.message)
              error_message += br_symbol + axios_error.response.data.message;

            if (axios_error.response.data.error) {
              if (axios_error.response.data.error.message) {
                error_message +=
                  br_symbol + axios_error.response.data.error.message;
              }
            }
            if (axios_error.response.data.data) {
              if (axios_error.response.data.data.message) {
                error_message +=
                  br_symbol + axios_error.response.data.data.message;
              }
            }
          }
        }
      }

      this.addError(error_message);
    },
  },
});
