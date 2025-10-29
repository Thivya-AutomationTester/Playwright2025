import { expect, BrowserContext, Page, FullConfig, chromium, firefox, webkit } from '@playwright/test';
import { loginInfo } from '../utils/TestData';
import { LoginPage } from '../PageObjects/login-page';
import path from 'path';
import fs from 'fs';

export default async function setUp(config: FullConfig) {
    console.log('Global setup started')
    const projects = config.projects;

    const currentProjectName: any = process.env.PW_PROJECT;
    const currentProject: any = config.projects.find(p => p.name === currentProjectName);
    const baseURL: any = currentProject?.use?.baseURL;
    console.log(`PW_PROJECT="${process.env.PW_PROJECT}"`);

    const browserName = (process.env.BROWSER)?.toLowerCase() || projects[0].use.browserName || 'chromium';

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
    if (!currentProject?.metadata?.requiresAuth) {
        console.log('Skipping global setup for project');
    }
    else {
        const context = await browser.newContext();
        const page = await context.newPage();
        const loginUrl = new URL('/login', baseURL).toString();
        const loginPage = new LoginPage(page);
        await loginPage.navigateToApp(loginUrl);
        await loginPage.loginUser(loginInfo.email, loginInfo.password)
        await expect(page.getByText(loginInfo.user)).toBeVisible();
        const storagePath = path.join(storageDir, 'storageState.json');
        await context.storageState({ path: storagePath });

    }
    await browser.close();
    console.log('Global setup completed');

}
