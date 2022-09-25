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

        return id;
      }

      this.errors.push({ id, text, count: 1 });

      setTimeout(() => this.removeError(id), cooldown * 1000);

      return id;
    },
    removeError(id: string) {
      this.errors = this.errors.filter((f) => !f || f.id !== id);
    },
  },
});
