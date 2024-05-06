import { chromium, FullConfig } from "@playwright/test";
import { headless } from "./playwright.config";
import { SecurePassword } from "../serv/node_modules/@blitzjs/auth/secure-password";
import db from "../serv/db/db";
import { clearBucket } from "../serv/s3/s3";
import { LoginPage } from "./pages/LoginPage";

export const adminStoragePath = "./ss/adminStorageState.json";
export const managerStoragePath = "./ss/managerStorageState.json";
export const waiterStoragePath = "./ss/waiterStorageState.json";
export const userStoragePath = "./ss/userStoragePath.json";

async function loginAs(email: string, password: string, storage: string) {
  const browser = await chromium.launch({ headless });
  const page = await browser.newPage();

  await page.goto("http://localhost:3000");
  await new LoginPage(page).login(email, password);
  await page.waitForURL((url) => !url.pathname.includes("login"));
  await page.context().storageState({ path: storage });

  await browser.close();
}

async function globalSetup(config: FullConfig): Promise<void> {
  await db.restaurant.deleteMany();
  await db.user.deleteMany();
  await clearBucket();

  const restaurant = await db.restaurant.create({
    data: { name: "Nefertari", id: 1 },
  });
  await db.category.create({
    data: { id: 1, restaurantId: 1, name: "Category A", order: 0 },
  });
  await db.dish.create({
    data: { id: 1, restaurantId: 1, categoryId: 1, name: "Cola", order: 0 },
  });
  await db.table.create({
    data: { id: 1, restaurantId: 1, name: "Corner 1" },
  });

  const adminPassword = await SecurePassword.hash(
    process.env.ADMIN_PASSWORD.trim()
  );
  const managerPassword = await SecurePassword.hash(
    process.env.MANAGER_PASSWORD.trim()
  );
  const waiterPassword = await SecurePassword.hash(
    process.env.WAITER_PASSWORD.trim()
  );
  const userPassword = await SecurePassword.hash(
    process.env.USER_PASSWORD.trim()
  );
  await db.user.create({
    data: {
      id: 1,
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      hashedPassword: adminPassword,
      role: "Admin",
    },
  });
  await db.user.create({
    data: {
      id: 2,
      name: "Manager",
      email: process.env.MANAGER_EMAIL,
      hashedPassword: managerPassword,
      role: "Manager",
      restaurantId: restaurant.id,
    },
  });
  await db.user.create({
    data: {
      id: 3,
      name: "Waiter",
      email: process.env.WAITER_EMAIL,
      hashedPassword: waiterPassword,
      role: "Waiter",
      restaurantId: restaurant.id,
    },
  });
  await db.user.create({
    data: {
      id: 4,
      name: "User",
      email: process.env.USER_EMAIL,
      hashedPassword: userPassword,
      role: "User",
    },
  });

  //return;
  await Promise.all([
    loginAs(
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD,
      adminStoragePath
    ),
    loginAs(
      process.env.MANAGER_EMAIL,
      process.env.MANAGER_PASSWORD,
      managerStoragePath
    ),
    loginAs(
      process.env.WAITER_EMAIL,
      process.env.WAITER_PASSWORD,
      waiterStoragePath
    ),
    //loginAs(process.env.USER_EMAIL, process.env.USER_PASSWORD, userStoragePath),
  ]);
}

export default globalSetup;
