class HammerPage {

    get productName() {
        return $('[data-test="product-name"]');
    }

    get productPrice() {
        return $('[data-test="unit-price"]');
    }

    get increaseQuantity() {
        return $('[data-test="increase-quantity"]');
    }

    get addToCartButton() {
        return $('[data-test="add-to-cart"]');
    }

    get cartButton() {
        return $('[data-test="nav-cart"]');
    }

    async open() {
        await browser.url('https://practicesoftwaretesting.com/');
    }

    async openProductByName(productName) {
    const product = await $(`//h5[normalize-space()="${productName}"]`);
    await product.waitForDisplayed();
    await product.click();
}

}

module.exports = new HammerPage();