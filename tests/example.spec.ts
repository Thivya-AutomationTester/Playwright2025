import { test, expect, Page } from '@playwright/test';

let page: Page;

test.beforeAll('Login', async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('login');
  await page.getByRole('button', { name: 'Consent' }).click();
  await page.locator("div.login-form input[type='email']").fill('thivyanagammaip@gmail.com');
  await page.getByPlaceholder('Password').fill('Victory')
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Thivyanagammai')).toBeVisible();

  //await page.pause();
});

test('actualtest', async () => {

  await page.getByRole('link', { name: ' Products' }).click();
  await page.waitForLoadState('networkidle');
  await page.locator('#search_product').fill('Pure Cotton V-Neck T-Shirt');
  await page.locator('#submit_search').click();
  const product = page.locator(".product-image-wrapper").filter({ hasText: "Pure Cotton V-Neck T-Shirt" });
  await product.hover();
  await page.locator(".product-overlay").filter({ hasText: "Pure Cotton V-Neck T-Shirt" }).locator('text=Add to cart').click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Place Order' }).click();
  await page.locator("input[data-qa='name-on-card']").fill('Thivya');
  await page.locator("input[data-qa='card-number']").fill('9876 5429 8765 4242');
  await page.locator("input[data-qa='cvc']").fill('345');
  await page.locator("input[data-qa='expiry-month']").fill('03');
  await page.locator("input[data-qa='expiry-year']").fill('2030');
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
  await page.pause();
})


