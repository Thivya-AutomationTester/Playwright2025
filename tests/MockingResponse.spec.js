const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./Utils/APIUtils');
const loginPayLoad = { userEmail: "thivyanagammaip@gmail.com", userPassword: "Thivya@24!" };
const orderPayLoad = { orders: [{ country: "Austria", productOrderedId: "68a961719320a140fe1ca57c" }] };
const fakePayLoad = { data: [], message: "No Orders" };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiObj = new APIUtils(apiContext, loginPayLoad);
    response = await apiObj.createOrder(orderPayLoad);

});

test('Mocking the response Playwright test', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");

    let body = JSON.stringify(fakePayLoad);
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            route.fulfill({
                response, body,
            })
        }
    )
    await page.pause();
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());

})
