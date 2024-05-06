import { expect, Locator, Page } from "@playwright/test";
import { NavBar } from "../components/NavBar";

export class OrdersPage {
  readonly page: Page;
  readonly root: Locator;

  // Nav
  readonly nav: NavBar;
  readonly logoutBtn: Locator;

  // Heading
  readonly companySelect: Locator;
  readonly heading: Locator;

  // Grid
  readonly pendingOrders: Locator;
  readonly inProgressOrders: Locator;
  readonly doneOrders: Locator;
  readonly orderDeleteDropArea: Locator;

  // Delete modal
  readonly confirmBtn: Locator;
  readonly cancelBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator("id=orders");

    // Nav
    this.nav = new NavBar(page);
    this.logoutBtn = page.locator("id=logout-btn");

    // Heading
    this.companySelect = page.locator("id=company-select");
    this.heading = page.locator("id=orders-heading");

    // Grid
    this.pendingOrders = page.locator("id=pending-orders");
    this.inProgressOrders = page.locator("id=in-progress-orders");
    this.doneOrders = page.locator("id=done-orders");
    this.orderDeleteDropArea = page.locator("id=order-delete-drop-area");

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

  public getOrderCard(id: number) {
    return this.page.locator(`id=${id}`);
  }
}
