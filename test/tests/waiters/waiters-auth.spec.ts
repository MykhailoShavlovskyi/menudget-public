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

test.describe("Waiters Auth", () => {
  test("Admin", async () => {
    const session = sessions[Role.Admin] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters`,
      "Waiters - Menudget"
    );
    await session.waiters.nav.assertAdmin("Waiters");
    await expect(session.waiters.companySelect).toBeVisible();

    // Restaurant waiters page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters/1`,
      "Waiters - Menudget"
    );
    await session.waiters.nav.assertAdmin("Waiters");
    await expect(session.waiters.companySelect).toBeVisible();

    // Invalid restaurant waiters page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/waiters/-1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/waiters/a`);

    // Waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/3`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters/1/3`,
      "Waiter - Menudget"
    );
    await session.waiters.nav.assertAdmin("Waiters");
    await expect(session.waiters.companySelect).toBeVisible();

    // Invalid waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/-1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/waiters/1/-1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/a`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/waiters/1/a`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1/1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/waiters/-1/1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a/1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/waiters/a/1`);

    // New waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/new`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters/1/new`,
      "New Waiter - Menudget"
    );
    await session.waiters.nav.assertAdmin("Waiters");
    await expect(session.waiters.companySelect).toBeVisible();

    // Invalid new waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1/new`);
    await session.error404.assert(
      `${process.env.SERVER_URL}/cms/waiters/-1/new`
    );
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a/new`);
    await session.error404.assert(
      `${process.env.SERVER_URL}/cms/waiters/a/new`
    );
  });

  test("Manager", async () => {
    const session = sessions[Role.Manager] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters/1`,
      "Waiters - Menudget"
    );
    await session.waiters.nav.assertManager("Waiters");
    await expect(session.waiters.companySelect).toBeHidden();

    // Restaurant waiters page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters/1`,
      "Waiters - Menudget"
    );
    await session.waiters.nav.assertManager("Waiters");
    await expect(session.waiters.companySelect).toBeHidden();

    // Invalid restaurant waiters page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters/1`,
      "Waiters - Menudget"
    );
    await session.waiters.nav.assertManager("Waiters");
    await expect(session.waiters.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters/1`,
      "Waiters - Menudget"
    );
    await session.waiters.nav.assertManager("Waiters");
    await expect(session.waiters.companySelect).toBeHidden();

    // Waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/3`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters/1/3`,
      "Waiter - Menudget"
    );
    await session.waiters.nav.assertManager("Waiters");
    await expect(session.waiters.companySelect).toBeHidden();

    // Invalid waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/-1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/waiters/1/-1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/a`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/waiters/1/a`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1/1`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters/1`,
      "Waiters - Menudget"
    );
    await session.waiters.nav.assertManager("Waiters");
    await expect(session.waiters.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a/1`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters/1`,
      "Waiters - Menudget"
    );
    await session.waiters.nav.assertManager("Waiters");
    await expect(session.waiters.companySelect).toBeHidden();

    // New waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/new`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters/1/new`,
      "New Waiter - Menudget"
    );
    await session.waiters.nav.assertManager("Waiters");
    await expect(session.waiters.companySelect).toBeHidden();

    // Invalid new waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1/new`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters/1`,
      "Waiters - Menudget"
    );
    await session.waiters.nav.assertManager("Waiters");
    await expect(session.waiters.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a/new`);
    await session.waiters.assert(
      `${process.env.SERVER_URL}/cms/waiters/1`,
      "Waiters - Menudget"
    );
    await session.waiters.nav.assertManager("Waiters");
    await expect(session.waiters.companySelect).toBeHidden();
  });

  test("Waiter", async () => {
    const session = sessions[Role.Waiter] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Restaurant waiters page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Invalid restaurant waiters page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/3`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Invalid waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/-1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/a`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // New waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/new`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Invalid new waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1/new`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a/new`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();
  });

  test("User", async () => {
    const session = sessions[Role.User] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Restaurant waiters page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid restaurant waiters page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/3`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // New waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid new waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
  });

  test("Anon", async () => {
    const session = sessions[Role.Anon] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Restaurant waiters page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid restaurant waiters page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/3`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/1/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // New waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid new waiter page
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/-1/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/waiters/a/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
  });
});
