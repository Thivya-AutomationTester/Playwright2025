const { test, expect } = require('@playwright/test');

test('Screenshot Test', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com/maps");
    await page.goBack();
    await page.goForward();
    await page.goBack();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog', dialog => {
        console.log("Dialog message:", dialog.message());
        dialog.accept();
    });
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    await page.screenshot({ path: 'hover.png' });//screenshot
    await page.locator("#mousehover").screenshot({ path: 'hoverPartial.png' });//partial screenshot
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("a[href='lifetime-access']:visible").click();
    console.log((await framesPage.locator("div.content-side h2").textContent()).split(" ")[1]);

});
