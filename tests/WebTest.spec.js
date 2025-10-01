const { test, expect } = require('@playwright/test');

test('WebAutomation Playwright test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahul");
    await page.locator("#password").fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    /*    console.log(await page.locator(".card-title a").first().textContent());
       console.log(await page.locator(".card-title a").nth(0).textContent());
       console.log(await page.locator(".card-title a").nth(1).textContent());
       console.log(await page.locator(".card-title a").nth(2).textContent());
       console.log(await page.locator(".card-title a").nth(3).textContent());
       console.log(await page.locator(".card-title a").last().textContent()); */
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-title a").first().waitFor();
    console.log(await page.locator(".card-title a").allTextContents());

});

test('UI Controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const dropDown = page.locator("select[class='form-control']");
    const radioButton = page.locator("span.checkmark");
    const checkBox = page.locator("#terms");

    await userName.fill("rahul");
    await dropDown.selectOption("teach");
    await radioButton.nth(1).click();
    await page.locator("#okayBtn").click();
    console.log(await radioButton.nth(1).isChecked());
    await expect(radioButton.nth(1)).toBeChecked();
    await checkBox.check();
    console.log(await checkBox.isChecked());
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy();
    await expect(page.locator("a[href*='documents']")).toHaveAttribute("class", ".blinkingText");
    await page.pause();

});
test('childWindow', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://demoqa.com/browser-windows");
    const linkThatOpensNewTab = page.locator('#windowButton');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),  // Wait for new window
        linkThatOpensNewTab.click()    // Click opens new window
    ]);
    await newPage.waitForLoadState();
    console.log(await newPage.locator('#sampleHeading').textContent());


});

test('childWindow1', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("a[href*='documents']");
    const userName = page.locator("#username");
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click()

        ]
    )
    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const str = text.split("@");
    const domain = str[1].split(" ")[0];
    await userName.fill(domain.split(".com")[0]);

    console.log(await userName.inputValue());

    await page.pause();








});