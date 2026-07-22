const HomePage = require('../pageobjects/homepage.js');

const chai = require('chai');

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

describe('Product search feature', () => {

    it('should load the Toolshop home page', async () => {
        await HomePage.open();
    });

    it('should search for a product by keyword (hammer)', async () => {
        await HomePage.searchForProduct('hammer');

        await browser.pause(3000);
    });

    it('should display search results', async () => {
        const results = await HomePage.getProductTitles();
        expect(results.length).to.be.greaterThan(0);
        assert.isAbove(results.length, 0, 'Results should not be empty');
    });

    it('should show relevant results matching the searched keyword', async () => {
        const results = await HomePage.getProductTitles();

        results.forEach(title => {
            title.toLowerCase().should.include('hammer');
        });
    });

});