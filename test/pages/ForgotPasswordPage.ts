import { Locator, Page } from "@playwright/test";

export class ForgotPasswordPage {
  readonly emailInput: Locator;
  readonly resetBtn: Locator;
  readonly submittedMessage: Locator;

  constructor(page: Page) {
    this.emailInput = page.locator("id=email-input");
    this.resetBtn = page.locator("id=submit-btn");
    this.submittedMessage = page.locator("id=request-submitted-message");
  }
}
