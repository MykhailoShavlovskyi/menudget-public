import { expect, Page, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

let adminPage: Page;
let managerPage: Page;
let waiterPage: Page;
let userPage: Page;

test.beforeAll(async ({ browser }) => {
  adminPage = await browser.newPage();
  managerPage = await browser.newPage();
  waiterPage = await browser.newPage();
  userPage = await browser.newPage();
  await adminPage.goto("http://localhost:3000");
  await managerPage.goto("http://localhost:3000");
  await waiterPage.goto("http://localhost:3000");
  await userPage.goto("http://localhost:3000");
});

test.afterAll(async () => {
  await adminPage.close();
  await managerPage.close();
  await waiterPage.close();
  await userPage.close();
});

test.describe("Auth login", () => {
  test("Login as Admin", async () => {
    await new LoginPage(adminPage).login(
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD
    );
    const url = "http://localhost:3000/cms/restaurants";
    await adminPage.waitForURL(url);
    expect(adminPage.url()).toBe(url);
    await adminPage.close();
  });

  test("Login as Manager", async () => {
    await new LoginPage(managerPage).login(
      process.env.MANAGER_EMAIL,
      process.env.MANAGER_PASSWORD
    );
    const url = "http://localhost:3000/cms/dishes/1";
    await managerPage.waitForURL(url);
    expect(managerPage.url()).toBe(url);
    await managerPage.close();
  });

  test("Login as Waiter", async () => {
    await new LoginPage(waiterPage).login(
      process.env.WAITER_EMAIL,
      process.env.WAITER_PASSWORD
    );
    const url = "http://localhost:3000/cms/orders/1";
    await waiterPage.waitForURL(url);
    expect(waiterPage.url()).toBe(url);
    await waiterPage.close();
  });

  test("Login as User", async () => {
    await new LoginPage(userPage).login(
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD
    );
    const url = "http://localhost:3000/cms/auth/login";
    await userPage.waitForURL(url);
    await expect(
      userPage.locator("text=Sorry, those credentials are invalid")
    ).toBeVisible();
    await userPage.close();
  });
});
