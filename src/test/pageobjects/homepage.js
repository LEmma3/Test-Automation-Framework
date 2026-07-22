class HomePage {

    get languageDropdown() { return $('#language');}

    get englishLanguage() { return $('[data-test="lang-en"]');}

    get spanishLanguage() { return $('[data-test="lang-es"]');}

    get homeTextTranslate() { return $('a[data-test="nav-home"]');}

    get searchInput() { return $('input[data-test="search-query"]');}

    get searchButton() { return $('button[data-test="search-submit"]');}

    get productTitles() { return $$('.card-title'); }

    get priceFilterMin() { return $('.ngx-slider-pointer-min'); }

    get priceFilterMax() { return $('.ngx-slider-pointer-max'); }

    get productPrices() { return $$('span[data-test="product-price"]'); }

    get priceValueMin() { return $('.ngx-slider-pointer-min');}

    get priceValueMax() { return $('.ngx-slider-pointer-max');}

    get productCards() { return $$('.card-title'); }

    get favouriteButton() { return $('[data-test="add-to-favorites"]'); }

    get menuButton() { return $('#menu'); }

    get myFavoritesLink() { return $('[data-test="nav-my-favorites"]'); }

    get favoritesProductName() { return $('[data-test="product-name"]'); }

    get homeButton() { return $('[data-test="nav-home"]');}

    get compareButtons() { return $$('[data-test="compare-btn"]');}

    get compareNowLink() { return $('[data-test="compare-link"]'); }

    get sortDropdown() {  return $('[data-test="sort"]'); }


    async open() {
        await browser.url('https://practicesoftwaretesting.com/');
    }

    async getCurrentLanguage() {
    return await this.languageDropdown.getText();
    }

    async searchForProduct(keyword) {
        await this.searchInput.setValue(keyword);
        await browser.pause(2000);
        await this.searchButton.click();
    }

    async getProductTitles() {
    const elements = await this.productTitles;
    const texts = [];

    for (const element of elements) {
        texts.push(await element.getText());
    }

    return texts;
    }

    async setPriceRange() {
        await this.priceFilterMin.waitForDisplayed();
        await this.priceFilterMax.waitForDisplayed();
        await this.priceFilterMin.dragAndDrop({x:68, y: 0});
        await browser.pause(1000);
        await this.priceFilterMax.dragAndDrop({x:1, y:0});
        await browser.pause(1000);
    }

    async getProductPrices() {
        const prices = await this.productPrices;
        const values = [];

        for (let price of prices) {
            const text = await price.getText();
            values.push(parseFloat(text.replace('$', '')));
        }
        return values;
    }

    async openProductByName(name) {
        const products = await this.productCards;
            for (let product of products) {
                const text = await product.getText();
                if (text.includes(name)) {
                    await product.click();
                    break;
                }
            }
        }

    async addProductToCompare(index) {
    const button = await $$('[data-test="compare-btn"]')[index];

    await button.waitForDisplayed({ timeout: 5000 });
    await button.waitForClickable();
    await button.click();
    await browser.pause(2000);
    }

    async goToComparison() {
        await browser.pause(2000);
        await this.compareNowLink.click();
    }

    async sortByPriceLowToHigh() {
        await this.sortDropdown.selectByAttribute('value', 'price,asc');
    }

}

module.exports = new HomePage();