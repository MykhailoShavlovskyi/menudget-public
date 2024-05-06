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

const waiterPageRegex = new RegExp(`/cms/waiters/[0-9]/[0-9]`);

test.beforeAll(async ({ browser }) => {
  // Create sessions
  sessions = await createSessionPerRole(browser, [Role.Admin, Role.Manager]);

  // Go to waiters page
  await Promise.all(
    Object.values(sessions).map((v) =>
      v?.page.goto(`${process.env.SERVER_URL}/cms/waiters/1`)
    )
  );
});

test.afterAll(() => closeSessions(sessions));

test.describe("Waiters Creating", () => {
  test("Open form", async () => {
    const test = async ({ page, waiters }: AppSession) => {
      // Assert no form
      await expect(page.url()).toBe(`${process.env.SERVER_URL}/cms/waiters/1`);
      await expect(waiters.form).toBeHidden();

      // Open form, assert
      await waiters.createWaiterBtn.click();
      await page.waitForURL(`${process.env.SERVER_URL}/cms/waiters/1/new`);
      await expect(waiters.form).toBeVisible();
    };
    await Promise.all([
      test(sessions[Role.Admin]),
      test(sessions[Role.Manager]),
    ]);
  });

  test("Form default values", async () => {
    const test = async ({ page, waiters }: AppSession) => {
      // Go to new waiter page
      await page.goto(`${process.env.SERVER_URL}/cms/waiters/1/new`);

      // Assert form
      await expect(waiters.formHeader).toBeVisible();
      await expect(waiters.formHeader).toHaveText("Create waiter");
      await expect(waiters.nameInput).toBeVisible();
      await expect(waiters.nameInput).toHaveValue("New waiter");
      await expect(waiters.nameError).toBeHidden();
      await expect(waiters.emailInput).toBeVisible();
      await expect(waiters.emailInput).toHaveValue("");
      await expect(waiters.emailError).toBeHidden();
      //
      await expect(waiters.saveBtn).toBeVisible();
      await expect(waiters.saveBtn).toBeEnabled();
      await expect(waiters.deleteBtn).toBeHidden();
    };
    await Promise.all([
      test(sessions[Role.Admin]),
      test(sessions[Role.Manager]),
    ]);
  });

  // TODO all field errors

  test("Name", async () => {
    const test = async ({ page, waiters }: AppSession) => {
      // Go to new waiter page
      await page.goto(`${process.env.SERVER_URL}/cms/waiters/1/new`);

      // Empty name
      await waiters.nameInput.fill("");
      await waiters.form.click();
      await expect(waiters.nameError).toHaveText("Name is a required field");

      // Edit name
      await waiters.nameInput.fill("John Johnson");
      await waiters.emailInput.fill("test@menudget.com");
      await waiters.saveBtn.click();
      await page.waitForURL((url) => waiterPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(waiterPageRegex.test(page.url())).toBe(true);
        await expect(waiters.formHeader).toHaveText("Edit waiter");
        await expect(waiters.nameInput).toHaveValue("John Johnson");

        const card = waiters.getWaiterCard("test@menudget.com");
        await expect(card).toHaveText("John Johnsontest@menudget.com");
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.user.delete({ where: { email: "test@menudget.com" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
  });

  test("Email", async () => {
    const test = async ({ page, waiters }: AppSession) => {
      // Go to new waiter page
      await page.goto(`${process.env.SERVER_URL}/cms/waiters/1/new`);

      // Empty email
      await waiters.emailInput.fill("");
      await waiters.form.click();
      await expect(waiters.emailError).toHaveText("Email is a required field");

      // Invalid email
      await waiters.emailInput.fill("zzz");
      await waiters.form.click();
      await expect(waiters.emailError).toHaveText("Invalid email");

      // Edit email
      await waiters.emailInput.fill("test@menudget.com");
      await waiters.saveBtn.click();
      await page.waitForURL((url) => waiterPageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(waiterPageRegex.test(page.url())).toBe(true);
        await expect(waiters.formHeader).toHaveText("Edit waiter");
        await expect(waiters.nameInput).toHaveValue("New waiter");
        await expect(waiters.emailInput).toHaveValue("test@menudget.com");

        const card = waiters.getWaiterCard("test@menudget.com");
        await expect(card).toHaveText("New waitertest@menudget.com");
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.user.delete({ where: { email: "test@menudget.com" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
  });
});
