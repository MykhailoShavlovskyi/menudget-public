import { expect, test } from "@playwright/test";
import {
  AppSession,
  closeSessions,
  createSessionPerRole,
  forAllSessions,
  RoleSessions,
} from "../../utils/session";
import { Role } from "../../../serv/src/definitions/Role";
import db from "../../../serv/db/db";
import { getElementBorder } from "../../utils/element";
import { dropFile, uploadFile } from "../../utils/file";

let sessions: RoleSessions;
let dishId;

test.beforeAll(async ({ browser }) => {
  // Create sessions
  sessions = await createSessionPerRole(browser, [
    Role.Admin,
    Role.Manager,
    Role.Waiter,
  ]);

  // Create dish
  const dish = await db.dish.create({
    data: { restaurantId: 1, name: "Edit test" },
    select: { id: true },
  });
  dishId = dish.id;
});

test.afterAll(async () => {
  // Delete dish
  await db.dish.delete({ where: { id: dishId } });

  // Close sessions
  await closeSessions(sessions);
});

test.describe("Dishes Editing", () => {
  test("Select dish", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dishes page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1`);

      // Select dish
      const card1 = dishes.getDishCard("Edit test");
      await expect(await getElementBorder(card1)).toBe("0px none rgb(0, 0, 0)");
      await card1.click();
      await page.waitForURL((url) =>
        new RegExp("/cms/dishes/[0-9]/[0-9]").test(url.pathname)
      );
      await expect(await getElementBorder(card1)).not.toBe(
        "0px none rgb(0, 0, 0)"
      );
      await expect(dishes.nameInput).toHaveValue("Edit test");
    };
    await forAllSessions(sessions, test);
  });

  test("Form default values", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Assert form
      await expect(dishes.formHeader).toBeVisible();
      await expect(dishes.formHeader).toHaveText("Edit dish");
      await expect(dishes.nameInput).toBeVisible();
      await expect(dishes.nameInput).toHaveValue("Edit test");
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
      await expect(dishes.deleteBtn).toBeVisible();
      await expect(dishes.deleteBtn).toBeEnabled();
    };
    await forAllSessions(sessions, test);
  });

  // TODO all field errors

  test("Name", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Edit name
      await dishes.nameInput.fill("Edited name");
      await dishes.saveBtn.click();
      await page.waitForTimeout(25);

      // Assert
      const assert = async () => {
        await expect(dishes.nameInput).toHaveValue("Edited name");
        await expect(dishes.getDishCard("Edited name")).toBeVisible();
        await expect(dishes.getDishCard("Edited name")).toHaveText(
          "Edited nameThis is a tasty dish"
        );
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.update({
        where: { id: dishId },
        data: { name: "Edit test" },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Description", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Edit name
      await dishes.descriptionInput.fill("Edited description");
      await dishes.saveBtn.click();
      await page.waitForTimeout(25);

      // Assert
      const assert = async () => {
        await expect(dishes.descriptionInput).toHaveValue("Edited description");
        await expect(dishes.getDishCard("Edit test")).toHaveText(
          "Edit testEdited description"
        );
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.update({
        where: { id: dishId },
        data: { description: "This is a tasty dish" },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Category", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Edit name
      await dishes.categoryInput.fill("Edited category");
      await dishes.saveBtn.click();
      await page.waitForTimeout(25);

      // Assert
      const assert = async () => {
        await expect(dishes.categoryInput).toHaveValue("Edited category");
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.update({
        where: { id: dishId },
        data: { category: "New category" },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Weight", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Edit name
      await dishes.weightInput.fill("600");
      await page.waitForTimeout(25);
      await dishes.saveBtn.click();
      await page.waitForTimeout(25);

      // Assert
      const assert = async () => {
        await expect(dishes.weightInput).toHaveValue("600");
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.update({
        where: { id: dishId },
        data: { weight: 1 },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Price", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Edit name
      await dishes.priceInput.fill("26");
      await dishes.saveBtn.click();
      await page.waitForTimeout(25);

      // Assert
      const assert = async () => {
        await expect(dishes.priceInput).toHaveValue("26");
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.update({
        where: { id: dishId },
        data: { price: 1 },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Spicy level", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Edit name
      await dishes.spicyLevelInput.fill("3");
      await dishes.saveBtn.click();
      await page.waitForTimeout(25);

      // Assert
      const assert = async () => {
        await expect(dishes.spicyLevelInput).toHaveValue("3");
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.update({
        where: { id: dishId },
        data: { spicyLevel: 0 },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  // TODO ingredients

  test("Labels", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Edit name
      await dishes.halalInput.click({ force: true });
      await dishes.pascetarianInput.click({ force: true });
      await dishes.lactoseInput.click({ force: true });
      await dishes.lactoseInput.click({ force: true });
      await dishes.saveBtn.click();
      await page.waitForTimeout(25);

      // Assert
      const assert = async () => {
        await expect(dishes.glutenInput).not.toBeChecked();
        await expect(dishes.halalInput).toBeChecked();
        await expect(dishes.kosherInput).not.toBeChecked();
        await expect(dishes.lactoseInput).not.toBeChecked();
        await expect(dishes.lactoseInput).not.toBeChecked();
        await expect(dishes.pascetarianInput).toBeChecked();
        await expect(dishes.veganInput).not.toBeChecked();
        await expect(dishes.vegetarianInput).not.toBeChecked();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.update({
        where: { id: dishId },
        data: { labels: [] },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Featured", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Edit featured
      await dishes.featuredInput.click();
      await dishes.saveBtn.click();
      await page.waitForTimeout(25);

      // Assert
      const assert = async () => {
        await expect(dishes.featuredInput).toBeChecked();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.update({
        where: { id: dishId },
        data: { featured: false },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Color border", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Edit color border
      await dishes.colorBorderInput.click();
      await dishes.saveBtn.click();
      await page.waitForTimeout(25);

      // Assert
      const assert = async () => {
        await expect(dishes.colorBorderInput).toBeChecked();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.update({
        where: { id: dishId },
        data: { colorBorder: false },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Add 1 image", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Upload image
      await uploadFile(page, "./uploads/image-1.png", () =>
        dishes.addImageBtn.click()
      );
      await dishes.saveBtn.click();
      await page.waitForTimeout(500);

      // Assert
      const assert = async () => {
        await expect.soft(dishes.image).toBeVisible();
        await expect(dishes.removeImageBtn).toBeVisible();
        await expect(dishes.removeImageBtn).toBeEnabled();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.update({ where: { id: dishId }, data: { imageKeys: [] } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Add 2 images", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Upload 2 images
      await uploadFile(page, "./uploads/image-1.png", () =>
        dishes.addImageBtn.click()
      );
      await dishes.saveBtn.click();
      await page.waitForTimeout(500);
      await uploadFile(page, "./uploads/image-2.png", () =>
        dishes.addImageBtn.click()
      );
      await dishes.saveBtn.click();
      await page.waitForTimeout(500);

      // Assert
      const assert = async () => {
        await expect.soft(dishes.image.first()).toBeVisible();
        await expect(dishes.removeImageBtn.first()).toBeVisible();
        await expect(dishes.removeImageBtn.first()).toBeEnabled();

        await expect.soft(dishes.image.nth(1)).toBeVisible();
        await expect(dishes.removeImageBtn.nth(1)).toBeVisible();
        await expect(dishes.removeImageBtn.nth(1)).toBeEnabled();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.update({ where: { id: dishId }, data: { imageKeys: [] } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Remove image", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Upload 2 images
      await uploadFile(page, "./uploads/image-1.png", () =>
        dishes.addImageBtn.click()
      );
      await dishes.saveBtn.click();
      await page.waitForTimeout(500);
      await uploadFile(page, "./uploads/image-2.png", () =>
        dishes.addImageBtn.click()
      );
      await dishes.saveBtn.click();
      await page.waitForTimeout(500);

      // Remove image
      await dishes.removeImageBtn.first().click();
      await dishes.saveBtn.click();
      await page.waitForTimeout(500);

      // Assert
      const assert = async () => {
        await expect.soft(dishes.image.first()).toBeVisible();
        await expect(dishes.removeImageBtn.first()).toBeVisible();
        await expect(dishes.removeImageBtn.first()).toBeEnabled();

        await expect.soft(dishes.image.nth(1)).toBeHidden();
        await expect(dishes.removeImageBtn.nth(1)).toBeHidden();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.dish.update({ where: { id: dishId }, data: { imageKeys: [] } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  // TODO upload model via click

  test("Add model", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Upload model
      await dropFile(page, "id=model-input>>div>>nth=0", "./uploads/cube.glb");
      await dishes.saveBtn.click();
      await page.waitForTimeout(500);

      // Assert
      const assert = async (reload: boolean) => {
        await expect(dishes.model).toBeVisible();
        await expect(dishes.model.locator("div")).toHaveText(
          reload ? "model" : "cube.glb"
        );
        await expect(dishes.removeModelBtn).toBeVisible();
        await expect(dishes.removeModelBtn).toBeEnabled();
      };
      await assert(false);

      // Reload, assert
      await page.reload();
      await assert(true);

      // Cleanup
      await db.dish.update({ where: { id: dishId }, data: { modelKey: null } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Remove model", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Upload model, remove model

      await dropFile(page, "id=model-input>>div>>nth=0", "./uploads/cube.glb");
      await dishes.saveBtn.click();
      await dishes.removeModelBtn.click();
      await dishes.saveBtn.click();

      // Assert
      const assert = async () => {
        await expect(dishes.model).toBeHidden();
        await expect(dishes.removeModelBtn).toBeHidden();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });
});
