import { expect, test } from "@playwright/test";
import { AppSession, createSessionPerRole } from "../../utils/session";
import { Role } from "../../../serv/src/definitions/Role";
import db from "../../../serv/db/db";
import { getElementBorder } from "../../utils/element";
import { uploadFile } from "../../utils/file";

let session: AppSession;
let restaurantId;

test.beforeAll(async ({ browser }) => {
  // Create session
  const sessions = await createSessionPerRole(browser, [Role.Admin]);
  session = sessions[Role.Admin];

  // Create restaurant
  const restaurant = await db.restaurant.create({
    data: { name: "Edit test" },
    select: { id: true },
  });
  restaurantId = restaurant.id;
});

test.afterAll(async () => {
  // Delete restaurant
  await db.restaurant.delete({ where: { id: restaurantId } });

  // Close session
  await session.page.close();
});

test.describe("Restaurants Editing", () => {
  test("Select restaurant", async () => {
    // Go to restaurants page
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants`);

    // Select restaurant
    const card1 = session.restaurants.getRestaurantCard("Nefertari");
    await expect(await getElementBorder(card1)).toBe("0px none rgb(0, 0, 0)");
    await card1.click();
    await session.page.waitForURL((url) =>
      new RegExp("/cms/restaurants/[0-9]").test(url.pathname)
    );
    await expect(await getElementBorder(card1)).not.toBe(
      "0px none rgb(0, 0, 0)"
    );
    await expect(session.restaurants.nameInput).toHaveValue("Nefertari");

    // Select restaurant
    const card2 = session.restaurants.getRestaurantCard("Edit test");
    await expect(await getElementBorder(card2)).toBe("0px none rgb(0, 0, 0)");
    await card2.click();
    await session.page.waitForURL((url) =>
      new RegExp("/cms/restaurants/[0-9]").test(url.pathname)
    );
    await expect(await getElementBorder(card2)).not.toBe(
      "0px none rgb(0, 0, 0)"
    );
    await expect(session.restaurants.nameInput).toHaveValue("Edit test");
  });

  test.skip("Form default values", async () => {
    // Go to restaurant page
    const { restaurants } = session;
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Assert form // TODO errors
    await expect(restaurants.formHeader).toBeVisible();
    await expect(restaurants.formHeader).toHaveText("Edit restaurant");
    await expect(restaurants.nameInput).toBeVisible();
    await expect(restaurants.nameInput).toHaveValue("Edit test");
    await expect(restaurants.managerEmailInput).toBeHidden();
    await expect(restaurants.descriptionInput).toBeVisible();
    await expect(restaurants.descriptionInput).toHaveValue(
      "We have tasty food"
    );
    //
    await expect(restaurants.monOpen).toBeVisible();
    await expect(restaurants.monOpen).toHaveValue("10");
    await expect(restaurants.tueOpen).toBeVisible();
    await expect(restaurants.tueOpen).toHaveValue("10");
    await expect(restaurants.wedOpen).toBeVisible();
    await expect(restaurants.wedOpen).toHaveValue("10");
    await expect(restaurants.thuOpen).toBeVisible();
    await expect(restaurants.thuOpen).toHaveValue("10");
    await expect(restaurants.friOpen).toBeVisible();
    await expect(restaurants.friOpen).toHaveValue("10");
    await expect(restaurants.satOpen).toBeVisible();
    await expect(restaurants.satOpen).toHaveValue("12");
    await expect(restaurants.sunOpen).toBeVisible();
    await expect(restaurants.sunOpen).toHaveValue("12");
    await expect(restaurants.monClose).toBeVisible();
    await expect(restaurants.monClose).toHaveValue("22");
    await expect(restaurants.tueClose).toBeVisible();
    await expect(restaurants.tueClose).toHaveValue("22");
    await expect(restaurants.wedClose).toBeVisible();
    await expect(restaurants.wedClose).toHaveValue("22");
    await expect(restaurants.thuClose).toBeVisible();
    await expect(restaurants.thuClose).toHaveValue("22");
    await expect(restaurants.friClose).toBeVisible();
    await expect(restaurants.friClose).toHaveValue("22");
    await expect(restaurants.satClose).toBeVisible();
    await expect(restaurants.satClose).toHaveValue("20");
    await expect(restaurants.sunClose).toBeVisible();
    await expect(restaurants.sunClose).toHaveValue("20");
    //
    await expect(restaurants.addLogoBtn).toBeVisible();
    await expect(restaurants.addLogoBtn).toBeEnabled();
    await expect(restaurants.addBannerBtn).toBeVisible();
    await expect(restaurants.addBannerBtn).toBeEnabled();
    //
    await expect(restaurants.saveBtn).toBeVisible();
    await expect(restaurants.saveBtn).toBeEnabled();
    await expect(restaurants.deleteBtn).toBeVisible();
    await expect(restaurants.deleteBtn).toBeEnabled();
  });

  // TODO all field errors

  test.skip("Name", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit name
    await session.restaurants.nameInput.fill("Edited name");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.nameInput).toHaveValue("Edited name");
      await expect(
        session.restaurants.getRestaurantCard("Edited name")
      ).toBeVisible();
      await expect(
        session.restaurants.getRestaurantCard("Edited name")
      ).toHaveText("Edited nameWe have tasty food");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: { name: "Edit test" },
    });
  });

  test.skip("Description", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit description
    await session.restaurants.descriptionInput.fill("Edited description");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.descriptionInput).toHaveValue(
        "Edited description"
      );
      await expect(
        session.restaurants.getRestaurantCard("Edit test")
      ).toBeVisible();
      await expect(
        session.restaurants.getRestaurantCard("Edit test")
      ).toHaveText("Edit testEdited description");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: { description: "We have tasty food" },
    });
  });

  test.skip("Monday open time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit monday open time
    await session.restaurants.monOpen.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.monOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("Tuesday open time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit tuesday open time
    await session.restaurants.tueOpen.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.tueOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("Wednesday open time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit wednesday open time
    await session.restaurants.wedOpen.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.wedOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("Thursday open time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit thursday open time
    await session.restaurants.thuOpen.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.thuOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("Friday open time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit friday open time
    await session.restaurants.friOpen.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.friOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("Saturday open time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit saturday open time
    await session.restaurants.satOpen.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.satOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("Sunday open time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit sunday open time
    await session.restaurants.sunOpen.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.sunOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("Monday close time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit monday close time
    await session.restaurants.monClose.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.monClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("Tuesday close time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit tuesday close time
    await session.restaurants.tueClose.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.tueClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("Wednesday close time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit wednesday close time
    await session.restaurants.wedClose.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.wedClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("Thursday close time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit thursday close time
    await session.restaurants.thuClose.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.thuClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("Friday close time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit friday close time
    await session.restaurants.friClose.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.friClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("Saturday close time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit saturday close time
    await session.restaurants.satClose.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.satClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("Sunday close time", async () => {
    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Edit sunday close time
    await session.restaurants.sunClose.fill("14");
    await session.restaurants.saveBtn.click();
    await session.page.waitForTimeout(25);

    // Assert
    const assert = async () => {
      await expect(session.restaurants.sunClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        openTimes: [10, 10, 10, 10, 10, 12, 12],
        closeTimes: [22, 22, 22, 22, 22, 20, 20],
      },
    });
  });

  test.skip("1. Add logo", async () => {
    const { restaurants } = session;

    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Upload logo
    await uploadFile(session.page, "./uploads/logo-1.png", () =>
      restaurants.addLogoBtn.click()
    );
    await restaurants.saveBtn.click();
    await session.page.waitForTimeout(500);

    // Assert
    const assert = async () => {
      const card = restaurants.getRestaurantCard("Edit test");
      await expect.soft(card).toHaveScreenshot("logo-1-card.png");

      await expect.soft(restaurants.logo).toHaveScreenshot("logo-1.png");
      await expect(restaurants.removeLogoBtn).toBeVisible();
      await expect(restaurants.removeLogoBtn).toBeEnabled();
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();
  });

  test.skip("2. Replace logo", async () => {
    const { restaurants } = session;

    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Upload logo
    await uploadFile(session.page, "./uploads/logo-2.png", () =>
      restaurants.addLogoBtn.click()
    );
    await restaurants.saveBtn.click();
    await session.page.waitForTimeout(500);

    // Assert
    const assert = async () => {
      const card = restaurants.getRestaurantCard("Edit test");
      await expect.soft(card).toHaveScreenshot("logo-2-card.png");

      await expect.soft(restaurants.logo).toHaveScreenshot("logo-2.png");
      await expect(restaurants.removeLogoBtn).toBeVisible();
      await expect(restaurants.removeLogoBtn).toBeEnabled();
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();
  });

  test.skip("3. Remove logo", async () => {
    const { restaurants } = session;

    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Remove logo
    await restaurants.removeLogoBtn.click();
    await restaurants.saveBtn.click();
    await session.page.reload();

    // Assert
    const assert = async () => {
      await expect(restaurants.logo).toBeHidden();
      const card = restaurants.getRestaurantCard("Edit test");
      await expect.soft(card).toHaveScreenshot("no-logo-card.png");

      await expect(restaurants.removeLogoBtn).toBeHidden();
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();
  });

  test.skip("1. Add banner", async () => {
    const { restaurants } = session;

    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Upload banner
    await uploadFile(session.page, "./uploads/banner-1.png", () =>
      restaurants.addBannerBtn.click()
    );
    await restaurants.saveBtn.click();
    await session.page.waitForTimeout(500);

    // Assert
    const assert = async () => {
      await expect.soft(restaurants.banner).toHaveScreenshot("banner-1.png");
      await expect(restaurants.removeBannerBtn).toBeVisible();
      await expect(restaurants.removeBannerBtn).toBeEnabled();
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();
  });

  test.skip("2. Replace banner", async () => {
    const { restaurants } = session;

    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Upload banner
    await uploadFile(session.page, "./uploads/banner-2.png", () =>
      restaurants.addBannerBtn.click()
    );
    await restaurants.saveBtn.click();
    await session.page.waitForTimeout(500);

    // Assert
    const assert = async () => {
      await expect.soft(restaurants.banner).toHaveScreenshot("banner-2.png");
      await expect(restaurants.removeBannerBtn).toBeVisible();
      await expect(restaurants.removeBannerBtn).toBeEnabled();
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();
  });

  test.skip("3. Remove banner", async () => {
    const { restaurants } = session;

    // Go to restaurant page
    await session.page.goto(
      `${process.env.SERVER_URL}/cms/restaurants/${restaurantId}`
    );

    // Remove banner
    await restaurants.removeBannerBtn.click();
    await restaurants.saveBtn.click();
    await session.page.waitForTimeout(500);

    // Assert
    const assert = async () => {
      await expect(restaurants.banner).toBeHidden();
      await expect(restaurants.removeBannerBtn).toBeHidden();
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();
  });
});
