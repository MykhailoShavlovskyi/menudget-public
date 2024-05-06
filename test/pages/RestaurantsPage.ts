import { expect, Locator, Page } from "@playwright/test";
import { NavBar } from "../components/NavBar";

export class RestaurantsPage {
  readonly page: Page;
  readonly root: Locator;

  // Nav
  readonly nav: NavBar;
  readonly logoutBtn: Locator;

  // Heading
  readonly heading: Locator;
  readonly createRestaurantBtn: Locator;

  // Form
  readonly form: Locator;
  readonly formHeader: Locator;
  readonly nameInput: Locator;
  readonly managerEmailInput: Locator;
  readonly descriptionInput: Locator;
  //
  readonly monOpen: Locator;
  readonly tueOpen: Locator;
  readonly wedOpen: Locator;
  readonly thuOpen: Locator;
  readonly friOpen: Locator;
  readonly satOpen: Locator;
  readonly sunOpen: Locator;
  //
  readonly monClose: Locator;
  readonly tueClose: Locator;
  readonly wedClose: Locator;
  readonly thuClose: Locator;
  readonly friClose: Locator;
  readonly satClose: Locator;
  readonly sunClose: Locator;
  //
  readonly logo: Locator;
  readonly addLogoBtn: Locator;
  readonly removeLogoBtn: Locator;
  readonly removeBannerBtn: Locator;
  readonly banner: Locator;
  readonly addBannerBtn: Locator;
  //
  readonly saveBtn: Locator;
  readonly deleteBtn: Locator;

  // Delete modal
  readonly confirmBtn: Locator;
  readonly cancelBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator("id=restaurants");

    // Nav
    this.nav = new NavBar(page);
    this.logoutBtn = page.locator("id=logout-btn");

    // Heading
    this.heading = page.locator("id=restaurants-heading");
    this.createRestaurantBtn = page.locator("id=create-restaurant-btn");

    // Form
    this.form = page.locator("id=restaurant-form");
    this.formHeader = page.locator("id=form-header");
    this.nameInput = page.locator("id=name-input");
    this.managerEmailInput = page.locator("id=manager-email-input");
    this.descriptionInput = page.locator("id=description-input");
    //
    this.monOpen = page.locator("id=mon-open-input");
    this.tueOpen = page.locator("id=tue-open-input");
    this.wedOpen = page.locator("id=wed-open-input");
    this.thuOpen = page.locator("id=thu-open-input");
    this.friOpen = page.locator("id=fri-open-input");
    this.satOpen = page.locator("id=sat-open-input");
    this.sunOpen = page.locator("id=sun-open-input");
    //
    this.monClose = page.locator("id=mon-close-input");
    this.tueClose = page.locator("id=tue-close-input");
    this.wedClose = page.locator("id=wed-close-input");
    this.thuClose = page.locator("id=thu-close-input");
    this.friClose = page.locator("id=fri-close-input");
    this.satClose = page.locator("id=sat-close-input");
    this.sunClose = page.locator("id=sun-close-input");
    //
    this.logo = page.locator("id=logo>>img");
    this.addLogoBtn = page.locator("id=add-logo-btn");
    this.removeLogoBtn = page.locator("id=logo>>button");
    this.banner = page.locator("id=banner>>img");
    this.addBannerBtn = page.locator("id=add-banner-btn");
    this.removeBannerBtn = page.locator("id=banner>>button");

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
    await expect(this.heading).toHaveText("Restaurants");
    await expect(this.createRestaurantBtn).toBeVisible();
  }

  public getRestaurantCard(name: string) {
    return this.page.locator(`id=${name}`);
  }
}
