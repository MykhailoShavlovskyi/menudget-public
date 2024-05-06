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
let tableId;

async function createTable() {
  const table = await db.table.create({
    data: {
      name: "Terrace 2",
      restaurantId: 1,
    },
    select: { id: true },
  });
  tableId = table.id;
}

test.beforeAll(async ({ browser }) => {
  // Create sessions
  sessions = await createSessionPerRole(browser, [
    Role.Admin,
    Role.Manager,
    Role.Waiter,
  ]);

  // Create table
  await createTable();
});

test.afterAll(async () => {
  // Delete table
  await db.table.delete({ where: { id: tableId } });

  // Close sessions
  return closeSessions(sessions);
});

test.describe("Tables Deleting", () => {
  test("Cancel delete", async () => {
    const test = async ({ page, tables }: AppSession) => {
      // Go to table page
      await page.goto(`${process.env.SERVER_URL}/cms/tables/1/${tableId}`);

      // Open delete modal, cancel
      await tables.deleteBtn.click();
      await tables.cancelBtn.click();

      // Assert
      const assert = async () => {
        await expect(page.url()).toBe(
          `${process.env.SERVER_URL}/cms/tables/1/${tableId}`
        );
        await expect(tables.getTableCard("Terrace 2")).toBeVisible();
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
    const test = async ({ page, tables }: AppSession) => {
      // Go to table page
      await page.goto(`${process.env.SERVER_URL}/cms/tables/1/${tableId}`);

      // Delete
      await tables.deleteBtn.click();
      await tables.confirmBtn.click();
      await page.waitForURL(`${process.env.SERVER_URL}/cms/tables/1`);

      // Assert
      const assert = async () => {
        await expect(page.url()).toBe(`${process.env.SERVER_URL}/cms/tables/1`);
        await expect(tables.getTableCard("Terrace 2")).toBeHidden();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();
    };

    await test(sessions[Role.Admin]);
    await createTable();
    await test(sessions[Role.Manager]);
    await createTable();
    await test(sessions[Role.Waiter]);
    await createTable();
  });
});
