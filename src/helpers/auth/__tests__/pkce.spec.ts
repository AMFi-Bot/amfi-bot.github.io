import { describe, it, expect } from "vitest";
import { generateCodeChallenge, generateCodeVerifier } from "../pkce";

describe("Check PKCE module on generate pkce challenges correctly", () => {
  it("Generates Challenge from the verifier correctly", () => {
    expect(
      generateCodeChallenge("awoierfjasofiuOPSDfjweajfp*7udf94ewjfas;ldfiu94j")
    ).toStrictEqual("qXM0lt75O_MY9uau9vdNqrQ15FsdKl71FfA7AE3v0a8");

    expect(generateCodeChallenge("Hello, world")).toStrictEqual(
      "SufDtqwL7_Zx76jPVzhhUcBuWMpTp42D82EHMWzsEl8"
    );

    expect(generateCodeChallenge("Привет, мир!")).toStrictEqual(
      "mgrwEWBaarkCLySPt5cGSkJ4IhCskeg0NIs-8IkxPl8"
    );
  });

  it("Generates verifier randomly", () => {
    const verifiers: string[] = [];

    for (let i = 0; i < 5000; i++) {
      const verifier = generateCodeVerifier();

      expect(verifiers).not.toContain(verifier);
      verifiers.push(verifier);
    }
  });
});
