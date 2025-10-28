import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  retries: 1,
  globalSetup: './utils/globalSetup.ts',
  globalTeardown: './utils/globalTeardown.ts',
  use: {
    baseURL: 'https://www.automationexercise.com/',

    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',

      use: {
        browserName: 'chromium',
        storageState: './auth/storageState.json',
        headless: false,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized']
        }


      },
    },



  ]
});
