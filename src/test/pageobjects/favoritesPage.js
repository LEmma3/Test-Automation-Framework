class FavoritesPage {
    get favoriteProductName() { return $('[data-test="product-name"]'); }

    async isProductDisplayed(productName) {
        const name = await this.favoriteProductName.getText();
        return name.includes(productName);
    }
}

module.exports = new FavoritesPage();