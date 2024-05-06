import { AppSession, createSessionPerRole } from "../../utils/session";
import { test } from "@playwright/test";
import { Role } from "../../../serv/src/definitions/Role";
import db from "../../../serv/db/db";

let session: AppSession;
let restaurant1Name = "Dishes restaurant select text 1";
let restaurant2Name = "Dishes restaurant select text 2";
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

test.describe("Dishes Restaurant select", () => {
  test("Dishes page", async () => {
    // Select 1st restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes`);
    await session.dishes.companySelect.click();
    await session.dishes.companySelect
      .locator(`text=${restaurant1Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/dishes/${restaurant1Id}`
    );

    // Select 2nd restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes`);
    await session.dishes.companySelect.click();
    await session.dishes.companySelect
      .locator(`text=${restaurant2Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/dishes/${restaurant2Id}`
    );
  });

  test("Restaurant dishes page", async () => {
    // Select 1st restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1`);
    await session.dishes.companySelect.click();
    await session.dishes.companySelect
      .locator(`text=${restaurant1Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/dishes/${restaurant1Id}`
    );

    // Select 2nd restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1`);
    await session.dishes.companySelect.click();
    await session.dishes.companySelect
      .locator(`text=${restaurant2Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/dishes/${restaurant2Id}`
    );
  });

  test("Dish page", async () => {
    // Select 1st restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/1`);
    await session.dishes.companySelect.click();
    await session.dishes.companySelect
      .locator(`text=${restaurant1Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/dishes/${restaurant1Id}`
    );

    // Select 2nd restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/1`);
    await session.dishes.companySelect.click();
    await session.dishes.companySelect
      .locator(`text=${restaurant2Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/dishes/${restaurant2Id}`
    );
  });

  test("New dish page page", async () => {
    // Select 1st restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);
    await session.dishes.companySelect.click();
    await session.dishes.companySelect
      .locator(`text=${restaurant1Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/dishes/${restaurant1Id}`
    );

    // Select 2nd restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);
    await session.dishes.companySelect.click();
    await session.dishes.companySelect
      .locator(`text=${restaurant2Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/dishes/${restaurant2Id}`
    );
  });
});
