import { expect, Locator, Page } from "@playwright/test";
import { NavBar } from "../components/NavBar";

export class WaitersPages {
  readonly page: Page;
  readonly root: Locator;

  // Nav
  readonly nav: NavBar;
  readonly logoutBtn: Locator;

  // Heading
  readonly companySelect: Locator;
  readonly heading: Locator;
  readonly createWaiterBtn: Locator;

  // Form
  readonly form: Locator;
  readonly formHeader: Locator;
  readonly nameInput: Locator;
  readonly nameError: Locator;
  readonly emailInput: Locator;
  readonly emailError: Locator;
  //
  readonly saveBtn: Locator;
  readonly deleteBtn: Locator;

  // Delete modal
  readonly confirmBtn: Locator;
  readonly cancelBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator("id=waiters");

    // Nav
    this.nav = new NavBar(page);
    this.logoutBtn = page.locator("id=logout-btn");

    // Heading
    this.companySelect = page.locator("id=company-select");
    this.heading = page.locator("id=waiters-heading");
    this.createWaiterBtn = page.locator("id=create-waiter-btn");

    // Form
    this.form = page.locator("id=waiter-form");
    this.formHeader = page.locator("id=form-header");
    this.nameInput = page.locator("id=name-input");
    this.nameError = this.nameInput.locator("..>>div");
    this.emailInput = page.locator("id=email-input");
    this.emailError = this.emailInput.locator("..>>div");
    //
    this.saveBtn = page.locator("id=save-btn");
    this.deleteBtn = page.locator("id=delete-btn");

    // Delete modal
    this.confirmBtn = page.locator("id=confirm-btn");
    this.cancelBtn = page.locator("id=cancel-btn");
  }

  public async assert(url: string, title: string) {
    await expect(this.page.url()).toBe(url);
    await expect(await this.page.title()).toBe(title);

    await expect(this.root).toBeVisible();
    await expect(this.logoutBtn).toBeVisible();
    await expect(this.logoutBtn).toBeEnabled();
    await expect(this.heading).toBeVisible();
  }

  public getWaiterCard(email: string) {
    return this.page.locator(`id=${email}`);
  }
}
