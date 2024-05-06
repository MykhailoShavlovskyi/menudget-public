import { expect, test } from "@playwright/test";
import { AppSession, createSessionPerRole } from "../../utils/session";
import { Role } from "../../../serv/src/definitions/Role";
import db from "../../../serv/db/db";

let session: AppSession;
let restaurantId;

test.beforeAll(async ({ browser }) => {
  // Create session
  const sessions = await createSessionPerRole(browser, [Role.Admin]);
  session = sessions[Role.Admin];

  // Create restaurant
  const restaurant = await db.restaurant.create({
    data: { name: "Delete test" },
    select: { id: true },
  });
  restaurantId = restaurant.id;
});

test.afterAll(() => session.page.close());

test.describe("Restaurants Deleting", () => {
  test("Cancel delete", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Open delete modal, cancel
    await session.restaurants.deleteBtn.click();
    await session.restaurants.cancelBtn.click();

    // Assert
    const assert = async () => {
      await expect(session.page.url()).toBe(
        `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
      );
      await expect(
        session.restaurants.getRestaurantCard("Delete test")
      ).toBeVisible();
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();
  });

  test("Delete", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Delete
    await session.restaurants.deleteBtn.click();
    await session.restaurants.confirmBtn.click();
    await session.page.waitForURL(`${process.env.SERVER_URL}/cms/restaurants`);

    // Assert
    const assert = async () => {
      await expect(session.page.url()).toBe(
        `${process.env.SERVER_URL}/cms/restaurants`
      );
      await expect(
        session.restaurants.getRestaurantCard("Delete test")
      ).toBeHidden();
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();
  });
});
