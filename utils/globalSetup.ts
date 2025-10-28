import { expect, BrowserContext, Page, FullConfig, chromium, firefox, webkit } from '@playwright/test';
import { loginInfo } from '../utils/TestData';
import path from 'path';
import fs from 'fs';

export default async function setup(config: FullConfig) {
    console.log('am in global')
    const projects = config.projects;
    //const browserName = projects[0].use.browserName || 'chromium';
    const browserName = (process.env.BROWSER)?.toLowerCase() || 'chromium';

    const storageDir = path.resolve('auth');
    if (!fs.existsSync(storageDir)) {
        fs.mkdirSync(storageDir);
    }


    const browserTypes: any = { chromium: chromium, firefox: firefox, webkit: webkit };


    const browserType = browserTypes[browserName];
    if (!browserType) {
        throw new Error(`Unsupported browser: ${browserName}`);
    }


    const browser = await browserType.launch({ headless: false });

    const context = await browser.newContext();
    const page = await context.newPage();
    const baseURL = config.projects[0].use.baseURL;
    const loginUrl = new URL('/login', baseURL).toString();
    await page.goto(loginUrl);
    await page.getByRole('button', { name: 'Consent' }).click();
    await page.locator("div.login-form input[type='email']").fill(loginInfo.email);
    await page.getByPlaceholder('Password').fill(loginInfo.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText(loginInfo.user)).toBeVisible();
    const storagePath = path.join(storageDir, 'storageState.json');
    await context.storageState({ path: storagePath });
    await browser.close();
    console.log('Global setup completed');

}