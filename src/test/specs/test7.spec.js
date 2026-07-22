const HomePage = require('../pageobjects/homepage');
const ComparisonPage = require('../pageobjects/comparisonPage');

const chai = require('chai');

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

describe('Product comparison feature', () => {

    it('should open homepage', async () => {
        await HomePage.open();
        assert.isTrue((await browser.getUrl()).includes('practicesoftwaretesting'));
    });

    it('should add first product to comparison', async () => {
        await HomePage.addProductToCompare(0);
    });

    it('should add second product to comparison', async () => {
        await HomePage.addProductToCompare(1);
    });

    it('should navigate to comparison page', async () => {
        await HomePage.goToComparison();
        await browser.pause(2000);
        expect(await browser.getUrl()).to.include('/comparison');
    });

    it('should display comparison table', async () => {
        const displayed = await ComparisonPage.isDisplayed();
        assert.equal(displayed, true);
    });

    it('should show both products side-by-side', async () => {
        const names = await ComparisonPage.getProductNamesText();

        names.should.be.an('array').that.has.lengthOf(2);
        names[0].should.not.equal(names[1]);
    });

    it('should display price comparison correctly', async () => {
        const prices = await ComparisonPage.prices;

        const price1 = parseFloat((await prices[0].getText()).replace('$', ''));
        const price2 = parseFloat((await prices[1].getText()).replace('$', ''));

        expect(price1).to.be.a('number');
        expect(price2).to.be.a('number');
        assert.notEqual(price1, price2);
    });

    it('should show specification differences', async () => {
        const specs = await ComparisonPage.specRows;

        expect(specs.length).to.be.greaterThan(0);

        const firstSpec = await specs[0].getText();
        should.exist(firstSpec);
    });

});