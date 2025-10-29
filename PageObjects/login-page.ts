import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {

    consentButton: Locator;
    userEmail: Locator;
    userPassword: Locator;
    loginButton: Locator;
    errorMessage: Locator;
    page: Page;


    constructor(page: Page) {
        this.page = page;
        this.consentButton = page.getByRole('button', { name: 'Consent' });
        this.userEmail = page.locator("div.login-form input[type='email']");
        this.userPassword = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByText('Your email or password is incorrect!');

    }

    async navigateToApp(url: string) {
        await this.page.goto(url);
        await this.consentButton.click();
    }
    async loginUser(email: string, password: string) {

        await this.userEmail.fill(email);
        await this.userPassword.fill(password);
        await this.loginButton.click();
    }
    async validateEmptyFieldError(inputField: Locator, expectedMessage: string) {

        const isInvalid = await inputField.evaluate(input => {
            const el = input as HTMLInputElement;
            return !el.checkValidity();
        }); expect(isInvalid).toBe(true);


        const validationMessage = await inputField.evaluate(input => {
            const el = input as HTMLInputElement;
            return el.validationMessage;
        });

        expect(validationMessage).toBe(expectedMessage);
    }


}

