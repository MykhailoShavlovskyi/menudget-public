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

test.describe("Restaurants Auth", () => {
  test("Admin", async () => {
    const session = sessions[Role.Admin] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants`);
    await session.restaurants.assert(
      `${process.env.SERVER_URL}/cms/restaurants`,
      "Restaurants - Menudget"
    );
    await session.restaurants.nav.assertAdmin("Restaurants");

    // Restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/1`);
    await session.restaurants.assert(
      `${process.env.SERVER_URL}/cms/restaurants/1`,
      "Nefertari - Menudget"
    );
    await session.restaurants.nav.assertAdmin("Restaurants");

    // Invalid restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/-1`);
    await session.error404.assert(
      `${process.env.SERVER_URL}/cms/restaurants/-1`
    );
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/a`);
    await session.error404.assert(
      `${process.env.SERVER_URL}/cms/restaurants/a`
    );

    // New restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);
    await session.restaurants.assert(
      `${process.env.SERVER_URL}/cms/restaurants/new`,
      "New restaurant - Menudget"
    );
    await session.restaurants.nav.assertAdmin("Restaurants");
  });

  test("Manager", async () => {
    const session = sessions[Role.Manager] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.restaurants.nav.assertManager("Dishes");

    // Restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.restaurants.nav.assertManager("Dishes");

    // Invalid restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/-1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.restaurants.nav.assertManager("Dishes");
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/a`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.restaurants.nav.assertManager("Dishes");

    // New restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.restaurants.nav.assertManager("Dishes");
  });

  test("Waiter", async () => {
    const session = sessions[Role.Waiter] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.restaurants.nav.assertWaiter("Dishes");

    // Restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.restaurants.nav.assertWaiter("Dishes");

    // Invalid restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/-1`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.restaurants.nav.assertWaiter("Dishes");
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/a`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.restaurants.nav.assertWaiter("Dishes");

    // New restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);
    await session.dishes.assert(
      `${process.env.SERVER_URL}/cms/dishes/1`,
      "Dishes - Menudget"
    );
    await session.restaurants.nav.assertWaiter("Dishes");
  });

  test("User", async () => {
    const session = sessions[Role.User] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // New restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
  });

  test("Anon", async () => {
    const session = sessions[Role.Anon] as AppSession;

    // Index page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // Invalid restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/-1`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
    //
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/a`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();

    // New restaurant page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/auth/login`
    );
    await session.login.assert();
  });
});
