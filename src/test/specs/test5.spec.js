const HammerPage = require('../pageobjects/hammerPage.js');
const CheckoutPage = require('../pageobjects/checkoutPage.js');
const HomePage = require('../pageobjects/homepage.js');

const chai = require('chai');

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();


describe('Add to basket feature', () => {

    let productName;
    let unitPrice;

    before(async () => {

        await HomePage.open();
        await HomePage.searchForProduct('Hammer');
        await HammerPage.openProductByName('Hammer');
        await HammerPage.productName.waitForDisplayed();

        productName = await HammerPage.productName.getText();

        const unitPriceText = await HammerPage.productPrice.getText();
        unitPrice = parseFloat(unitPriceText.replace('$', ''));

        await HammerPage.increaseQuantity.click();
        await HammerPage.addToCartButton.click();

        await HammerPage.cartButton.click();
    });

    it('should contain Hammer in the basket', async () => {
        const pageSource = await browser.getPageSource();
        expect(pageSource).to.contain(productName);
    });

    it('should show quantity 2 for Hammer', async () => {
        const quantity = await CheckoutPage.HammerProductQuantity.getValue();
        assert.equal(quantity, '2', 'Quantity should be 2');
    });

    it('should display the correct total price', async () => {
        const totalPriceText = await CheckoutPage.HammerTotalPrice.getText();
        const totalPrice = parseFloat(totalPriceText.replace('$', ''));

        await browser.pause(2000);

        expect(totalPrice).to.equal(unitPrice * 2);
    });

    it('should show 2 items on the cart indicator', async () => {
        const quantity = await CheckoutPage.cartCount.getText();
        assert.equal(quantity, '2');
    });

});