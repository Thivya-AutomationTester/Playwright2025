const { test, expect } = require('@playwright/test');
const { link } = require('fs');
test('Locators Playwright test', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("tst");
    await page.getByRole("button", { name: 'Submit' }).click();
    expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy();
    await page.getByRole("link", { name: 'Shop' }).click();
    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click();
    await page.pause();


});

test('endToendTestOtherWay', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginId = "thivyanagammaip@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const cardTitles = page.locator(".card-body b");
    await page.getByPlaceholder("email@example.com").fill(loginId);
    await page.getByPlaceholder("enter your passsword").fill("Thivya@24!");
    await page.getByRole("button", { name: 'Login' }).click();
    await cardTitles.first().waitFor();

    const productName = "iphone 13 pro";
    const products = page.locator(".card-body");
    await products.filter({ hasText: productName }).getByRole("button", { name: "Add to Cart" }).click();
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

    await page.locator("div.cart ul").first().waitFor();
    const bool = await page.getByText(productName).isVisible();
    expect(bool).toBeTruthy();

    await page.getByRole("button", { name: "Checkout" }).click();
    await expect(page.getByText(loginId)).toHaveCount(1);
    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    await page.getByRole("button", { name: "India" }).nth(1).click();
    await page.locator("div:has-text('CVV Code')+.input").fill("431");
    await page.locator("div:has-text('Name on Card')+.input").fill(loginId.split("@")[0]);
    await page.locator("div:has-text('Apply Coupon')+.input").fill("rahulshettyacademy");
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("THANKYOU FOR THE ORDER.")).toBeVisible();

});

test('Calendar Playwright test', async ({ page }) => {
    const month = "12";
    const date = "4";
    const year = "2027";
    const expectedList = [month, date, year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__calendar-button__icon").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    const yearsInCalendar = page.locator(".react-calendar__decade-view__years button");
    if (await yearsInCalendar.first().textContent() > year) {
        const clickCount = Number(await yearsInCalendar.first().textContent()) - Number(year);
        const val = Math.ceil(clickCount / 10);
        for (let i = 0; i < val; i++) {
            await page.locator(".react-calendar__navigation__prev-button").click();
        }
    }

    else if (await yearsInCalendar.last().textContent() < year) {
        const clickCount = Number(year) - Number(await yearsInCalendar.last().textContent());
        const val = Math.ceil(clickCount / 10);
        for (let i = 0; i < val; i++) {
            await page.locator(".react-calendar__navigation__next-button").click();
        }
    }

    await page.getByText(year).click();

    await page.locator(".react-calendar__year-view__months__month").nth(Number(month - 1)).click();
    await page.locator("//button[not(contains(@class,'--neighboringMonth'))] //abbr[text()='" + date + "']").click();

    const inputs = page.locator(".react-date-picker__inputGroup__input");

    for (let i = 0; i < expectedList.length; i++) {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }

    //await page.pause();


});

test.only('Alerts Frames browserFunctions', async ({ page }) => {

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
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("a[href='lifetime-access']:visible").click();
    console.log((await framesPage.locator("div.content-side h2").textContent()).split(" ")[1]);

});