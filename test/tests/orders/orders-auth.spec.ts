import { expect, test } from "@playwright/test";
import {
  AppSession,
  closeSessions,
  createSessionPerRole,
  RoleSessions,
} from "../../utils/session";
import { Role } from "../../../serv/src/definitions/Role";

let sessions: RoleSessions;

test.beforeAll(async ({ browser }) => {
  sessions = await createSessionPerRole(browser);
});

test.afterAll(() => closeSessions(sessions));

test.describe("Orders Auth", () => {
  test("Admin", async () => {
    const session = sessions[Role.Admin] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders`);
    await session.orders.assert(
      `${process.env.SERVER_URL}/cms/orders`,
      "Orders - Menudget"
    );
    await session.orders.nav.assertAdmin("Orders");
    await expect(session.orders.companySelect).toBeVisible();

    // Restaurant orders page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/1`);
    await session.orders.assert(
      `${process.env.SERVER_URL}/cms/orders/1`,
      "Orders - Menudget"
    );
    await session.orders.nav.assertAdmin("Orders");
    await expect(session.orders.companySelect).toBeVisible();

    // Invalid restaurant orders page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/-1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/orders/-1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/a`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/orders/a`);
  });

  test("Manager", async () => {
    const session = sessions[Role.Manager] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders`);
    await session.orders.assert(
      `${process.env.SERVER_URL}/cms/orders/1`,
      "Orders - Menudget"
    );
    await session.orders.nav.assertManager("Orders");
    await expect(session.orders.companySelect).toBeHidden();

    // Restaurant orders page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/1`);
    await session.orders.assert(
      `${process.env.SERVER_URL}/cms/orders/1`,
      "Orders - Menudget"
    );
    await session.orders.nav.assertManager("Orders");
    await expect(session.orders.companySelect).toBeHidden();

    // Invalid restaurant orders page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/-1`);
    await session.orders.assert(
      `${process.env.SERVER_URL}/cms/orders/1`,
      "Orders - Menudget"
    );
    await session.orders.nav.assertManager("Orders");
    await expect(session.orders.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/a`);
    await session.orders.assert(
      `${process.env.SERVER_URL}/cms/orders/1`,
      "Orders - Menudget"
    );
    await session.orders.nav.assertManager("Orders");
    await expect(session.orders.companySelect).toBeHidden();
  });

  test("Waiter", async () => {
    const session = sessions[Role.Waiter] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders`);
    await session.orders.assert(
      `${process.env.SERVER_URL}/cms/orders/1`,
      "Orders - Menudget"
    );
    await session.orders.nav.assertWaiter("Orders");
    await expect(session.orders.companySelect).toBeHidden();

    // Restaurant orders page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/1`);
    await session.orders.assert(
      `${process.env.SERVER_URL}/cms/orders/1`,
      "Orders - Menudget"
    );
    await session.orders.nav.assertWaiter("Orders");
    await expect(session.orders.companySelect).toBeHidden();

    // Invalid restaurant orders page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/-1`);
    await session.orders.assert(
      `${process.env.SERVER_URL}/cms/orders/1`,
      "Orders - Menudget"
    );
    await session.orders.nav.assertWaiter("Orders");
    await expect(session.orders.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/a`);
    await session.orders.assert(
      `${process.env.SERVER_URL}/cms/orders/1`,
      "Orders - Menudget"
    );
    await session.orders.nav.assertWaiter("Orders");
    await expect(session.orders.companySelect).toBeHidden();
  });

  test("User", async () => {
    const session = sessions[Role.User] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders`);
    await session.login.assert();

    // Restaurant orders page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/1`);
    await session.login.assert();

    // Invalid restaurant orders page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/-1`);
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/a`);
    await session.login.assert();
  });

  test("Anon", async () => {
    const session = sessions[Role.Anon] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders`);
    await session.login.assert();

    // Restaurant orders page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/1`);
    await session.login.assert();

    // Invalid restaurant orders page
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/-1`);
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/orders/a`);
    await session.login.assert();
  });
});
