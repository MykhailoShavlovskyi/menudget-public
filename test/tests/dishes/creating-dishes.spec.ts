import { expect, Locator, test } from "@playwright/test";
import {
  AppSession,
  closeSessions,
  createSessionPerRole,
  RoleSessions,
} from "../../utils/session";
import { Role } from "../../../serv/src/definitions/Role";
import db from "../../../serv/db/db";
import { dropFile, uploadFile } from "../../utils/file";

let sessions: RoleSessions;

const dishPageRegex = new RegExp(`/cms/dishes/[0-9]/[0-9]`);

test.beforeAll(async ({ browser }) => {
  // Create sessions
  sessions = await createSessionPerRole(browser, [
    Role.Admin,
    Role.Manager,
    Role.Waiter,
  ]);

  // Go to dishes page
  await Promise.all(
    Object.values(sessions).map((v) =>
      v?.page.goto(`${process.env.SERVER_URL}/cms/dishes/1`)
    )
  );
});

test.afterAll(() => closeSessions(sessions));

test.describe("Dishes Creating", () => {
  test("Open form", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Assert no form
      await expect(page.url()).toBe(`${process.env.SERVER_URL}/cms/dishes/1`);
      await expect(dishes.form).toBeHidden();

      // Open form, assert
      await dishes.createDishBtn.click();
      await page.waitForURL(`${process.env.SERVER_URL}/cms/dishes/1/new`);
      await expect(dishes.form).toBeVisible();
    };
    await Promise.all([
      test(sessions[Role.Admin]),
      test(sessions[Role.Manager]),
      test(sessions[Role.Waiter]),
    ]);
  });

  test("Form default values", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Assert form
      await expect(dishes.formHeader).toBeVisible();
      await expect(dishes.formHeader).toHaveText("Create dish");
      await expect(dishes.nameInput).toBeVisible();
      await expect(dishes.nameInput).toHaveValue("New dish");
      await expect(dishes.nameError).toBeHidden();
      await expect(dishes.descriptionInput).toBeVisible();
      await expect(dishes.descriptionInput).toHaveValue("This is a tasty dish");
      await expect(dishes.categoryInput).toBeVisible();
      await expect(dishes.categoryInput).toHaveValue("New category");
      await expect(dishes.categoryError).toBeHidden();
      await expect(dishes.weightInput).toBeVisible();
      await expect(dishes.weightInput).toHaveValue("1");
      await expect(dishes.weightError).toBeHidden();
      await expect(dishes.priceInput).toBeVisible();
      await expect(dishes.priceInput).toHaveValue("1");
      await expect(dishes.priceError).toBeHidden();
      await expect(dishes.spicyLevelInput).toBeVisible();
      await expect(dishes.spicyLevelInput).toHaveValue("0");
      await expect(dishes.spicyLevelError).toBeHidden();
      await expect(dishes.openModelBtn).toBeVisible();
      await expect(dishes.openModelBtn).toBeEnabled();
      //
      await expect(dishes.glutenInput).toBeVisible();
      await expect(dishes.glutenInput).toBeEnabled();
      await expect(dishes.halalInput).toBeVisible();
      await expect(dishes.halalInput).toBeEnabled();
      await expect(dishes.kosherInput).toBeVisible();
      await expect(dishes.kosherInput).toBeEnabled();
      await expect(dishes.lactoseInput).toBeVisible();
      await expect(dishes.lactoseInput).toBeEnabled();
      await expect(dishes.pascetarianInput).toBeVisible();
      await expect(dishes.pascetarianInput).toBeEnabled();
      await expect(dishes.veganInput).toBeVisible();
      await expect(dishes.veganInput).toBeEnabled();
      await expect(dishes.vegetarianInput).toBeVisible();
      await expect(dishes.vegetarianInput).toBeEnabled();
      //
      await expect(dishes.featuredInput).toBeVisible();
      await expect(dishes.featuredInput).not.toBeChecked();
      await expect(dishes.colorBorderInput).toBeVisible();
      await expect(dishes.colorBorderInput).not.toBeChecked();
      //
      await expect(dishes.image).toBeHidden();
      await expect(dishes.addImageBtn).toBeVisible();
      await expect(dishes.removeImageBtn).toBeHidden();
      await expect(dishes.modelInput).toBeVisible();
      await expect(dishes.openModelBtn).toBeVisible();
      //
      await expect(dishes.saveBtn).toBeVisible();
      await expect(dishes.saveBtn).toBeEnabled();
      await expect(dishes.deleteBtn).toBeHidden();
    };
    await Promise.all([
      test(sessions[Role.Admin]),
      test(sessions[Role.Manager]),
      test(sessions[Role.Waiter]),
    ]);
  });

  test("Name", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Empty name
      await dishes.nameInput.fill("");
      await dishes.form.click();
      await expect(dishes.nameError).toHaveText("Name is a required field");

      // Edit name
      await dishes.nameInput.fill("Cool dish");
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishPageRegex.test(page.url())).toBe(true);
        await expect(dishes.formHeader).toHaveText("Edit dish");
        await expect(dishes.nameInput).toHaveValue("Cool dish");

        const card = dishes.getDishCard("Cool dish");
        await expect(card).toHaveText("Cool dishThis is a tasty dish");
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "Cool dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Description", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Edit description
      await dishes.descriptionInput.fill("Custom description");
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishPageRegex.test(page.url())).toBe(true);
        await expect(dishes.formHeader).toHaveText("Edit dish");
        await expect(dishes.descriptionInput).toHaveValue("Custom description");

        const card = dishes.getDishCard("New dish");
        await expect(card).toHaveText("New dishCustom description");
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "New dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Category", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Edit description
      await dishes.categoryInput.fill("Custom category");
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishPageRegex.test(page.url())).toBe(true);
        await expect(dishes.formHeader).toHaveText("Edit dish");
        await expect(dishes.categoryInput).toHaveValue("Custom category");
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "New dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Weight", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Edit description
      await dishes.weightInput.fill("400");
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishPageRegex.test(page.url())).toBe(true);
        await expect(dishes.formHeader).toHaveText("Edit dish");
        await expect(dishes.weightInput).toHaveValue("400");
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "New dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Price", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Edit description
      await dishes.priceInput.fill("25");
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishPageRegex.test(page.url())).toBe(true);
        await expect(dishes.formHeader).toHaveText("Edit dish");
        await expect(dishes.priceInput).toHaveValue("25");
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "New dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Spicy level", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Edit description
      await dishes.spicyLevelInput.fill("3");
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishPageRegex.test(page.url())).toBe(true);
        await expect(dishes.formHeader).toHaveText("Edit dish");
        await expect(dishes.spicyLevelInput).toHaveValue("3");
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "New dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  // TODO ingredients

  test("Labels", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Edit labels
      await dishes.halalInput.click({ force: true });
      await dishes.veganInput.click({ force: true });
      await dishes.vegetarianInput.click({ force: true });
      await dishes.vegetarianInput.click({ force: true });
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishPageRegex.test(page.url())).toBe(true);
        await expect(dishes.glutenInput).not.toBeChecked();
        await expect(dishes.halalInput).toBeChecked();
        await expect(dishes.kosherInput).not.toBeChecked();
        await expect(dishes.lactoseInput).not.toBeChecked();
        await expect(dishes.lactoseInput).not.toBeChecked();
        await expect(dishes.pascetarianInput).not.toBeChecked();
        await expect(dishes.veganInput).toBeChecked();
        await expect(dishes.vegetarianInput).not.toBeChecked();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "New dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Featured", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Edit featured
      await dishes.featuredInput.click();
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishPageRegex.test(page.url())).toBe(true);
        await expect(dishes.featuredInput).toBeChecked();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "New dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Color border", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Edit color border
      await dishes.colorBorderInput.click();
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishPageRegex.test(page.url())).toBe(true);
        await expect(dishes.colorBorderInput).toBeChecked();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "New dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Add 1 Image", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Upload image
      await uploadFile(page, "./uploads/image-1.png", () =>
        dishes.addImageBtn.click()
      );
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishes.image).toBeVisible();
        await expect(dishes.image).toHaveScreenshot("image-1.png");
        await expect(dishes.removeImageBtn).toBeVisible();
        await expect(dishes.removeImageBtn).toBeEnabled();
        await expect(dishes.getDishCard("New dish")).toHaveScreenshot(
          "image-1-card.png"
        );
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "New dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Add 2 Images", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Upload image
      await uploadFile(page, "./uploads/image-1.png", () =>
        dishes.addImageBtn.click()
      );
      await uploadFile(page, "./uploads/image-2.png", () =>
        dishes.addImageBtn.click()
      );
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishes.image.first()).toBeVisible();
        await expect(dishes.image.first()).toHaveScreenshot("image-1.png");
        await expect(dishes.removeImageBtn.first()).toBeVisible();
        await expect(dishes.removeImageBtn.first()).toBeEnabled();

        await expect(dishes.image.nth(1)).toBeVisible();
        await expect(dishes.image.nth(1)).toHaveScreenshot("image-2.png");
        await expect(dishes.removeImageBtn.nth(1)).toBeVisible();
        await expect(dishes.removeImageBtn.nth(1)).toBeEnabled();

        await expect(dishes.getDishCard("New dish")).toHaveScreenshot(
          "image-1-card.png"
        );
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "New dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Remove image", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Upload image
      await uploadFile(page, "./uploads/image-1.png", () =>
        dishes.addImageBtn.click()
      );
      await dishes.removeImageBtn.click();
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishes.image).toBeHidden();
        await expect(dishes.removeImageBtn).toBeHidden();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "New dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Add model", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Upload model
      await dropFile(page, "id=model-input>>div>>nth=0", "./uploads/cube.glb");
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishes.model).toBeVisible();
        await expect(dishes.model.locator("div")).toHaveText("model");
        await expect(dishes.removeModelBtn).toBeVisible();
        await expect(dishes.removeModelBtn).toBeEnabled();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "New dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Remove model", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to new dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);

      // Upload model, remove
      await dropFile(page, "id=model-input>>div>>nth=0", "./uploads/cube.glb");
      await dishes.removeModelBtn.click();
      await dishes.saveBtn.click();
      await page.waitForURL((url) => dishPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(dishes.model).toBeHidden();
        await expect(dishes.removeModelBtn).toBeHidden();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.deleteMany({ where: { name: "New dish" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });
});
