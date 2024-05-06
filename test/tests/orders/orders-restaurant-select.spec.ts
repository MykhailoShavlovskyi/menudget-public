import { AppSession, createSessionPerRole } from "../../utils/session";
import { test } from "@playwright/test";
import { Role } from "../../../serv/src/definitions/Role";
import db from "../../../serv/db/db";

let session: AppSession;
let restaurant1Name = "Orders restaurant select text 1";
let restaurant2Name = "Orders restaurant select text 2";
let restaurant1Id: number;
let restaurant2Id: number;

test.beforeAll(async ({ browser }) => {
  // Create session
  session = (await createSessionPerRole(browser, [Role.Admin]))[Role.Admin];

  // Create restaurants
  const restaurant1 = await db.restaurant.create({
    data: { name: restaurant1Name },
  });
  const restaurant2 = await db.restaurant.create({
    data: { name: restaurant2Name },
  });
  restaurant1Id = restaurant1.id;
  restaurant2Id = restaurant2.id;
});

test.afterAll(async () => {
  // Delete restaurants
  await db.restaurant.delete({ where: { id: restaurant1Id } });
  await db.restaurant.delete({ where: { id: restaurant2Id } });

  // Close sessions
  return session.page.close();
});

test.describe("Orders Restaurant select", () => {
  test("Orders page", async () => {
    // Select 1st restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders`);
    await session.orders.companySelect.click();
    await session.orders.companySelect
      .locator(`text=${restaurant1Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/orders/${restaurant1Id}`
    );

    // Select 2nd restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders`);
    await session.orders.companySelect.click();
    await session.orders.companySelect
      .locator(`text=${restaurant2Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/orders/${restaurant2Id}`
    );
  });

  test("Restaurant orders page", async () => {
    // Select 1st restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/1`);
    await session.orders.companySelect.click();
    await session.orders.companySelect
      .locator(`text=${restaurant1Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/orders/${restaurant1Id}`
    );

    // Select 2nd restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/1`);
    await session.orders.companySelect.click();
    await session.orders.companySelect
      .locator(`text=${restaurant2Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/orders/${restaurant2Id}`
    );
  });
});
