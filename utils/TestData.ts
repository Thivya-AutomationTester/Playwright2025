import { test as base } from '../PageObjects/po-manager'


interface TestDataForOrder {
    ProductName: string;
    cardInfo: {
        NameOnCard: string;
        CardNumber: string;
        CVC: string;
        ExpiryMonth: string;
        ExpiryYear: string;
    };
}

export const test = base.extend<{ orderInfo: TestDataForOrder }>({
    orderInfo: {
        ProductName: 'Pure Cotton V-Neck T-Shirt',
        cardInfo: {
            NameOnCard: 'Thivya',
            CardNumber: '9876 5429 8765 4242',
            CVC: '345',
            ExpiryMonth: '08',
            ExpiryYear: '2030'

        }


    }


})

export const loginInfo = [{
    email: 'thivyanagammaip@gmail.com',
    password: 'Victory',
    user: 'Thivyanagammai'
}, {
    email: 'thivya@gmail.com',
    password: '121345',
}]

export { expect } from '@playwright/test'