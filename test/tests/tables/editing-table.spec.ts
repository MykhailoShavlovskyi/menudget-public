import { expect, test } from "@playwright/test";
import {
  AppSession,
  closeSessions,
  createSessionPerRole,
  RoleSessions,
} from "../../utils/session";
import { Role } from "../../../serv/src/definitions/Role";
import db from "../../../serv/db/db";
import { getElementBorder } from "../../utils/element";

let sessions: RoleSessions;
let tableId;

const tablePageRegex = new RegExp(`/cms/tables/[0-9]/[0-9]`);

test.beforeAll(async ({ browser }) => {
  // Create sessions
  sessions = await createSessionPerRole(browser, [
    Role.Admin,
    Role.Manager,
    Role.Waiter,
  ]);

  // Create table
  const table = await db.table.create({
    data: {
      name: "Terrace 64",
      restaurantId: 1,
    },
    select: { id: true },
  });
  tableId = table.id;
});

test.afterAll(async () => {
  // Delete table
  await db.table.delete({ where: { id: tableId } });

  // Close sessions
  return closeSessions(sessions);
});

test.describe("Tables Editing", () => {
  test("Select table", async () => {
    const test = async ({ page, tables }: AppSession) => {
      // Go to tables page
      await page.goto(`${process.env.SERVER_URL}/cms/tables/1`);

      // Select table
      const card1 = tables.getTableCard("Corner 1");
      await expect(await getElementBorder(card1)).toBe("0px none rgb(0, 0, 0)");
      await card1.click();
      await page.waitForURL((url) => tablePageRegex.test(url.pathname));
      let url1 = page.url();
      await expect(await getElementBorder(card1)).not.toBe(
        "0px none rgb(0, 0, 0)"
      );
      await expect(tables.nameInput).toHaveValue("Corner 1");

      // Select table
      const card2 = tables.getTableCard("Terrace 64");
      await expect(await getElementBorder(card2)).toBe("0px none rgb(0, 0, 0)");
      await card2.click();
      await page.waitForURL(
        (url) =>
          tablePageRegex.test(url.pathname) && !url1.includes(url.pathname)
      );
      await expect(await getElementBorder(card2)).not.toBe(
        "0px none rgb(0, 0, 0)"
      );
      await expect(tables.nameInput).toHaveValue("Terrace 64");
    };
    await Promise.all([
      test(sessions[Role.Admin]),
      test(sessions[Role.Manager]),
      test(sessions[Role.Waiter]),
    ]);
  });

  test("Form default values", async () => {
    const test = async ({ page, tables }: AppSession) => {
      // Go to table page
      await page.goto(`${process.env.SERVER_URL}/cms/tables/1/${tableId}`);

      // Assert form
      await expect(tables.formHeader).toBeVisible();
      await expect(tables.formHeader).toHaveText("Edit table");
      await expect(tables.nameInput).toBeVisible();
      await expect(tables.nameInput).toHaveValue("Terrace 64");
      await expect(tables.nameError).toBeHidden();
      //
      await expect(tables.saveBtn).toBeVisible();
      await expect(tables.saveBtn).toBeEnabled();
      await expect(tables.deleteBtn).toBeVisible();
      await expect(tables.deleteBtn).toBeEnabled();
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
      // Go to table page
      await page.goto(`${process.env.SERVER_URL}/cms/tables/1/${tableId}`);

      // Empty name
      await tables.nameInput.fill("");
      await tables.form.click();
      await expect(tables.nameError).toHaveText("Name is a required field");

      // Edit name
      await tables.nameInput.fill("Edited name");
      await tables.saveBtn.click();
      await page.waitForTimeout(25);

      // Assert
      const assert = async () => {
        await expect(tables.nameInput).toHaveValue("Edited name");
        await expect(tables.getTableCard("Edited name")).toHaveText(
          "Edited nameDownload"
        );
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.table.update({
        where: { id: tableId },
        data: { name: "Terrace 64" },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });
});
