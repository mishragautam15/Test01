const PlaywrightHelper =
    require("../helpers/PlaywrightHelper");

class BasePage {

    constructor(page) {

        this.page = page;

        this.helper =
            new PlaywrightHelper(page);
    }

    async navigate(url) {

        await this.page.goto(url);
    }

    async getTitle() {

        return await this.page.title();
    }
}

module.exports = BasePage;