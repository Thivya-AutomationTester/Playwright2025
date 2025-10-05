const { test, expect } = require('@playwright/test');

test.only('visual Testing', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    expect(await page.screenshot()).toMatchSnapshot('validateImage.png');
});//In first run test will fail but creates the image validateImage and in second run it will compare the page with the validateImage screenshot,if there is a mismatch then error will be thrown
