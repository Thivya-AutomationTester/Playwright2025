import { Locator, Page } from '@playwright/test';

export interface CardInfo {
    name: string;
    cardNum: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
}

export class ProductsPage {

    searchItem: Locator;
    searchIcon: Locator;
    product: Locator;
    productOverlay: Locator;
    viewCart: Locator;
    checkout: Locator;
    placeOrderBtn: Locator;
    nameOnCard: Locator;
    cardNumber: Locator;
    cvc: Locator;
    expirymonth: Locator;
    expiryYear: Locator;
    confirmOrder: Locator;
    successMessage: Locator;
    page: Page;


    constructor(page: Page) {
        this.page = page;
        this.searchItem = page.locator('#search_product');
        this.searchIcon = page.locator('#submit_search');
        this.product = page.locator(".product-image-wrapper");
        this.productOverlay = page.locator(".product-overlay")
        this.viewCart = page.getByRole('link', { name: 'View Cart' });
        this.checkout = page.getByText('Proceed To Checkout');
        this.placeOrderBtn = page.getByRole('link', { name: 'Place Order' });
        this.nameOnCard = page.locator("input[data-qa='name-on-card']");
        this.cardNumber = page.locator("input[data-qa='card-number']");
        this.cvc = page.locator("input[data-qa='cvc']");
        this.expirymonth = page.locator("input[data-qa='expiry-month']");
        this.expiryYear = page.locator("input[data-qa='expiry-year']");
        this.confirmOrder = page.getByRole('button', { name: 'Pay and Confirm Order' });
        this.successMessage = page.getByText('Congratulations! Your order has been confirmed!');

    }

    async navigateToPage(url: string) {
        await this.page.goto(url);
    }

    async searchProduct(productName: string) {
        await this.searchItem.fill(productName);
        await this.searchIcon.click();
        await this.product.waitFor();
    }

    async addToCart(productName: string) {
        await this.product.filter({ hasText: productName }).hover();
        await this.productOverlay.filter({ hasText: productName }).locator('text=Add to cart').click();
    }
    async openCart() {
        await this.viewCart.click();
        await this.page.waitForURL('**/view_cart');
    }
    getProductLocator(productName: string) {
        return this.page.getByText(productName);
    }

    async placeOrder(cardInfo: CardInfo) {
        await this.checkout.click();
        await this.placeOrderBtn.click();
        await this.nameOnCard.fill(cardInfo.name);
        await this.cardNumber.fill(cardInfo.cardNum);
        await this.cvc.fill(cardInfo.cvc);
        await this.expirymonth.fill(cardInfo.expiryMonth);
        await this.expiryYear.fill(cardInfo.expiryYear);
        await this.confirmOrder.click();
    }

}