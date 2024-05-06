import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export const headless = false;

const allbrowsers = false;

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve("./global-setup"),
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: false, // Run tests in files in parallel
  forbidOnly: !!process.env.CI, // Fail the build on CI if you accidentally left test.only in the source code.
  retries: process.env.CI ? 2 : 0, // Retry on CI only
  workers: process.env.CI ? 1 : 1, // Opt out of parallel tests on CI.
  reporter: "html",
  use: {
    actionTimeout: 0,
    trace: "on-first-retry",
    baseURL: "http://localhost:3000",
    viewport: { width: 1920, height: 1080 },
    headless,
    launchOptions: {
      args: ["--use-gl=egl"], // force GPU hardware acceleration (even in headless mode)
      //slowMo: 150,
    },
  },

  /* Configure projects for major browsers */
  projects: allbrowsers
    ? [
        {
          name: "chromium",
          use: {
            ...devices["Desktop Chrome"],
          },
        },

        {
          name: "firefox",
          use: {
            ...devices["Desktop Firefox"],
          },
        },

        {
          name: "webkit",
          use: {
            ...devices["Desktop Safari"],
          },
        },
      ]
    : [
        {
          name: "chromium",
          use: {
            ...devices["Desktop Chrome"],
          },
        },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: {
        //     ...devices['Pixel 5'],
        //   },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: {
        //     ...devices['iPhone 12'],
        //   },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: {
        //     channel: 'msedge',
        //   },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: {
        //     channel: 'chrome',
        //   },
        // },
      ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
