import { SalesPortalPage } from "./salesPortal.page";
import { credentials } from "config/env";

export class LoginPage extends SalesPortalPage {
  readonly signInPage = this.page.locator("#signInPage");
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator("button[type='submit']");
  readonly uniqueElement = this.signInPage;

  async fillCredentials(email: string, password: string): Promise<void> {
    await this.emailInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
  }

  async loginButtonClick(): Promise<void> {
    await this.loginButton.click();
  }
}
