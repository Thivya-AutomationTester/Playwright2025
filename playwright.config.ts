import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  retries: 1,
  globalSetup: './utils/globalSetup.ts',
  globalTeardown: './utils/globalTeardown.ts',
  use: {
    baseURL: 'https://www.automationexercise.com/',
    headless: false,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    },
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'authenticated-chromium',

      use: {
        browserName: 'chromium',
        storageState: './auth/storageState.json',




      },
      metadata: { requiresAuth: true }

    },
    {
      name: 'unauthenticated-chromium',
      use: {
        browserName: 'chromium',
        storageState: undefined, // no storageState, fresh context
      },
      metadata: { requiresAuth: false }
    }



  ]
});
