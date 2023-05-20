import { generateCodeVerifier } from "./pkce";

/**
 * Manages setters of the user
 *
 * Protects the user value to be setted unexpectedly, for example
 * when old instance setts user that has already setted by the new one.
 */
export class UserSetManager {
  /**
   * Approved setters of the user (that can manage user)
   */
  private setters: string[] = [];

  /**
   * addSetter
   */
  public addSetter(setter: string) {
    this.setters.push(setter);
  }

  /**
   * addSetter
   */
  public addSetters(setters: string[]) {
    this.setters.push(...setters);
  }

  /**
   * deleteSetter
   */
  public deleteSetter(setter: string) {
    this.setters.filter((c) => c != setter);
  }

  /**
   * clearSetters
   */
  public clearSetters() {
    this.setters = [];
  }

  /**
   * approveSetter
   *
   * approves that given setter exists in setters list
   */
  public approveSetter(setter: string): boolean {
    return this.setters.find((c) => c == setter) ? true : false;
  }

  /**
   * initNewSetter
   */
  public initNewSetter() {
    const setter = generateCodeVerifier();

    this.addSetter(setter);

    return setter;
  }

  /**
   * Cleares the setters list and creates a new setter
   */
  public reinitSetter() {
    this.clearSetters();

    return this.initNewSetter();
  }
}
