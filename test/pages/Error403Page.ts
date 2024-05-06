import { expect, Locator, Page } from "@playwright/test";

export class Error403Page {
  public readonly error: Locator;

  constructor(page: Page) {
    this.error = page.locator("id=error-403");
  }

  public async assert() {
    await expect(this.error).toBeVisible();
    await expect(this.error).toHaveText("403This page could not be displayed.");
  }
}
