const BasePage = require("./BasePage");

class LoginPage extends BasePage {

    constructor(page) {

        super(page);

        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });

        this.clearUsernameButton = page.getByRole('button', { name: 'Clear username' });

        this.acceptCookiesButton = page.getByRole('button', { name: 'Accept all' });
    }

    async open() {

        await this.page.goto(
            'https://qa.candidate.lhh.com/'
        );

        await this.page.waitForLoadState(
            'networkidle'
        );
    }

    async acceptCookies() {

        try {

            await this.page.waitForLoadState(
                'networkidle'
            );

            const acceptButton =
                this.page.getByRole(
                    'button',
                    { name: 'Accept all' }
                );

            await acceptButton.waitFor({
                state: 'visible',
                timeout: 15000
            });

            await acceptButton.click();

        } catch (error) {

            console.log(
                'Cookie banner not displayed or already accepted.'
            );
        }
    }

    async enterUsername(username) {
        await this.helper.fill(this.usernameTextbox, username);
    }

    async clickClearUsername() {
        await this.helper.click(this.clearUsernameButton);
    }

    async verifyUsernameCleared() {
        await this.usernameTextbox.waitFor();

        const value = await this.usernameTextbox.inputValue();

        if (value !== "") {

            throw new Error(`Username field not cleared. Current value: ${value}`);
        }
    }
}

module.exports = LoginPage;