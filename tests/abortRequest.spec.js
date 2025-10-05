const { test } = require('@playwright/test');

test('WebAutomation Playwright test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const signIn = page.locator("#signInBtn");
    //page.route('**/*.css', route => route.abort());//to block all css
    page.route('**/*.{jpg,jpeg,png}', route => route.abort());//to block all images of type jpg,jpeg or png
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("learning");
    await signIn.click();
    await page.locator(".card-title a").first().waitFor();
    console.log(await page.locator(".card-title a").allTextContents());
    await page.pause();

})