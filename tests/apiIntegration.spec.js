const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./Utils/APIUtils');
const loginPayLoad = { userEmail: "thivyanagammaip@gmail.com", userPassword: "Thivya@24!" };
const orderPayLoad = { orders: [{ country: "Austria", productOrderedId: "68a961719320a140fe1ca57c" }] };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiObj = new APIUtils(apiContext, loginPayLoad);
    response = await apiObj.createOrder(orderPayLoad);

});

test.only('endToend Playwright test', async ({ page }) => {

    const loginId = "thivyanagammaip@gmail.com";
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("h1:has-text('Your Orders')").waitFor();
    const tableRow = page.locator(".table tr");
    const tablerowCount = await tableRow.count();
    for (let i = 1; i < tablerowCount; i++) {
        const idInOrdersPage = await tableRow.nth(i).locator("th").textContent();
        if (response.orderId.includes(idInOrdersPage)) {
            await tableRow.nth(i).locator("text=View").click();
            break;
        }
    }
    const orderIdInfo = await page.locator("div.col-text").textContent();
    expect(response.orderId.includes(orderIdInfo)).toBeTruthy();

})
