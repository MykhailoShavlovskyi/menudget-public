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

// TODO fix waiters

test.describe("Dishes Auth", () => {
  test("Admin", async () => {
    const session = sessions[Role.Admin] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertAdmin("Dishes");
    await expect(session.dishes.companySelect).toBeVisible();

    // Restaurant dishes page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertAdmin("Dishes");
    await expect(session.dishes.companySelect).toBeVisible();

    // Invalid restaurant dishes page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/dishes/-1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/dishes/a`);

    // Dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1/1`,
      "Cola - Menudget"
    );
    await session.dishes.nav.assertAdmin("Dishes");
    await expect(session.dishes.companySelect).toBeVisible();

    // Invalid dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/-1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/dishes/1/-1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/a`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/dishes/1/a`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1/1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/dishes/-1/1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a/1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/dishes/a/1`);

    // New dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1/new`,
      "New Dish - Menudget"
    );
    await session.dishes.nav.assertAdmin("Dishes");
    await expect(session.dishes.companySelect).toBeVisible();

    // Invalid new dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1/new`);
    await session.error404.assert(
      `${process.env.SERVER_URL}/cms/dishes/-1/new`
    );
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a/new`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/dishes/a/new`);
  });

  test("Manager", async () => {
    const session = sessions[Role.Manager] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertManager("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Restaurant dishes page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertManager("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Invalid restaurant dishes page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertManager("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertManager("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1/1`,
      "Cola - Menudget"
    );
    await session.dishes.nav.assertManager("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Invalid dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/-1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/dishes/1/-1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/a`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/dishes/1/a`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertManager("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertManager("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // New dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1/new`,
      "New Dish - Menudget"
    );
    await session.dishes.nav.assertManager("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Invalid new dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1/new`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertManager("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a/new`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertManager("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();
  });

  test("Waiter", async () => {
    const session = sessions[Role.Waiter] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Restaurant dishes page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Invalid restaurant dishes page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1/1`,
      "Cola - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Invalid dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/-1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/dishes/1/-1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/a`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/dishes/1/a`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // New dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/new`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1/new`,
      "New Dish - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();

    // Invalid new dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1/new`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.dishes.nav.assertWaiter("Dishes");
    await expect(session.dishes.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a/new`);
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
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Restaurant dishes page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid restaurant dishes page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // New dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid new dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
  });

  test("Anon", async () => {
    const session = sessions[Role.Anon] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Restaurant dishes page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid restaurant dishes page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/1/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // New dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid new dish page
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/-1/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/dishes/a/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
  });
});
