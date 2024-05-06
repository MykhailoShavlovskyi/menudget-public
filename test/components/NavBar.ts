import { expect, Locator, Page } from "@playwright/test";

export class NavBar {
  readonly restaurantsAnchor: Locator;
  readonly dishesAnchor: Locator;
  readonly ordersAnchor: Locator;
  readonly tablesAnchor: Locator;
  readonly waitersAnchor: Locator;

  public constructor(page: Page) {
    this.restaurantsAnchor = page.getByRole("link", { name: "Restaurants" });
    this.dishesAnchor = page.getByRole("link", { name: "Dishes" });
    this.ordersAnchor = page.getByRole("link", { name: "Orders" });
    this.tablesAnchor = page.getByRole("link", { name: "Tables" });
    this.waitersAnchor = page.getByRole("link", { name: "Waiters" });
  }

  private isSelected(locator: Locator) {
    return locator.evaluate((el) =>
      getComputedStyle(el).borderBottom.includes("2px")
    );
  }

  public async assertAdmin(
    selected: "Restaurants" | "Dishes" | "Orders" | "Tables" | "Waiters"
  ) {
    await expect(this.restaurantsAnchor).toBeVisible();
    await expect(this.dishesAnchor).toBeVisible();
    await expect(this.ordersAnchor).toBeVisible();
    await expect(this.tablesAnchor).toBeVisible();
    await expect(this.waitersAnchor).toBeVisible();

    await expect(
      await this.isSelected(this.restaurantsAnchor.locator(".."))
    ).toBe(selected === "Restaurants");
    await expect(await this.isSelected(this.dishesAnchor.locator(".."))).toBe(
      selected === "Dishes"
    );
    await expect(await this.isSelected(this.ordersAnchor.locator(".."))).toBe(
      selected === "Orders"
    );
    await expect(await this.isSelected(this.tablesAnchor.locator(".."))).toBe(
      selected === "Tables"
    );
    await expect(await this.isSelected(this.waitersAnchor.locator(".."))).toBe(
      selected === "Waiters"
    );
  }

  public async assertManager(
    selected: "Restaurants" | "Dishes" | "Orders" | "Tables" | "Waiters"
  ) {
    await expect(this.restaurantsAnchor).toBeHidden();
    await expect(this.dishesAnchor).toBeVisible();
    await expect(this.ordersAnchor).toBeVisible();
    await expect(this.tablesAnchor).toBeVisible();
    await expect(this.waitersAnchor).toBeVisible();

    await expect(await this.isSelected(this.dishesAnchor.locator(".."))).toBe(
      selected === "Dishes"
    );
    await expect(await this.isSelected(this.ordersAnchor.locator(".."))).toBe(
      selected === "Orders"
    );
    await expect(await this.isSelected(this.tablesAnchor.locator(".."))).toBe(
      selected === "Tables"
    );
    await expect(await this.isSelected(this.waitersAnchor.locator(".."))).toBe(
      selected === "Waiters"
    );
  }

  public async assertWaiter(
    selected: "Restaurants" | "Dishes" | "Orders" | "Tables" | "Waiters"
  ) {
    await expect(this.restaurantsAnchor).toBeHidden();
    await expect(this.dishesAnchor).toBeVisible();
    await expect(this.ordersAnchor).toBeVisible();
    await expect(this.tablesAnchor).toBeVisible();
    await expect(this.waitersAnchor).toBeHidden();

    await expect(await this.isSelected(this.dishesAnchor.locator(".."))).toBe(
      selected === "Dishes"
    );
    await expect(await this.isSelected(this.ordersAnchor.locator(".."))).toBe(
      selected === "Orders"
    );
    await expect(await this.isSelected(this.tablesAnchor.locator(".."))).toBe(
      selected === "Tables"
    );
  }
}
