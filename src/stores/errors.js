import { defineStore } from "pinia";

import { v4 } from "uuid";

export const useErrorsStore = defineStore("errors", {
  state: () => {
    return {
      errors: [],
    };
  },
  actions: {
    addError(text, cooldown = 10) {
      let id = v4();

      for (const error of this.errors) {
        if (error.text == text) {
          error.id = id;
          error.count++;

          setTimeout(() => this.removeError(id), cooldown * 1000);

          return;
        }
      }

      this.errors.push({ id, text, count: 1 });

      setTimeout(() => this.removeError(id), cooldown * 1000);
    },
    removeError(id) {
      this.errors = this.errors.filter((f) => f.id !== id);
    },
  },
});
