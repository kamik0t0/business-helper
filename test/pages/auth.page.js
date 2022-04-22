const Page = require("./page.js");

class AuthPage extends Page {
    get authInput() {
        return $("#auth-input");
    }

    get passInput() {
        return $("#pass-input");
    }

    get submitBtn() {
        return $('[type="submit"]');
    }

    async auth(login, pass) {
        try {
            await this.authInput.setValue(login);
            await this.passInput.setValue(pass);
            await this.submitBtn.click();
        } catch (error) {
            throw new Error(error.message);
        }
    }
    open() {
        return super.open("/login");
    }
}

module.exports = new AuthPage();
