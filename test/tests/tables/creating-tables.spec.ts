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

const tablePageRegex = new RegExp(`/cms/tables/[0-9]/[0-9]`);

test.beforeAll(async ({ browser }) => {
  // Create sessions
  sessions = await createSessionPerRole(browser, [
    Role.Admin,
    Role.Manager,
    Role.Waiter,
  ]);

  // Go to tables page
  await Promise.all(
    Object.values(sessions).map((v) =>
      v?.page.goto(`${process.env.SERVER_URL}/cms/tables/1`)
    )
  );
});

test.afterAll(() => closeSessions(sessions));

test.describe("Tables Creating", () => {
  test("Open form", async () => {
    const test = async ({ page, tables }: AppSession) => {
      // Assert no form
      await expect(page.url()).toBe(`${process.env.SERVER_URL}/cms/tables/1`);
      await expect(tables.form).toBeHidden();

      // Open form, assert
      await tables.createTableBtn.click();
      await page.waitForURL(`${process.env.SERVER_URL}/cms/tables/1/new`);
      await expect(tables.form).toBeVisible();
    };
    await Promise.all([
      test(sessions[Role.Admin]),
      test(sessions[Role.Manager]),
      test(sessions[Role.Waiter]),
    ]);
  });

  test("Form default values", async () => {
    const test = async ({ page, tables }: AppSession) => {
      // Go to new table page
      await page.goto(`${process.env.SERVER_URL}/cms/tables/1/new`);

      // Assert form
      await expect(tables.formHeader).toBeVisible();
      await expect(tables.formHeader).toHaveText("Create table");
      await expect(tables.nameInput).toBeVisible();
      await expect(tables.nameInput).toHaveValue("New table");
      await expect(tables.nameError).toBeHidden();
      //
      await expect(tables.saveBtn).toBeVisible();
      await expect(tables.saveBtn).toBeEnabled();
      await expect(tables.deleteBtn).toBeHidden();
    };
    await Promise.all([
      test(sessions[Role.Admin]),
      test(sessions[Role.Manager]),
      test(sessions[Role.Waiter]),
    ]);
  });

  // TODO all field errors

  test("Name", async () => {
    const test = async ({ page, tables }: AppSession) => {
      // Go to new waiter page
      await page.goto(`${process.env.SERVER_URL}/cms/tables/1/new`);

      // Empty name
      await tables.nameInput.fill("");
      await tables.form.click();
      await expect(tables.nameError).toHaveText("Name is a required field");

      // Edit name
      await tables.nameInput.fill("Cool table");
      await tables.saveBtn.click();
      await page.waitForURL((url) => tablePageRegex.test(url.pathname));

      // Assert
      const assert = async () => {
        await expect(tablePageRegex.test(page.url())).toBe(true);
        await expect(tables.formHeader).toHaveText("Edit table");
        await expect(tables.nameInput).toHaveValue("Cool table");

        const card = tables.getTableCard("Cool table");
        await expect(card).toHaveText("Cool tableDownload");
        await expect
          .soft(card.locator("div").first())
          .toHaveScreenshot("cool-table.png");
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.table.deleteMany({ where: { name: "Cool table" } });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });
});
