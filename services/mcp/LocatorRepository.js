class LocatorRepository {

    constructor() {

        this.locators = {
            usernameTextbox:
                "page.getByRole('textbox', { name: 'Username' })",

            clearUsernameButton:
                "page.getByRole('button', { name: 'Clear username' })",

            acceptCookiesButton:
                "page.getByRole('button', { name: 'Accept all' })"
        };
    }

    get(name) {

        return this.locators[name];
    }

    getAll() {

        return this.locators;
    }
}

module.exports =
    LocatorRepository;