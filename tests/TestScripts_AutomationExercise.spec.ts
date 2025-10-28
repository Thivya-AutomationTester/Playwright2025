import { expect, test } from '@playwright/test';
import { customTest } from '../utils/TestData';

customTest.skip('Place Order', async ({ page, orderInfo }) => {

  await page.goto('/products');
  await page.getByRole('link', { name: ' Products' }).click();
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => {
    window.scrollTo(0, 1000);
  })
  await page.locator('#search_product').fill(orderInfo.ProductName);
  await page.locator('#submit_search').click();
  await page.locator(".product-image-wrapper").waitFor();
  const product = page.locator(".product-image-wrapper").filter({ hasText: orderInfo.ProductName });
  await product.hover();
  await page.locator(".product-overlay").filter({ hasText: orderInfo.ProductName }).locator('text=Add to cart').click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Place Order' }).click();
  await page.locator("input[data-qa='name-on-card']").fill(orderInfo.cardInfo.NameOnCard);
  await page.locator("input[data-qa='card-number']").fill(orderInfo.cardInfo.CardNumber);
  await page.locator("input[data-qa='cvc']").fill(orderInfo.cardInfo.CVC);
  await page.locator("input[data-qa='expiry-month']").fill(orderInfo.cardInfo.ExpiryMonth);
  await page.locator("input[data-qa='expiry-year']").fill(orderInfo.cardInfo.ExpiryYear);
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
})


customTest.skip('validate Cart Page', async ({ orderInfo, page }) => {

  await page.goto('/products');
  await page.getByRole('link', { name: ' Products' }).click();
  await page.waitForLoadState('networkidle');
  await page.locator('#search_product').fill(orderInfo.ProductName);
  await page.locator('#submit_search').click();
  await page.locator('.product-image-wrapper').first().waitFor();
  await page.evaluate(() => {
    window.scrollTo(0, 1000);
  })
  const product = page.locator(".product-image-wrapper").filter({ hasText: orderInfo.ProductName });
  await product.hover();
  await page.locator(".product-overlay").filter({ hasText: orderInfo.ProductName }).locator('text=Add to cart').click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await expect(page.getByText(orderInfo.ProductName)).toBeVisible();

})

test('validate negative user', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Consent' }).click();
  await page.locator("div.login-form input[type='email']").clear();
  await page.getByPlaceholder('Password').clear();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.pause();
})

