class ProductPage {

    get favouriteButton() { return $('[data-test="add-to-favorites"]'); }

    get productTitle() { return $('[data-test="product-name"]'); }

    async addToFavourites() {
        await this.favouriteButton.waitForDisplayed({ timeout: 5000 });
        await this.favouriteButton.click();
    }
}

module.exports = new ProductPage();