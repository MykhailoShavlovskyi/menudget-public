import { expect, test } from "@playwright/test";
import {
  AppSession,
  closeSessions,
  createSessionPerRole,
  forAllSessions,
  RoleSessions,
} from "../../utils/session";
import { Role } from "../../../serv/src/definitions/Role";
import db from "../../../serv/db/db";
import { dragAndDrop } from "../../utils/element";

let sessions: RoleSessions;
let tableId;
let orderId;

async function createOrder() {
  const order = await db.order.create({
    data: {
      restaurantId: 1,
      tableId,
    },
  });
  orderId = order.id;
}

test.beforeAll(async ({ browser }) => {
  // Create sessions
  sessions = await createSessionPerRole(browser, [
    Role.Admin,
    Role.Manager,
    Role.Waiter,
  ]);

  // Seed data
  const table = await db.table.create({
    data: { restaurantId: 1, name: "Sofa 32" },
  });
  tableId = table.id;
  await createOrder();

  // Go to orders page
  await forAllSessions(sessions, ({ page }) =>
    page.goto(`${process.env.SERVER_URL}/cms/orders/1`)
  );
});

test.afterAll(async () => {
  // Delete data
  await db.table.delete({ where: { id: tableId } });
  await db.order.delete({ where: { id: orderId } });

  // Close sessions
  await closeSessions(sessions);
});

test.describe("Orders Deleting", () => {
  test("Cancel delete", async () => {
    const test = async ({ page, orders }: AppSession) => {
      // Delete & cancel
      const order = orders.getOrderCard(orderId);
      await dragAndDrop(page, order, orders.orderDeleteDropArea);
      await orders.cancelBtn.click();

      // Assert
      await forAllSessions(sessions, async ({ orders }) => {
        const order = orders.getOrderCard(orderId);
        await expect(order).toBeVisible();
      });

      // Reload, assert
      await page.reload();
      await forAllSessions(sessions, async ({ orders }) => {
        const order = orders.getOrderCard(orderId);
        await expect(order).toBeVisible();
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Delete", async () => {
    const test = async ({ page, orders }: AppSession) => {
      // Delete
      const order = orders.getOrderCard(orderId);
      await dragAndDrop(page, order, orders.orderDeleteDropArea);
      await orders.confirmBtn.click();

      // Assert
      await forAllSessions(sessions, async ({ orders }) => {
        const order = orders.getOrderCard(orderId);
        await expect(order).toBeHidden();
      });

      // Reload, assert
      await page.reload();
      await forAllSessions(sessions, async ({ orders }) => {
        const order = orders.getOrderCard(orderId);
        await expect(order).toBeHidden();
      });

      // Cleanup
      await createOrder();
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });
});
