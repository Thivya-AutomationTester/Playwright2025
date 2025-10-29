import { test, expect, loginInfo } from '../utils/TestData';
import { CardInfo } from '../PageObjects/products-page';

const project = process.env.PW_PROJECT;
test.describe('Authenticated Tests', async () => {
  test.skip(project !== 'authenticated-chromium', 'Skipping for unauthenticated project');
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
  test.skip(project !== 'unauthenticated-chromium', 'Skipping for authenticated project');
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


