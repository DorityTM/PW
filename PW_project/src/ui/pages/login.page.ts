import { ICredentials } from "data/types/credentials.types";
import { SalesPortalPage } from "./salesPortal.page";

export class LoginPage extends SalesPortalPage {
  readonly signInPage = this.page.locator("#signInPage");
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator("button[type='submit']");
  readonly uniqueElement = this.signInPage;
  async fillCredentials(credentials: Partial<ICredentials>) {
    if (credentials.username) await this.emailInput.fill(credentials.username);
    if (credentials.password) await this.passwordInput.fill(credentials.password);
  }

  // async fillCredentials(email: string, password: string): Promise<void> {
  //   await this.emailInput.fill(credentials.username);
  //   await this.passwordInput.fill(credentials.password);
  // }

  async loginButtonClick(): Promise<void> {
    await this.loginButton.click();
  }
}
