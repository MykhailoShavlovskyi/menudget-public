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
let waiterId;

test.beforeAll(async ({ browser }) => {
  // Create sessions
  sessions = await createSessionPerRole(browser, [Role.Admin, Role.Manager]);

  // Create waiter
  const waiter = await db.user.create({
    data: {
      name: "Josh Got",
      email: "got@gmail.com",
      restaurantId: 1,
      role: Role.Waiter,
    },
    select: { id: true },
  });
  waiterId = waiter.id;
});

test.afterAll(async () => {
  // Delete waiter
  await db.user.delete({ where: { id: waiterId } });

  // Close sessions
  return closeSessions(sessions);
});

test.describe("Waiters Deleting", () => {
  test("Cancel delete", async () => {
    const test = async ({ page, waiters }: AppSession) => {
      // Go to waiter page
      await page.goto(`${process.env.SERVER_URL}/cms/waiters/1/${waiterId}`);

      // Open delete modal, cancel
      await waiters.deleteBtn.click();
      await waiters.cancelBtn.click();

      // Assert
      const assert = async () => {
        await expect(page.url()).toBe(
          `${process.env.SERVER_URL}/cms/waiters/1/${waiterId}`
        );
        await expect(waiters.getWaiterCard("got@gmail.com")).toBeVisible();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();
    };
    await Promise.all([
      test(sessions[Role.Admin]),
      test(sessions[Role.Manager]),
    ]);
  });

  test("Delete", async () => {
    const test = async ({ page, waiters }: AppSession) => {
      // Go to waiter page
      await page.goto(`${process.env.SERVER_URL}/cms/waiters/1/${waiterId}`);

      // Delete
      await waiters.deleteBtn.click();
      await waiters.confirmBtn.click();
      await page.waitForURL(`${process.env.SERVER_URL}/cms/waiters/1`);

      // Assert
      const assert = async () => {
        await expect(page.url()).toBe(
          `${process.env.SERVER_URL}/cms/waiters/1`
        );
        await expect(waiters.getWaiterCard("got@gmail.com")).toBeHidden();
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();
    };

    await test(sessions[Role.Admin]);
    await db.user.update({ where: { id: waiterId }, data: { deleted: false } });
    await test(sessions[Role.Manager]);
  });
});
