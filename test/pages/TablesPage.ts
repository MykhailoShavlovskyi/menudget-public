import { expect, Locator, Page } from "@playwright/test";
import { NavBar } from "../components/NavBar";

export class TablesPage {
  readonly page: Page;
  readonly root: Locator;

  // Nav
  readonly nav: NavBar;
  readonly logoutBtn: Locator;

  // Heading
  readonly companySelect: Locator;
  readonly heading: Locator;
  readonly createTableBtn: Locator;

  // Form
  readonly form: Locator;
  readonly formHeader: Locator;
  readonly nameInput: Locator;
  readonly nameError: Locator;
  //
  readonly saveBtn: Locator;
  readonly deleteBtn: Locator;

  // Delete modal
  readonly confirmBtn: Locator;
  readonly cancelBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator("id=tables");

    // Nav
    this.nav = new NavBar(page);
    this.logoutBtn = page.locator("id=logout-btn");

    // Heading
    this.companySelect = page.locator("id=company-select");
    this.heading = page.locator("id=tables-heading");
    this.createTableBtn = page.locator("id=create-table-btn");

    // Form
    this.form = page.locator("id=table-form");
    this.formHeader = page.locator("id=form-header");
    this.nameInput = page.locator("id=name-input");
    this.nameError = this.nameInput.locator("..>>div");
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

  public getTableCard(name: string) {
    return this.page.locator(`id=${name}`);
  }
}
