import { expect, Locator, Page } from "@playwright/test";

export class Error404Page {
  readonly page: Page;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.error = page.locator("id=error-404");
  }

  public async assert(url: string) {
    await expect(this.page.url()).toBe(url);
    await expect(await this.page.title()).toBe(
      "404: This page could not be found"
    );

    await expect(this.error).toBeVisible();
    await expect(this.error).toHaveText("404This page could not be found.");
  }
}
