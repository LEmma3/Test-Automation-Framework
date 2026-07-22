class ComparisonPage {
    get table() {
        return $('[data-test="comparison-table"]');
    }

    get productNames() {
        return $$('[data-test="product-name"]');
    }

    get prices() {
        return $$('[data-test="compare-price"]');
    }

    get specRows() {
        return $$('.spec-diff');
    }

    async open() {
        await browser.url('/comparison');
    }

    async isDisplayed() {
        return await this.table.isDisplayed();
    }

    async getProductNamesText() {
        const names = [];
        for (const el of await this.productNames) {
            names.push(await el.getText());
        }
        return names;
    }
}

module.exports = new ComparisonPage();