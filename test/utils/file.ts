import { Page } from "@playwright/test";
import { readFileSync } from "fs";

function getFileName(path: string): string {
  return path.replace(/^.*[\\\/]/, "");
}

export async function uploadFile(
  page: Page,
  path: string,
  openFileChooser: () => Promise<void>
) {
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.waitForTimeout(25);
  await openFileChooser();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path);
}

export async function dropFile(page: Page, selector: string, path: string) {
  const buffer = readFileSync(path).toString("base64");

  const dataTransfer = await page.evaluateHandle(
    async ({ bufferData, localFileName }) => {
      const blobData = await fetch(bufferData).then((res) => res.blob());
      const file = new File([blobData], localFileName);

      const dt = new DataTransfer();
      dt.items.add(file);
      return dt;
    },
    {
      bufferData: `data:application/octet-stream;base64,${buffer}`,
      localFileName: getFileName(path),
    }
  );

  await page.dispatchEvent(selector, "drop", { dataTransfer });
}
