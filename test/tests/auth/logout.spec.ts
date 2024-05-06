import { expect, test } from "@playwright/test";
import {
  AppSession,
  closeSessions,
  createSessionPerRole,
  forAllSessions,
  RoleSessions,
} from "../../utils/session";
import { Role } from "../../../serv/src/definitions/Role";

let sessions: RoleSessions;

test.beforeAll(async ({ browser }) => {
  sessions = await createSessionPerRole(browser, [
    Role.Admin,
    Role.Manager,
    Role.Waiter,
  ]);

  await forAllSessions(sessions, (v) => v.page.goto(process.env.SERVER_URL));
});

test.afterAll(() => closeSessions(sessions));

test.describe("Auth Logout", () => {
  test.skip("Admin", async () => {
    const session = sessions[Role.Admin] as AppSession;

    await expect(session.restaurants.logoutBtn).toBeVisible();
    await expect(session.restaurants.logoutBtn).toBeEnabled();
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/restaurants`
    );

    await session.restaurants.logoutBtn.click();
    await session.page.waitForURL(`${process.env.SERVER_URL}/cms/auth/login`);
    await session.page.waitForTimeout(250);
    await session.login.assert();
  });

  test.skip("Manager", async () => {
    const session = sessions[Role.Manager] as AppSession;

    await expect(session.restaurants.logoutBtn).toBeVisible();
    await expect(session.restaurants.logoutBtn).toBeEnabled();
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/dishes/1`
    );

    await session.restaurants.logoutBtn.click();
    await session.page.waitForURL(`${process.env.SERVER_URL}/cms/auth/login`);
    await session.page.waitForTimeout(250);
    await session.login.assert();
  });

  test.skip("Waiter", async () => {
    const session = sessions[Role.Waiter] as AppSession;

    await expect(session.restaurants.logoutBtn).toBeVisible();
    await expect(session.restaurants.logoutBtn).toBeEnabled();
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/dishes/1`
    );

    await session.restaurants.logoutBtn.click();
    await session.page.waitForURL(`${process.env.SERVER_URL}/cms/auth/login`);
    await session.page.waitForTimeout(250);
    await session.login.assert();
  });
});
