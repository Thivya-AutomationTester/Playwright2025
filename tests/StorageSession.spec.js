const { test, expect } = require('@playwright/test');
let webContext;
test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.locator("#userEmail").fill("thivyanagammaip@gmail.com");
    await page.locator("#userPassword").fill("Thivya@24!");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
})
test('Page Playwright test', async () => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    //await allTitles.first().waitFor();
    const cardTitles = page.locator(".card-body b");
    const titles = await cardTitles.allTextContents();
    console.log(titles);

});