import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly forgotPassWordLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("id=email-input");
    this.passwordInput = page.locator("id=password-input");
    this.loginBtn = page.locator("id=submit-btn");
    this.forgotPassWordLink = page.locator("id=forgot-password-link");
  }

  public async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  public async assert() {
    await expect(await this.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await expect(await this.page.title()).toBe("Log In - Menudget");
    await expect(this.emailInput).toBeVisible();
    await expect(this.emailInput).toBeEnabled();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordInput).toBeEnabled();
    await expect(this.loginBtn).toBeVisible();
    await expect(this.loginBtn).toBeEnabled();
    await expect(this.forgotPassWordLink).toBeVisible();
  }
}
