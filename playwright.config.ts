import { defineConfig, devices } from '@playwright/test';
const BROWSER = (process.env.BROWSER || 'chromium') as 'chromium' | 'firefox' | 'webkit';

export default defineConfig({
  testDir: './tests',
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  retries: 1,
  globalSetup: './utils/globalSetup.ts',
  globalTeardown: './utils/globalTeardown.ts',
  snapshotPathTemplate: "{testDir}/snapshots/{arg}{ext}",

  use: {
    baseURL: 'https://www.automationexercise.com/',
    headless: true,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    },

    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'authenticated',

      use: {
        browserName: BROWSER,
        storageState: './auth/storageState.json',

      },

      metadata: { requiresAuth: true }

    },
    {
      name: 'unauthenticated',
      use: {
        browserName: BROWSER,
        storageState: undefined,
      },
      metadata: { requiresAuth: false }
    }



  ]
});
