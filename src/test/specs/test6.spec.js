const LoginPage = require('../pageobjects/loginPage');
const HomePage = require('../pageobjects/homepage');
const FavoritesPage = require('../pageobjects/favoritesPage');
const ProductPage = require('../pageobjects/productPage');

const chai = require('chai');

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

describe('Add to favourites feature', () => {

    it('should login with valid credentials', async () => {
        await browser.url('https://practicesoftwaretesting.com/auth/login');

        await LoginPage.login('email@email.com', '12345678Password@');

        await browser.pause(2000);

    });

    it('should find Thor Hammer and open product', async () => {
        await HomePage.homeButton.click();

        await browser.pause(1000);

        await HomePage.searchForProduct('Thor Hammer');
        await browser.pause(1000);

        await HomePage.openProductByName('Thor Hammer');

        await browser.pause(2000);

        const title = await $('[data-test="product-name"]').getText();

        assert.equal(title, 'Thor Hammer');

        await browser.pause(2000);
    });

    it('should add product to favourites', async () => {
        await ProductPage.addToFavourites();

        await browser.pause(2000);
    });

    it('should open favourites page from menu', async () => {
        await HomePage.menuButton.click();
        await browser.pause(1000);
        await HomePage.myFavoritesLink.click();
        await browser.pause(1000);

        const url = await browser.getUrl();
        expect(url).to.include('favorites');
    });

    it('should verify Thor Hammer is in favourites list', async () => {
        const isPresent = await FavoritesPage.isProductDisplayed('Thor Hammer');

        expect(isPresent).to.be.true;
    });

});