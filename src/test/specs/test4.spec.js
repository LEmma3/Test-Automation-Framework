const { expect } = require('chai');
const HomePage = require('../pageobjects/homepage.js');

const chai = require('chai');
const assert = chai.assert;
const should = chai.should();


describe('Price filter feature', () => {

    it('should open the Toolshop home page', async () => {
        await HomePage.open();
        expect(await browser.getUrl()).to.include('practicesoftwaretesting.com');
    });

    it('should set price filter between 50 and 100', async () => {
        await HomePage.setPriceRange();
        expect(await HomePage.priceValueMin.getAttribute('aria-valuenow')).to.equal('50');
        expect(await HomePage.priceValueMax.getAttribute('aria-valuenow')).to.equal('100');
    });

    it('should display only products within selected price range', async () => {
        const prices = await HomePage.getProductPrices();

        prices.forEach(price => {
            expect(price).to.be.at.least(50);
            expect(price).to.be.at.most(100);
        });
    });

    it('should not display products outside range', async () => {
        const prices = await HomePage.getProductPrices();

        for (let price of prices) {
            assert.isAtLeast(price, 50, 'Price is below minimum range');
            assert.isAtMost(price, 100, 'Price is above maximum range');
        }
    });
});