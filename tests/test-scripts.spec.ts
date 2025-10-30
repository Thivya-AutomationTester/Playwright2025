import { test, expect, loginInfo } from '../utils/TestData';
import { CardInfo } from '../PageObjects/products-page';

const project = process.env.PW_PROJECT;

test.beforeEach(async ({ page }) => {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (
      url.includes('googlesyndication') ||
      url.includes('doubleclick') ||
      url.includes('ads.') ||
      url.includes('analytics')
    ) {
      route.abort();
    } else {
      route.continue();
    }
  });
});



test.describe('Authenticated Tests', async () => {
  test.skip(project !== 'authenticated', 'Skipping for unauthenticated project');
  test('visual Testing', async ({ orderInfo, productsPage }) => {
    await productsPage.searchProduct(orderInfo.ProductName);
    await productsPage.addToCart(orderInfo.ProductName);
    await productsPage.openCart();
    await productsPage.checkout.click();

    expect(await productsPage.billingInfo.screenshot()).toMatchSnapshot('Address.png');

  })
  test('Place Order', async ({ orderInfo, productsPage }) => {

    await productsPage.searchProduct(orderInfo.ProductName);
    await productsPage.addToCart(orderInfo.ProductName);
    await productsPage.openCart();
    await expect(productsPage.getProductLocator(orderInfo.ProductName)).toBeVisible();

    const myCard: CardInfo = {
      name: orderInfo.cardInfo.NameOnCard,
      cardNum: orderInfo.cardInfo.CardNumber,
      cvc: orderInfo.cardInfo.CVC,
      expiryMonth: orderInfo.cardInfo.ExpiryMonth,
      expiryYear: orderInfo.cardInfo.ExpiryYear
    };

    await productsPage.placeOrder(myCard);
    await expect(productsPage.successMessage).toBeVisible();
  })

});

test.describe('Unauthenticated Tests', async () => {
  test.skip(project !== 'unauthenticated', 'Skipping for authenticated project');
  test('validate with blank email and password', async ({ loginPage, validateError }) => {
    await loginPage.loginUser('', '');
    await validateError(loginPage.userEmail, 'Please fill')
  })
  test('validate with blank email', async ({ loginPage, validateError }) => {
    await loginPage.loginUser('', loginInfo[0].password);
    await validateError(loginPage.userEmail, 'Please fill')
  })
  test('validate with blank password', async ({ loginPage, validateError }) => {
    await loginPage.loginUser(loginInfo[0].email, '');
    await validateError(loginPage.userPassword, 'Please fill')
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


