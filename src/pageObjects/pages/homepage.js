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

        await HomePageComponents.searchInput.setValue(product);

        await this.waitForElement(HomePageComponents.searchButton);

        await this.click(HomePageComponents.searchButton);

        await browser.waitUntil(async () => {
            const titles = await this.getProductTitles();
            return titles.length > 0 &&
                titles.every(title =>
                    title.toLowerCase().includes(product.toLowerCase())
                );
        });
        
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

        const titles = [];

        for(const product of await this.productTitles){
            titles.push(
                await product.getText()
            );
        }

        return titles;
    }*/

    async getProductTitles() {

        const titles = [];

        const products = await HomePageComponents.productTitles;

        for (const product of products) {

            titles.push(await product.getText());

        }

        return titles;

    }

    async setPriceRange() {

        await this.waitForElement(HomePageComponents.priceFilterMin);

        await this.waitForElement(HomePageComponents.priceFilterMax);

        await HomePageComponents.priceFilterMin.dragAndDrop({
            x: 68,
            y: 0
        });

        await HomePageComponents.priceFilterMax.dragAndDrop({
            x: 1,
            y: 0
        });

    }

    async getProductPrices() {

        await browser.waitUntil(async () => {

            const products = await HomePageComponents.productPrices;

            return products.length > 0 &&
            await products[0].isDisplayed();

    }, {
            timeout: 10000,
            timeoutMsg: 'Product prices were not loaded'
        });

        const prices = [];

        const elements = await HomePageComponents.productPrices;

        await this.waitForElements(HomePageComponents.productPrices);

        for (const element of elements) {

            const value = await element.getText();

            prices.push(
                parseFloat(
                    value.replace('$', '')
                )
            );

        }

        console.log(prices);
        return prices;
    
    }

    async getMinimumPriceValue() {

        return await HomePageComponents.priceFilterMin.getAttribute('aria-valuenow');

    }


    async getMaximumPriceValue() {

        return await HomePageComponents.priceFilterMax.getAttribute('aria-valuenow');

    }

    /*async openProductByName(name) {
        const products = await this.productCards;
            for (let product of products) {
                const text = await product.getText();
                if (text.includes(name)) {
                    await product.click();
                    break;
                }
            }
        }*/

    async openProductByName(name) {
        const products = await HomePageComponents.productCards;
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