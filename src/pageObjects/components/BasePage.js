class BasePage {

    async open(url) {
        await browser.url(url);
    }


    async waitForElement(element) {
        await element.waitForDisplayed({
            timeout: 5000
        });
    }


    async getText(element) {
        await this.waitForElement(element);
        return await element.getText();
    }


    async click(element) {
        await this.waitForElement(element);
        await element.click();
    }

}

module.exports = BasePage;