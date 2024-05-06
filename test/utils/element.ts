import { Locator, Page } from "@playwright/test";

export async function getElementBorder(locator: Locator) {
  return locator.evaluate((el) => {
    return getComputedStyle(el).border;
  });
}

export async function dragAndDrop(
  page: Page,
  toDrag: Locator,
  target: Locator
) {
  const toDragBox = await toDrag.boundingBox();
  const targetBox = await target.boundingBox();

  await page.mouse.move(
    toDragBox!.x + toDragBox!.width * 0.5,
    toDragBox!.y + toDragBox!.height * 0.5
  );
  await page.mouse.down();
  await page.mouse.move(
    targetBox!.x + targetBox!.width * 0.5,
    targetBox!.y + targetBox!.height * 0.5,
    { steps: 16 }
  );
  await page.mouse.up();
}
