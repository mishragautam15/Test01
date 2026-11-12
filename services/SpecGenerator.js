const fs = require("fs");
const path = require("path");

class SpecGenerator {

    generate(title, actions) {

        return `
const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ConfigService = require('../services/ConfigService');

const config =
    new ConfigService();

const credentials =
    config.getCredentials();

test('${title}', async ({ page }) => {

    const loginPage =
        new LoginPage(page);

${actions.join('\n')}
});
`;
    }

    save(content, fileName) {

        const outputPath = path.join(
            process.cwd(),
            "generated",
            "tests",
            fileName
        );

        fs.writeFileSync(
            outputPath,
            content
        );

        return outputPath;
    }
}

module.exports =
    SpecGenerator;