import { expect, test } from "@playwright/test";
import {
  AppSession,
  closeSessions,
  createSessionPerRole,
  RoleSessions,
} from "../../utils/session";
import { Role } from "../../../serv/src/definitions/Role";
import db from "../../../serv/db/db";
import { getElementBorder } from "../../utils/element";

let sessions: RoleSessions;
let waiterId;

const waiterPageRegex = new RegExp(`/cms/waiters/[0-9]/[0-9]`);

test.beforeAll(async ({ browser }) => {
  // Create sessions
  sessions = await createSessionPerRole(browser, [Role.Admin, Role.Manager]);

  // Create waiter
  const waiter = await db.user.create({
    data: {
      name: "Steven Goldberg",
      email: "goldberg@gmail.com",
      restaurantId: 1,
      role: Role.Waiter,
    },
    select: { id: true },
  });
  waiterId = waiter.id;
});

test.afterAll(async () => {
  // Delete waiter
  await db.user.delete({ where: { id: waiterId } });

  // Close sessions
  return closeSessions(sessions);
});

test.describe("Waiters Editing", () => {
  test("Select waiter", async () => {
    const test = async ({ page, waiters }: AppSession) => {
      // Go to waiters page
      await page.goto(`${process.env.SERVER_URL}/cms/waiters/1`);

      // Select waiter
      const card1 = waiters.getWaiterCard("waiter@menudget.com");
      await expect(await getElementBorder(card1)).toBe("0px none rgb(0, 0, 0)");
      await card1.click();
      await page.waitForURL((url) => waiterPageRegex.test(url.pathname));
      let url1 = page.url();
      await expect(await getElementBorder(card1)).not.toBe(
        "0px none rgb(0, 0, 0)"
      );
      await expect(waiters.nameInput).toHaveValue("Waiter");
      await expect(waiters.emailInput).toHaveValue("waiter@menudget.com");

      // Select waiter
      const card2 = waiters.getWaiterCard("goldberg@gmail.com");
      await expect(await getElementBorder(card2)).toBe("0px none rgb(0, 0, 0)");
      await card2.click();
      await page.waitForURL(
        (url) =>
          waiterPageRegex.test(url.pathname) && !url1.includes(url.pathname)
      );
      await expect(await getElementBorder(card2)).not.toBe(
        "0px none rgb(0, 0, 0)"
      );
      await expect(waiters.nameInput).toHaveValue("Steven Goldberg");
      await expect(waiters.emailInput).toHaveValue("goldberg@gmail.com");
    };
    await Promise.all([
      test(sessions[Role.Admin]),
      test(sessions[Role.Manager]),
    ]);
  });

  test("Form default values", async () => {
    const test = async ({ page, waiters }: AppSession) => {
      // Go to waiter page
      await page.goto(`${process.env.SERVER_URL}/cms/waiters/1/${waiterId}`);

      // Assert form
      await expect(waiters.formHeader).toBeVisible();
      await expect(waiters.formHeader).toHaveText("Edit waiter");
      await expect(waiters.nameInput).toBeVisible();
      await expect(waiters.nameInput).toHaveValue("Steven Goldberg");
      await expect(waiters.nameError).toBeHidden();
      await expect(waiters.emailInput).toBeVisible();
      await expect(waiters.emailInput).toHaveValue("goldberg@gmail.com");
      await expect(waiters.emailError).toBeHidden();
      //
      await expect(waiters.saveBtn).toBeVisible();
      await expect(waiters.saveBtn).toBeEnabled();
      await expect(waiters.deleteBtn).toBeVisible();
      await expect(waiters.deleteBtn).toBeEnabled();
    };
    await Promise.all([
      test(sessions[Role.Admin]),
      test(sessions[Role.Manager]),
    ]);
  });

  // TODO all field errors

  test("Name", async () => {
    const test = async ({ page, waiters }: AppSession) => {
      // Go to waiter page
      await page.goto(`${process.env.SERVER_URL}/cms/waiters/1/${waiterId}`);

      // Empty name
      await waiters.nameInput.fill("");
      await waiters.form.click();
      await expect(waiters.nameError).toHaveText("Name is a required field");

      // Edit name
      await waiters.nameInput.fill("Edited name");
      await waiters.saveBtn.click();
      await page.waitForTimeout(25);

      // Assert
      const assert = async () => {
        await expect(waiters.nameInput).toHaveValue("Edited name");
        await expect(waiters.getWaiterCard("goldberg@gmail.com")).toHaveText(
          "Edited namegoldberg@gmail.com"
        );
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.user.update({
        where: { id: waiterId },
        data: { name: "Steven Goldberg" },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
  });

  test("Email", async () => {
    const test = async ({ waiters, page }: AppSession) => {
      // Go to waiter page
      await page.goto(`${process.env.SERVER_URL}/cms/waiters/1/${waiterId}`);

      // Edit email
      await waiters.emailInput.fill("edited@gmail.com");
      await waiters.saveBtn.click();
      await page.waitForTimeout(25);

      // Assert
      const assert = async () => {
        await expect(waiters.emailInput).toHaveValue("edited@gmail.com");
        await expect(waiters.getWaiterCard("goldberg@gmail.com")).toBeHidden();
        await expect(waiters.getWaiterCard("edited@gmail.com")).toHaveText(
          "Steven Goldbergedited@gmail.com"
        );
      };
      await assert();

      // Reload, assert
      await page.reload();
      await assert();

      // Cleanup
      await db.user.update({
        where: { id: waiterId },
        data: { email: "goldberg@gmail.com" },
      });
    };
    await test(sessions[Role.Admin]);
    await test(sessions[Role.Manager]);
  });
});
