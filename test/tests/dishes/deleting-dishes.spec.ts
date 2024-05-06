import { expect, test } from "@playwright/test";
import {
  AppSession,
  closeSessions,
  createSessionPerRole,
  RoleSessions,
} from "../../utils/session";
import { Role } from "../../../serv/src/definitions/Role";
import db from "../../../serv/db/db";

let sessions: RoleSessions;
let dishId;

async function createDish() {
  const dish = await db.dish.create({
    data: {
      name: "Sprite",
      restaurantId: 1,
    },
    select: { id: true },
  });
  dishId = dish.id;
}

test.beforeAll(async ({ browser }) => {
  // Create sessions
  sessions = await createSessionPerRole(browser, [
    Role.Admin,
    Role.Manager,
    Role.Waiter,
  ]);

  // Create dish
  await createDish();
});

test.afterAll(async () => {
  // Delete dish
  await db.dish.delete({ where: { id: dishId } });

  // Close sessions
  return closeSessions(sessions);
});

test.describe("Dishes Deleting", () => {
  test("Cancel delete", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Open delete modal, cancel
      await dishes.deleteBtn.click();
      await dishes.cancelBtn.click();

      // Assert
      const assert = async () => {
        await expect(page.url()).toBe(
          `${process.env.SERVER_URL}/cms/dishes/1/${dishId}`
        );
        await expect(dishes.getDishCard("Sprite")).toBeVisible();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();
    };
    await Promise.all([
      test(sessions[Role.Admin]),
      test(sessions[Role.Manager]),
      test(sessions[Role.Waiter]),
    ]);
  });

  test("Delete", async () => {
    const test = async ({ page, dishes }: AppSession) => {
      // Go to dish page
      await page.goto(`${process.env.SERVER_URL}/cms/dishes/1/${dishId}`);

      // Delete
      await dishes.deleteBtn.click();
      await dishes.confirmBtn.click();
      await page.waitForURL(`${process.env.SERVER_URL}/cms/dishes/1`);

      // Assert
      const assert = async () => {
        await expect(page.url()).toBe(`${process.env.SERVER_URL}/cms/dishes/1`);
        await expect(dishes.getDishCard("Sprite")).toBeHidden();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();
    };

    await test(sessions[Role.Admin]);
    await createDish();
    await test(sessions[Role.Manager]);
    await createDish();
    await test(sessions[Role.Waiter]);
    await createDish();
  });
});
