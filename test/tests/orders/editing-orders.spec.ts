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
import { OrderState } from "../../../serv/src/definitions/OrderState";

let sessions: RoleSessions;

let orderId;
let dish1Id;
let dish2Id;
let tableId;

test.beforeAll(async ({ browser }) => {
  // Create sessions
  sessions = await createSessionPerRole(browser, [
    Role.Admin,
    Role.Manager,
    Role.Waiter,
  ]);

  // Seed data
  const dish1 = await db.dish.create({
    data: { restaurantId: 1, name: "Deck" },
  });
  const dish2 = await db.dish.create({
    data: { restaurantId: 1, name: "Snack" },
  });
  dish1Id = dish1.id;
  dish2Id = dish2.id;
  const table = await db.table.create({
    data: { restaurantId: 1, name: "Window 4" },
  });
  tableId = table.id;
  const order = await db.order.create({
    data: {
      restaurantId: 1,
      tableId,
      dishes: {
        createMany: {
          data: [
            { dishId: dish1Id, count: 1 },
            { dishId: dish2Id, count: 2 },
          ],
        },
      },
    },
  });
  orderId = order.id;
});

test.afterAll(async () => {
  // Delete data
  await db.dish.deleteMany({ where: { id: { in: [dish1Id, dish2Id] } } });
  await db.table.delete({ where: { id: tableId } });
  await db.order.delete({ where: { id: orderId } });

  // Close sessions
  return closeSessions(sessions);
});

