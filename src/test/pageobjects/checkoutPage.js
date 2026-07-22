class CheckoutPage {

    get HammerProductQuantity() {
        return $('[data-test="product-quantity"]');
    }

    get HammerTotalPrice() {
        return $('[data-test="line-price"]');
    }

    get cartCount() {
        return $('#lblCartCount');
    }

    async open() {
        await browser.url('https://practicesoftwaretesting.com/checkout');  
    }

}

module.exports = new CheckoutPage();