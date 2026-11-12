const fs = require("fs");
const path = require("path");

class PageObjectGenerator {

    generate(locatorMetadata) {

        const locatorDefinitions =
            locatorMetadata.controls
                .map(control => {

                    const propertyName =
                        control.businessName
                            .replace(/\s+/g, "")
                            .replace(
                                /^[A-Z]/,
                                match =>
                                    match.toLowerCase()
                            );

                    return `
        this.${propertyName} =
            ${control.playwrightLocator};`;
                })
                .join("\n");

        const methods =
            locatorMetadata.controls
                .map(control => {

                    const propertyName =
                        control.businessName
                            .replace(/\s+/g, "")
                            .replace(
                                /^[A-Z]/,
                                match =>
                                    match.toLowerCase()
                            );

                    if (
                        control.controlType ===
                        "textbox"
                    ) {

                        return `
    async ${control.suggestedMethod}(value) {

        await this.${propertyName}
            .fill(value);
    }`;
                    }

                    if (
                        control.suggestedMethod
                            .startsWith("verify")
                    ) {

                        return `
    async ${control.suggestedMethod}() {

        await this.${propertyName}
            .waitFor({
                state: 'visible'
            });
    }`;
                    }

                    return `
    async ${control.suggestedMethod}() {

        await this.${propertyName}
            .click();
    }`;
                })
                .join("\n");

        return `
const ConfigService =
    require('../../services/ConfigService');

class LoginPage {

    constructor(page) {

        this.page = page;

        this.configService =
            new ConfigService();
${locatorDefinitions}
    }

    async open() {

        const environment =
            this.configService
                .getEnvironment();

        await this.page.goto(
            environment.baseUrl
        );

        await this.page.waitForLoadState(
            'networkidle'
        );
    }

${methods}
}

module.exports = LoginPage;
`;
    }

    save(content, fileName) {

        const outputPath = path.join(
            process.cwd(),
            "generated",
            "pages",
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
    PageObjectGenerator;