test.describe("Orders Editing", () => {
  test("Order card", async () => {
    const test = async ({ page, orders }: AppSession) => {
      await page.goto(`${process.env.SERVER_URL}/cms/orders/1`);

      const order = orders.getOrderCard(orderId);
      await expect(order).toBeVisible();
      await expect(order).toHaveText("Table: Window 4Deck: x1Snack: x2Payed:");
      await expect(order.locator("input")).not.toBeChecked();
    };

    await Promise.all([
      test(sessions[Role.Admin]),
      test(sessions[Role.Manager]),
      test(sessions[Role.Waiter]),
    ]);
  });

  test("Move from pending to progress", async () => {
    const test = async ({ page, orders }: AppSession) => {
      // Go to orders page
      await forAllSessions(sessions, ({ page }) =>
        page.goto(`${process.env.SERVER_URL}/cms/orders/1`)
      );

      // Assert
      const assertBeforeMove = async ({ orders }: AppSession) => {
        await expect(
          orders.pendingOrders.locator(`id=${orderId}`)
        ).toBeVisible();
        await expect(
          orders.inProgressOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(orders.doneOrders.locator(`id=${orderId}`)).toBeHidden();
      };
      await forAllSessions(sessions, assertBeforeMove);

      // Drag & assert
      const order = orders.getOrderCard(orderId);
      await dragAndDrop(page, order, orders.inProgressOrders);
      const assertAfterMove = async ({ orders }: AppSession) => {
        await expect(
          orders.pendingOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(
          orders.inProgressOrders.locator(`id=${orderId}`)
        ).toBeVisible();
        await expect(orders.doneOrders.locator(`id=${orderId}`)).toBeHidden();
      };
      await forAllSessions(sessions, assertAfterMove);

      // Cleanup
      await db.order.update({
        where: { id: orderId },
        data: { state: OrderState.Pending },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Move from pending to done", async () => {
    const test = async ({ page, orders }: AppSession) => {
      // Go to orders page
      await forAllSessions(sessions, ({ page }) =>
        page.goto(`${process.env.SERVER_URL}/cms/orders/1`)
      );

      // Assert
      const assertBeforeMove = async ({ orders }: AppSession) => {
        await expect(
          orders.pendingOrders.locator(`id=${orderId}`)
        ).toBeVisible();
        await expect(
          orders.inProgressOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(orders.doneOrders.locator(`id=${orderId}`)).toBeHidden();
      };
      await forAllSessions(sessions, assertBeforeMove);

      // Drag & assert
      const order = orders.getOrderCard(orderId);
      await dragAndDrop(page, order, orders.doneOrders);
      const assertAfterMove = async ({ orders }: AppSession) => {
        await expect(
          orders.pendingOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(
          orders.inProgressOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(orders.doneOrders.locator(`id=${orderId}`)).toBeVisible();
      };
      await forAllSessions(sessions, assertAfterMove);

      // Cleanup
      await db.order.update({
        where: { id: orderId },
        data: { state: OrderState.Pending },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Move from progress to done", async () => {
    const test = async ({ page, orders }: AppSession) => {
      await db.order.update({
        where: { id: orderId },
        data: { state: OrderState.InProgress },
      });
      await forAllSessions(sessions, ({ page }) =>
        page.goto(`${process.env.SERVER_URL}/cms/orders/1`)
      );

      // Assert
      const assertBeforeMove = async ({ orders }: AppSession) => {
        await expect(
          orders.pendingOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(
          orders.inProgressOrders.locator(`id=${orderId}`)
        ).toBeVisible();
        await expect(orders.doneOrders.locator(`id=${orderId}`)).toBeHidden();
      };
      await forAllSessions(sessions, assertBeforeMove);

      // Drag & assert
      const order = orders.getOrderCard(orderId);
      await dragAndDrop(page, order, orders.doneOrders);
      const assertAfterMove = async ({ orders }: AppSession) => {
        await expect(
          orders.pendingOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(
          orders.inProgressOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(orders.doneOrders.locator(`id=${orderId}`)).toBeVisible();
      };
      await forAllSessions(sessions, assertAfterMove);

      // Cleanup
      await db.order.update({
        where: { id: orderId },
        data: { state: OrderState.Pending },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Move from progress to pending", async () => {
    const test = async ({ page, orders }: AppSession) => {
      await db.order.update({
        where: { id: orderId },
        data: { state: OrderState.InProgress },
      });
      await forAllSessions(sessions, ({ page }) =>
        page.goto(`${process.env.SERVER_URL}/cms/orders/1`)
      );

      // Assert
      const assertBeforeMove = async ({ orders }: AppSession) => {
        await expect(
          orders.pendingOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(
          orders.inProgressOrders.locator(`id=${orderId}`)
        ).toBeVisible();
        await expect(orders.doneOrders.locator(`id=${orderId}`)).toBeHidden();
      };
      await forAllSessions(sessions, assertBeforeMove);

      // Drag & assert
      const order = orders.getOrderCard(orderId);
      await dragAndDrop(page, order, orders.pendingOrders);
      const assertAfterMove = async ({ orders }: AppSession) => {
        await expect(
          orders.pendingOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(
          orders.inProgressOrders.locator(`id=${orderId}`)
        ).toBeVisible();
        await expect(orders.doneOrders.locator(`id=${orderId}`)).toBeHidden();
      };
      await forAllSessions(sessions, assertAfterMove);
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Move from done to pending", async () => {
    const test = async ({ page, orders }: AppSession) => {
      await db.order.update({
        where: { id: orderId },
        data: { state: OrderState.Done },
      });
      await forAllSessions(sessions, ({ page }) =>
        page.goto(`${process.env.SERVER_URL}/cms/orders/1`)
      );

      // Assert
      const assertBeforeMove = async ({ orders }: AppSession) => {
        await expect(
          orders.pendingOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(
          orders.inProgressOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(orders.doneOrders.locator(`id=${orderId}`)).toBeVisible();
      };
      await forAllSessions(sessions, assertBeforeMove);

      // Drag & assert
      const order = orders.getOrderCard(orderId);
      await dragAndDrop(page, order, orders.pendingOrders);
      const assertAfterMove = async ({ orders }: AppSession) => {
        await expect(
          orders.pendingOrders.locator(`id=${orderId}`)
        ).toBeVisible();
        await expect(
          orders.inProgressOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(orders.doneOrders.locator(`id=${orderId}`)).toBeHidden();
      };
      await forAllSessions(sessions, assertAfterMove);
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Move from done to progress", async () => {
    const test = async ({ page, orders }: AppSession) => {
      await db.order.update({
        where: { id: orderId },
        data: { state: OrderState.Done },
      });
      await forAllSessions(sessions, ({ page }) =>
        page.goto(`${process.env.SERVER_URL}/cms/orders/1`)
      );

      // Assert
      const assertBeforeMove = async ({ orders }: AppSession) => {
        await expect(
          orders.pendingOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(
          orders.inProgressOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(orders.doneOrders.locator(`id=${orderId}`)).toBeVisible();
      };
      await forAllSessions(sessions, assertBeforeMove);

      // Drag & assert
      const order = orders.getOrderCard(orderId);
      await dragAndDrop(page, order, orders.inProgressOrders);
      const assertAfterMove = async ({ orders }: AppSession) => {
        await expect(
          orders.pendingOrders.locator(`id=${orderId}`)
        ).toBeHidden();
        await expect(
          orders.inProgressOrders.locator(`id=${orderId}`)
        ).toBeVisible();
        await expect(orders.doneOrders.locator(`id=${orderId}`)).toBeHidden();
      };
      await forAllSessions(sessions, assertAfterMove);

      // Cleanup
      await db.order.update({
        where: { id: orderId },
        data: { state: OrderState.Pending },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });

  test("Set payed", async () => {
    const test = async ({ page, orders }: AppSession) => {
      await forAllSessions(sessions, ({ page }) =>
        page.goto(`${process.env.SERVER_URL}/cms/orders/1`)
      );

      // Assert
      const order = orders.getOrderCard(orderId);
      await forAllSessions(sessions, ({ page }) =>
        expect(order.locator("input")).not.toBeChecked()
      );

      // Set payed
      order.locator("input").click();
      await forAllSessions(sessions, ({ page }) =>
        expect(order.locator("input")).toBeChecked()
      );

      // Set un-payed
      order.locator("input").click();
      await forAllSessions(sessions, ({ page }) =>
        expect(order.locator("input")).not.toBeChecked()
      );
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
    await test(sessions[Role.Waiter]);
  });
});
