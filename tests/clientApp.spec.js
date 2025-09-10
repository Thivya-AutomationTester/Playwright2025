const { test, expect } = require('@playwright/test');
test('Page Playwright test', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const cardTitles = page.locator(".card-body b");
    await page.locator("#userEmail").fill("thivyanagammaip@gmail.com");
    await page.locator("#userPassword").fill("Thivya@24!");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    //await allTitles.first().waitFor();
    const titles = await cardTitles.allTextContents();
    console.log(titles);

});