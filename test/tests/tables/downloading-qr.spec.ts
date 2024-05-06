import { test } from "@playwright/test";
import {
  AppSession,
  closeSessions,
  createSessionPerRole,
  forAllSessions,
  RoleSessions,
} from "../../utils/session";
import { Role } from "../../../serv/src/definitions/Role";
import db from "../../../serv/db/db";

let sessions: RoleSessions;
let tableId;

test.beforeAll(async ({ browser }) => {
  // Create sessions
  sessions = await createSessionPerRole(browser, [
    Role.Admin,
    Role.Manager,
    Role.Waiter,
  ]);

  // Create table
  const table = await db.table.create({
    data: { restaurantId: 1, name: "Window 132" },
  });
  tableId = table.id;

  // Go to tables page
  await forAllSessions(sessions, ({ page }) =>
    page.goto(`${process.env.SERVER_URL}/cms/tables/1`)
  );
});

test.afterAll(async () => {
  // Delete table
  await db.table.delete({ where: { id: tableId } });

  // Close sessions
  await closeSessions(sessions);
});

test.describe("Tables downloading", () => {
  test("Downloading", async () => {
    const testDownload = async ({ page, tables }: AppSession) => {
      // Download
      const card = tables.getTableCard("Window 132");
      const [download] = await Promise.all([
        page.waitForEvent("download"),
        card.locator("button").click(),
      ]);

      // Assert file
      const path = await download.path();
      test.fail(path === null, "The download failed!");
      const fileName = await download.suggestedFilename();
      test.fail(
        fileName !== "Window 132 - Nefertari.jpg",
        "Expected Window 132 - Nefertari.jpg"
      );
    };
    await forAllSessions(sessions, testDownload);
  });
});
