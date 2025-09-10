const { test, expect } = require('@playwright/test');

test('endToend Playwright test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const loginId = "thivyanagammaip@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const cardTitles = page.locator(".card-body b");
    await page.locator("#userEmail").fill(loginId);
    await page.locator("#userPassword").fill("Thivya@24!");
    await page.locator("#login").click();
    await cardTitles.first().waitFor();
    const titles = await cardTitles.allTextContents();
    console.log(titles);
    const products = await page.locator(".card-body");
    const productName = "iphone 13 pro";
    const productsCount = await products.count();

    for (let i = 0; i < productsCount; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("button[routerlink*='cart']").click();
    await page.locator("div.cart ul").first().waitFor();
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await expect(page.locator(".user__name label")).toHaveText(loginId);
    await page.locator("[placeholder='Select Country']").pressSequentially("Ind");
    const countryDropdown = page.locator(".ta-results span");
    await countryDropdown.first().waitFor();
    const countriesCount = await countryDropdown.count();
    for (let i = 0; i < countriesCount; i++) {
        if (await countryDropdown.nth(i).textContent() === " India") {
            await countryDropdown.nth(i).click();
            break;
        }
    }
    await page.locator("div:has-text('CVV Code')+.input").fill("431");
    await page.locator("div:has-text('Name on Card')+.input").fill(loginId.split("@")[0]);
    await page.locator("div:has-text('Apply Coupon')+.input").fill("rahulshettyacademy");
    await page.locator("button[type='submit']").click();
    await page.locator("input[name='coupon']+p").waitFor();
    await expect(page.locator("input[name='coupon']+p")).toHaveText("* Coupon Applied");
    await page.locator(".action__submit").click();
    await page.locator("h1:has-text(' Thankyou for the order. ')").waitFor();
    await expect(page.locator("h1:has-text(' Thankyou for the order. ')")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator("label.ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("h1:has-text('Your Orders')").waitFor();
    const tableRow = page.locator(".table tr");
    const tablerowCount = await tableRow.count();
    for (let i = 1; i < tablerowCount; i++) {
        const idInOrdersPage = await tableRow.nth(i).locator("th").textContent();
        if (orderId.includes(idInOrdersPage)) {
            await tableRow.nth(i).locator("text=View").click();
            break;
        }
    }
    const orderIdInfo = await page.locator("div.col-text").textContent();
    expect(orderId.includes(orderIdInfo)).toBeTruthy();
    await page.pause();
})
