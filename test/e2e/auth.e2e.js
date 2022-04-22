const AuthPage = require("../pages/auth.page.js");
const SecurePage = require("../pages/secure.page.js");

describe("My Login application", () => {
    it("should login with valid credentials", async () => {
        await AuthPage.open();

        await AuthPage.auth("Cap_NEMOx86@inbox.ru", "kdkfjdilkmf2312387");
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            `Приветствую всех на моем "PET"-проекте - Web-приложение "Бизнес-ассистент"!`
        );
    });
    it("should NOT login with valid credentials", async () => {
        await AuthPage.open();

        await AuthPage.auth("Cap_NEMx86@inbox.ru", "kdkfjdilkmf2312387");
        await expect(SecurePage.wrongPass).toHaveTextContaining(
            `Неправильный пароль или email.`
        );
    });
});
