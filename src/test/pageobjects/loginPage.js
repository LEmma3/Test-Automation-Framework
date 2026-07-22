class LoginPage {

    get emailInput() { 
        return $('#email'); 
    }
    
    get passwordInput() { 
        return $('#password'); 
    }

    get loginButton() { 
        return $('input[data-test="login-submit"]'); 
    }

    get errorMessage() {
        return $('.help-block');
    }

    async open() {
        await browser.url('https://practicesoftwaretesting.com/auth/login');
    }

    async login(email, password) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

module.exports = new LoginPage();