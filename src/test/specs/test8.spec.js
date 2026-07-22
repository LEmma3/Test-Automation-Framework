const HomePage = require('../pageobjects/homepage');

const chai = require('chai');

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();


describe('Sorting Products - Price Low to High', () => {

    it('should open homepage and display products', async () => {
        await HomePage.open();

        await browser.pause(2000);

        const prices = await HomePage.getProductPrices();

        expect(prices.length).to.be.greaterThan(0);
    });

    it('should select sorting by price ascending', async () => {
        await HomePage.sortByPriceLowToHigh();

        await browser.pause(1000);

        const value = await HomePage.sortDropdown.getValue();

        assert.equal(value, 'price,asc');
    });

    it('should extract product prices correctly', async () => {
        const prices = await HomePage.getProductPrices();

        prices.should.be.an('array');
        prices.should.not.be.empty;
    });

    it('should verify products are sorted by price ascending', async () => {
        const prices = await HomePage.getProductPrices();

        const sorted = [...prices].sort((a, b) => a - b);

        expect(prices).to.deep.equal(sorted);
    });

    it('should ensure cheapest product is first', async () => {
        const prices = await HomePage.getProductPrices();

        assert.equal(prices[0], Math.min(...prices));
    });

});