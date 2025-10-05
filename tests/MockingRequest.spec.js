const { test, expect } = require('@playwright/test');
test('Mocking Request Playwright test', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("thivyanagammaip@gmail.com");
    await page.locator("#userPassword").fill("Thivya@24!");
    await page.locator("#login").click();
    //await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=68e141b4f669d6cb0afcc6ab" }));
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p.blink_me")).toHaveText("You are not authorize to view this order");
});