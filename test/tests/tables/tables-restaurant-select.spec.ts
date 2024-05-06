import { AppSession, createSessionPerRole } from "../../utils/session";
import { test } from "@playwright/test";
import { Role } from "../../../serv/src/definitions/Role";
import db from "../../../serv/db/db";

let session: AppSession;
let restaurant1Name = "Tables restaurant select text 1";
let restaurant2Name = "Tables restaurant select text 2";
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

test.describe("Tables Restaurant select", () => {
  test("Tables page", async () => {
    // Select 1st restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables`);
    await session.tables.companySelect.click();
    await session.tables.companySelect
      .locator(`text=${restaurant1Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/tables/${restaurant1Id}`
    );

    // Select 2nd restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables`);
    await session.tables.companySelect.click();
    await session.tables.companySelect
      .locator(`text=${restaurant2Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/tables/${restaurant2Id}`
    );
  });

  test("Restaurant tables page", async () => {
    // Select 1st restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1`);
    await session.tables.companySelect.click();
    await session.tables.companySelect
      .locator(`text=${restaurant1Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/tables/${restaurant1Id}`
    );

    // Select 2nd restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1`);
    await session.tables.companySelect.click();
    await session.tables.companySelect
      .locator(`text=${restaurant2Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/tables/${restaurant2Id}`
    );
  });

  test("Table page", async () => {
    // Select 1st restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/1`);
    await session.tables.companySelect.click();
    await session.tables.companySelect
      .locator(`text=${restaurant1Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/tables/${restaurant1Id}`
    );

    // Select 2nd restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/1`);
    await session.tables.companySelect.click();
    await session.tables.companySelect
      .locator(`text=${restaurant2Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/tables/${restaurant2Id}`
    );
  });

  test("New table page page", async () => {
    // Select 1st restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/new`);
    await session.tables.companySelect.click();
    await session.tables.companySelect
      .locator(`text=${restaurant1Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/tables/${restaurant1Id}`
    );

    // Select 2nd restaurant
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/new`);
    await session.tables.companySelect.click();
    await session.tables.companySelect
      .locator(`text=${restaurant2Name}`)
      .click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/tables/${restaurant2Id}`
    );
  });
});
