import { expect, Locator, Page } from "@playwright/test";
import { NavBar } from "../components/NavBar";

export class DishesPage {
  readonly page: Page;
  readonly root: Locator;

  // Nav
  readonly nav: NavBar;
  readonly logoutBtn: Locator;

  // Heading
  readonly companySelect: Locator;
  readonly heading: Locator;
  readonly createDishBtn: Locator;

  // Form
  readonly form: Locator;
  readonly formHeader: Locator;
  readonly nameInput: Locator;
  readonly nameError: Locator;
  readonly descriptionInput: Locator;
  readonly descriptionError: Locator;
  readonly categoryInput: Locator;
  readonly categoryError: Locator;
  readonly weightInput: Locator;
  readonly weightError: Locator;
  readonly priceInput: Locator;
  readonly priceError: Locator;
  readonly featuredInput: Locator;
  readonly colorBorderInput: Locator;
  readonly spicyLevelInput: Locator;
  readonly spicyLevelError: Locator;
  //
  readonly glutenInput: Locator;
  readonly halalInput: Locator;
  readonly kosherInput: Locator;
  readonly lactoseInput: Locator;
  readonly pascetarianInput: Locator;
  readonly veganInput: Locator;
  readonly vegetarianInput: Locator;
  //
  readonly image: Locator;
  readonly addImageBtn: Locator;
  readonly removeImageBtn: Locator;
  readonly modelInput: Locator;
  readonly model: Locator;
  readonly removeModelBtn: Locator;
  readonly openModelBtn: Locator;
  //
  readonly saveBtn: Locator;
  readonly deleteBtn: Locator;

  // Delete modal
  readonly confirmBtn: Locator;
  readonly cancelBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator("id=dishes");

    // Nav
    this.nav = new NavBar(page);
    this.logoutBtn = page.locator("id=logout-btn");

    // Heading
    this.companySelect = page.locator("id=company-select");
    this.heading = page.locator("id=dishes-heading");
    this.createDishBtn = page.locator("id=create-dish-btn");

    // Form
    this.form = page.locator("id=dish-form");
    this.formHeader = page.locator("id=form-header");
    this.nameInput = page.locator("id=name-input");
    this.nameError = this.nameInput.locator("..>>div");
    this.descriptionInput = page.locator("id=description-input");
    this.descriptionError = this.descriptionInput.locator("..>>div");
    this.categoryInput = page.locator("id=category-input");
    this.categoryError = this.categoryInput.locator("..>>div");
    this.weightInput = page.locator("id=weight-input");
    this.weightError = this.weightInput.locator("..>>div");
    this.priceInput = page.locator("id=price-input");
    this.priceError = this.priceInput.locator("..>>div");
    this.featuredInput = page.locator("id=featured-input");
    this.colorBorderInput = page.locator("id=color-border-input");
    this.spicyLevelInput = page.locator("id=spicy-level-input");
    this.spicyLevelError = this.spicyLevelInput.locator("..>>div");
    //
    this.glutenInput = page.locator("id=gluten-input");
    this.halalInput = page.locator("id=halal-input");
    this.kosherInput = page.locator("id=kosher-input");
    this.lactoseInput = page.locator("id=lactose-input");
    this.pascetarianInput = page.locator("id=pascetarian-input");
    this.veganInput = page.locator("id=vegan-input");
    this.vegetarianInput = page.locator("id=vegetarian-input");
    //
    this.image = page.locator("id=images>>img");
    this.addImageBtn = page.locator("id=add-images-btn");
    this.removeImageBtn = page.locator("id=images>>button");
    this.modelInput = page.locator("id=model-input");
    this.model = page.locator("id=model");
    this.removeModelBtn = this.model.locator("button");
    this.openModelBtn = page.locator("id=open-model-btn");
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

  public getDishCard(name: string) {
    return this.page.locator(`id=${name}`);
  }
}
