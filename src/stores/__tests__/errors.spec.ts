import { setActivePinia, createPinia } from "pinia";
import { useErrorsStore } from "../errors";

import { describe, it, expect, beforeEach } from "vitest";

describe("Counter Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("error adds", () => {
    const errorsStore = useErrorsStore();
    expect(errorsStore.errors).toStrictEqual([]);
    const errorText = "error";
    const id = errorsStore.addError(errorText);
    expect(errorsStore.errors).toStrictEqual([
      { text: errorText, count: 1, id },
    ]);
  });

  it("error removes", () => {
    const errorsStore = useErrorsStore();
    expect(errorsStore.errors).toStrictEqual([]);
    const errorText = "error";
    const id = errorsStore.addError(errorText);
    expect(errorsStore.errors).toStrictEqual([
      { text: errorText, count: 1, id },
    ]);
    errorsStore.removeError(id);
    expect(errorsStore.errors).toStrictEqual([]);
  });
});
