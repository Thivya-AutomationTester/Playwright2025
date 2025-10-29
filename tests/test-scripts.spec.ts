import { test, expect, loginInfo } from '../utils/TestData';
import { LoginPage } from '../PageObjects/login-page';

test.skip('Place Order', async ({ page, orderInfo }) => {

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


test.skip('validate Cart Page', async ({ orderInfo, page }) => {

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

test.describe('validate negative login', async () => {

  test('validate with blank email and password', async ({ loginPage, validateError }) => {
    await loginPage.loginUser('', '');
    await validateError(loginPage.userEmail, 'Please fill in this field.')
  })
  test('validate with blank email', async ({ loginPage, validateError }) => {
    await loginPage.loginUser('', loginInfo[0].password);
    await validateError(loginPage.userEmail, 'Please fill in this field.')
  })
  test('validate with blank password', async ({ loginPage, validateError }) => {
    await loginPage.loginUser(loginInfo[0].email, '');
    await validateError(loginPage.userPassword, 'Please fill in this field.')
  })
  test('validate with incorrect email and  password', async ({ loginPage }) => {
    await loginPage.loginUser(loginInfo[1].email, loginInfo[1].password);
    await expect(loginPage.errorMessage).toBeVisible();

  })
  test('validate with incorrect email', async ({ loginPage }) => {
    await loginPage.loginUser(loginInfo[1].email, loginInfo[0].password);
    await expect(loginPage.errorMessage).toBeVisible();

  })
  test('validate with incorrect password', async ({ loginPage }) => {
    await loginPage.loginUser(loginInfo[0].email, loginInfo[1].password);
    await expect(loginPage.errorMessage).toBeVisible();

  })

})


