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

test.describe("Tables Auth", () => {
  test("Admin", async () => {
    const session = sessions[Role.Admin] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertAdmin("Tables");
    await expect(session.tables.companySelect).toBeVisible();

    // Restaurant tables page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertAdmin("Tables");
    await expect(session.tables.companySelect).toBeVisible();

    // Invalid restaurant tables page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/tables/-1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/tables/a`);

    // Table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/1`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1/1`,
      "Corner 1 - Menudget"
    );
    await session.tables.nav.assertAdmin("Tables");
    await expect(session.tables.companySelect).toBeVisible();

    // Invalid table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/-1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/tables/1/-1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/a`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/tables/1/a`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1/1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/tables/-1/1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a/1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/tables/a/1`);

    // New table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/new`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1/new`,
      "New Table - Menudget"
    );
    await session.tables.nav.assertAdmin("Tables");
    await expect(session.tables.companySelect).toBeVisible();

    // Invalid new table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1/new`);
    await session.error404.assert(
      `${process.env.SERVER_URL}/cms/tables/-1/new`
    );
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a/new`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/tables/a/new`);
  });

  test("Manager", async () => {
    const session = sessions[Role.Manager] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertManager("Tables");
    await expect(session.tables.companySelect).toBeHidden();

    // Restaurant tables page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertManager("Tables");
    await expect(session.tables.companySelect).toBeHidden();

    // Invalid restaurant tables page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertManager("Tables");
    await expect(session.tables.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertManager("Tables");
    await expect(session.tables.companySelect).toBeHidden();

    // Table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/1`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1/1`,
      "Corner 1 - Menudget"
    );
    await session.tables.nav.assertManager("Tables");
    await expect(session.tables.companySelect).toBeHidden();

    // Invalid table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/-1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/tables/1/-1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/a`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/tables/1/a`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1/1`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertManager("Tables");
    await expect(session.tables.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a/1`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertManager("Tables");
    await expect(session.tables.companySelect).toBeHidden();

    // New table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/new`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1/new`,
      "New Table - Menudget"
    );
    await session.tables.nav.assertManager("Tables");
    await expect(session.tables.companySelect).toBeHidden();

    // Invalid new table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1/new`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertManager("Tables");
    await expect(session.tables.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a/new`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertManager("Tables");
    await expect(session.tables.companySelect).toBeHidden();
  });

  test("Waiter", async () => {
    const session = sessions[Role.Waiter] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertWaiter("Tables");
    await expect(session.tables.companySelect).toBeHidden();

    // Restaurant tables page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertWaiter("Tables");
    await expect(session.tables.companySelect).toBeHidden();

    // Invalid restaurant tables page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertWaiter("Tables");
    await expect(session.tables.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertWaiter("Tables");
    await expect(session.tables.companySelect).toBeHidden();

    // Table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/1`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1/1`,
      "Corner 1 - Menudget"
    );
    await session.tables.nav.assertWaiter("Tables");
    await expect(session.tables.companySelect).toBeHidden();

    // Invalid table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/-1`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/tables/1/-1`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/a`);
    await session.error404.assert(`${process.env.SERVER_URL}/cms/tables/1/a`);
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1/1`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertWaiter("Tables");
    await expect(session.tables.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a/1`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertWaiter("Tables");
    await expect(session.tables.companySelect).toBeHidden();

    // New table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/new`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1/new`,
      "New Table - Menudget"
    );
    await session.tables.nav.assertWaiter("Tables");
    await expect(session.tables.companySelect).toBeHidden();

    // Invalid new table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1/new`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertWaiter("Tables");
    await expect(session.tables.companySelect).toBeHidden();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a/new`);
    await session.tables.assert(
      `${process.env.SERVER_URL}/cms/tables/1`,
      "Tables - Menudget"
    );
    await session.tables.nav.assertWaiter("Tables");
    await expect(session.tables.companySelect).toBeHidden();
  });

  test("User", async () => {
    const session = sessions[Role.User] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Restaurant tables page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid restaurant tables page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // New table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid new table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
  });

  test("Anon", async () => {
    const session = sessions[Role.Anon] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Restaurant tables page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid restaurant tables page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/1/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // New table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid new table page
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/-1/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/tables/a/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
  });
});
