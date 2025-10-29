import { test as base, expect, Locator } from '@playwright/test'
import { LoginPage } from './login-page'

type MyFixtures = {
    loginPage: LoginPage;
    validateError: (inputField: Locator, expectedMessage: string) => Promise<void>;


}
export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToApp('/login');
        await use(loginPage);

    },
    validateError: async ({ }, use) => {

        await use(async (inputField: Locator, expectedMessage: string) => {
            const isInvalid = await inputField.evaluate(input => {
                const el = input as HTMLInputElement;
                return !el.checkValidity();
            });
            expect(isInvalid).toBe(true);

            const validationMessage = await inputField.evaluate(input => {
                const el = input as HTMLInputElement;
                return el.validationMessage;
            });
            expect(validationMessage).toBe(expectedMessage);
        });
    },
});



