import { expect, Page, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ForgotPasswordPage } from "../../pages/ForgotPasswordPage";

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

test.describe("Auth forgot password", () => {
  test("Admin", async () => {
    // Got to forgot password page
    const login = new LoginPage(adminPage);
    await login.forgotPassWordLink.click({ position: { x: 1, y: 1 } });
    await adminPage.waitForURL(
      "http://localhost:3000/cms/auth/forgot-password"
    );
    const forgotPassword = new ForgotPasswordPage(adminPage);

    // Test submitting
    await expect(forgotPassword.submittedMessage).toBeHidden();
    await forgotPassword.emailInput.fill(process.env.ADMIN_EMAIL);
    await forgotPassword.resetBtn.click();
    await expect(forgotPassword.submittedMessage).toBeVisible();
  });

  test("Manager", async () => {
    // Got to forgot password page
    const login = new LoginPage(managerPage);
    await login.forgotPassWordLink.click({ position: { x: 1, y: 1 } });
    await managerPage.waitForURL(
      "http://localhost:3000/cms/auth/forgot-password"
    );
    const forgotPassword = new ForgotPasswordPage(managerPage);

    // Test submitting
    await expect(forgotPassword.submittedMessage).toBeHidden();
    await forgotPassword.emailInput.fill(process.env.MANAGER_EMAIL);
    await forgotPassword.resetBtn.click();
    await expect(forgotPassword.submittedMessage).toBeVisible();
  });

  test("Waiter", async () => {
    // Got to forgot password page
    const login = new LoginPage(waiterPage);
    await login.forgotPassWordLink.click({ position: { x: 1, y: 1 } });
    await waiterPage.waitForURL(
      "http://localhost:3000/cms/auth/forgot-password"
    );
    const forgotPassword = new ForgotPasswordPage(waiterPage);

    // Test submitting
    await expect(forgotPassword.submittedMessage).toBeHidden();
    await forgotPassword.emailInput.fill(process.env.WAITER_EMAIL);
    await forgotPassword.resetBtn.click();
    await expect(forgotPassword.submittedMessage).toBeVisible();
  });

  test("User", async () => {
    // Got to forgot password page
    const login = new LoginPage(userPage);
    await login.forgotPassWordLink.click({ position: { x: 1, y: 1 } });
    await userPage.waitForURL("http://localhost:3000/cms/auth/forgot-password");
    const forgotPassword = new ForgotPasswordPage(userPage);

    // Test submitting
    await expect(forgotPassword.submittedMessage).toBeHidden();
    await forgotPassword.emailInput.fill(process.env.USER_EMAIL);
    await forgotPassword.resetBtn.click();
    await expect(forgotPassword.submittedMessage).toBeVisible();
  });
});
