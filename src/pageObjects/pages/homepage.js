const BasePage = require('../components/BasePage');
const HomePageComponents = require('../components/HomePage.components');

class HomePage extends BasePage{

    async open() {
        await super.open(
            'https://practicesoftwaretesting.com/'
        );
    }


    async getCurrentLanguage() {
        return await this.getText(HomePageComponents.languageDropdown);
    }

    /**async searchForProduct(keyword) {
        await this.searchInput.setValue(keyword);
        await browser.pause(2000);
        await this.searchButton.click();
    }*/

    async searchForProduct(product) {

        await this.searchInput.setValue(product);

        await this.waitForElement(this.searchButton);

        await this.click(
            this.searchButton
        );
    }


    async changeLanguageToSpanish() {

        await HomePageComponents.languageDropdown.click();

        await HomePageComponents.spanishLanguage.click();

        await HomePageComponents.homeTextTranslate.waitUntil(
            async function () {
                return (await this.getText()) === 'Inicio';
            },
            {
                timeout: 5000
            }
        );
    }

    /**async getProductTitles() {
    const elements = await this.productTitles;
    const texts = [];

    for (const element of elements) {
        texts.push(await element.getText());
    }

    return texts;
    }*/

    async getProductTitles() {

        const titles = [];

        for(const product of await this.productTitles){
            titles.push(
                await product.getText()
            );
        }

        return titles;
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