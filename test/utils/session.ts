import { Browser, Page } from "@playwright/test";
import { Role } from "../../serv/src/definitions/Role";
import {
  adminStoragePath,
  managerStoragePath,
  userStoragePath,
  waiterStoragePath,
} from "../global-setup";
import { Error403Page } from "../pages/Error403Page";
import { Error404Page } from "../pages/Error404Page";
import { RestaurantsPage } from "../pages/RestaurantsPage";
import { DishesPage } from "../pages/DishesPage";
import { OrdersPage } from "../pages/OrdersPage";
import { WaitersPages } from "../pages/WaitersPages";
import { TablesPage } from "../pages/TablesPage";
import { LoginPage } from "../pages/LoginPage";

export type AppSession = {
  page: Page;

  error403: Error403Page;
  error404: Error404Page;

  login: LoginPage;
  restaurants: RestaurantsPage;
  dishes: DishesPage;
  orders: OrdersPage;
  tables: TablesPage;
  waiters: WaitersPages;
};

type RolePages = Record<number, Page>;
export type RoleSessions = Record<number, AppSession>;

async function createPagePerRole(
  browser: Browser,
  roles = Object.values(Role)
): Promise<RolePages> {
  async function createPage(storageState?: string) {
    const context = await browser.newContext({ storageState });
    return context.newPage();
  }

  const pages = {};

  if (roles.includes(Role.Anon)) pages[Role.Anon] = await createPage();

  if (roles.includes(Role.User))
    pages[Role.User] = await createPage(userStoragePath);

  if (roles.includes(Role.Waiter))
    pages[Role.Waiter] = await createPage(waiterStoragePath);

  if (roles.includes(Role.Manager))
    pages[Role.Manager] = await createPage(managerStoragePath);

  if (roles.includes(Role.Admin))
    pages[Role.Admin] = await createPage(adminStoragePath);

  return pages;
}

export async function createSessionPerRole(
  browser: Browser,
  roles = Object.values(Role)
): Promise<RoleSessions> {
  const pages = await createPagePerRole(browser, roles);

  const getSession = (page: Page) => {
    return {
      page,
      error403: new Error403Page(page),
      error404: new Error404Page(page),
      login: new LoginPage(page),
      restaurants: new RestaurantsPage(page),
      dishes: new DishesPage(page),
      orders: new OrdersPage(page),
      tables: new TablesPage(page),
      waiters: new WaitersPages(page),
    } as AppSession;
  };

  const sessions: RoleSessions = {};
  if (pages[Role.Admin]) sessions[Role.Admin] = getSession(pages[Role.Admin]);
  if (pages[Role.Manager])
    sessions[Role.Manager] = getSession(pages[Role.Manager]);
  if (pages[Role.Waiter])
    sessions[Role.Waiter] = getSession(pages[Role.Waiter]);
  if (pages[Role.User]) sessions[Role.User] = getSession(pages[Role.User]);
  if (pages[Role.Anon]) sessions[Role.Anon] = getSession(pages[Role.Anon]);

  return sessions;
}

export async function closeSessions(sessions: RoleSessions) {
  await Promise.all([
    sessions[Role.Admin]?.page.close(),
    sessions[Role.Manager]?.page.close(),
    sessions[Role.Waiter]?.page.close(),
    sessions[Role.User]?.page.close(),
    sessions[Role.Anon]?.page.close(),
  ]);
}

export function forAllSessions(
  sessions: RoleSessions,
  action: (session: AppSession) => Promise<any>
) {
  return Promise.all(Object.values(sessions).map(action));
}
