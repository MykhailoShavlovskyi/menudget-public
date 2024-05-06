import { expect, test } from "@playwright/test";
import { AppSession, createSessionPerRole } from "../../utils/session";
import { Role } from "../../../serv/src/definitions/Role";
import db from "../../../serv/db/db";
import { getElementBorder } from "../../utils/element";
import { uploadFile } from "../../utils/file";

let session: AppSession;

test.beforeAll(async ({ browser }) => {
  // Create session
  const sessions = await createSessionPerRole(browser, [Role.Admin]);
  session = sessions[Role.Admin];

  // Go to restaurants page
  await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants`);
});

test.afterAll(() => session.page.close());

const restaurantPageRegex = new RegExp("/cms/restaurants/[0-9]");

test.describe("Restaurants Creating", () => {
  test("Open form", async () => {
    // Assert no form
    await expect(session.page.url()).toBe(
      `${process.env.SERVER_URL}/cms/restaurants`
    );
    await expect(session.restaurants.form).toBeHidden();

    // Open form, assert
    await session.restaurants.createRestaurantBtn.click();
    await session.page.waitForURL(
      `${process.env.SERVER_URL}/cms/restaurants/new`
    );
    await expect(session.restaurants.form).toBeVisible();
  });

  test("Form default values", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Assert form // TODO errors
    await expect(restaurants.formHeader).toBeVisible();
    await expect(restaurants.formHeader).toHaveText("Create restaurant");
    await expect(restaurants.nameInput).toBeVisible();
    await expect(restaurants.nameInput).toHaveValue("New restaurant");
    await expect(restaurants.managerEmailInput).toBeVisible();
    await expect(restaurants.managerEmailInput).toHaveValue("");
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
    await expect(restaurants.deleteBtn).toBeHidden();
  });

  // TODO all field errors

  test("Name", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit name
    await restaurants.nameInput.fill("Great cafe");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.nameInput).toHaveValue("Great cafe");

      const card = restaurants.getRestaurantCard("Great cafe");
      await expect(card).toHaveText("Great cafeWe have tasty food");
      await expect(await getElementBorder(card)).not.toBe(
        "0px none rgb(0, 0, 0)"
      );
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "Great cafe" } });
  });

  test("Description", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit description
    await restaurants.descriptionInput.fill("Yummy sushi");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.descriptionInput).toHaveValue("Yummy sushi");

      const card = restaurants.getRestaurantCard("New restaurant");
      await expect(card).toHaveText("New restaurantYummy sushi");
      await expect(await getElementBorder(card)).not.toBe(
        "0px none rgb(0, 0, 0)"
      );
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Monday open time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit monday open time
    await restaurants.monOpen.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.monOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Tuesday open time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit tuesday open time
    await restaurants.tueOpen.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.tueOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Wednesday open time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit wednesday open time
    await restaurants.wedOpen.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.wedOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Thursday open time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit thursday open time
    await restaurants.thuOpen.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.thuOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Friday open time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit friday open time
    await restaurants.friOpen.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.friOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Saturday open time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit saturday open time
    await restaurants.satOpen.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.satOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Sunday open time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit sunday open time
    await restaurants.sunOpen.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.sunOpen).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Monday close time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit monday close time
    await restaurants.monClose.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.monClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Tuesday close time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit tuesday close time
    await restaurants.tueClose.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.tueClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Wednesday close time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit wednesday close time
    await restaurants.wedClose.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.wedClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Thursday close time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit thursday close time
    await restaurants.thuClose.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.thuClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Friday close time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit friday close time
    await restaurants.friClose.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.friClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Saturday close time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit saturday close time
    await restaurants.satClose.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.satClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Sunday close time", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Edit sunday close time
    await restaurants.sunClose.fill("14");
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect(restaurants.sunClose).toHaveValue("14");
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Logo", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Upload logo
    await uploadFile(session.page, "./uploads/logo-1.png", () =>
      restaurants.addLogoBtn.click()
    );
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect.soft(restaurants.logo).toHaveScreenshot("logo-1.png");
      const card = restaurants.getRestaurantCard("New restaurant");
      await expect.soft(card).toHaveScreenshot("logo-1-card.png");

      await expect(restaurants.removeLogoBtn).toBeVisible();
      await expect(restaurants.removeLogoBtn).toBeEnabled();
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });

  test("Banner", async () => {
    // Go to new restaurant page
    const { restaurants } = session;
    await session.page.goto(`${process.env.SERVER_URL}/cms/restaurants/new`);

    // Upload banner
    await uploadFile(session.page, "./uploads/banner-1.png", () =>
      restaurants.addBannerBtn.click()
    );
    await restaurants.managerEmailInput.fill("new-manager@gmail.com");
    await restaurants.saveBtn.click();
    await session.page.waitForURL((url) =>
      restaurantPageRegex.test(url.pathname)
    );

    // Assert
    const assert = async () => {
      await expect(restaurantPageRegex.test(session.page.url())).toBe(true);
      await expect(restaurants.formHeader).toHaveText("Edit restaurant");
      await expect.soft(restaurants.banner).toHaveScreenshot("banner-1.png");
      await expect(restaurants.removeBannerBtn).toBeVisible();
      await expect(restaurants.removeBannerBtn).toBeEnabled();
    };
    await assert();

    // Reload, assert
    await session.page.reload();
    await assert();

    // Cleanup
    await db.restaurant.deleteMany({ where: { name: "New restaurant" } });
  });
});
