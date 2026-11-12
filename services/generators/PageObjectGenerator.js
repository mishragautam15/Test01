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

                    return `
    async ${control.suggestedMethod}() {

        await this.${propertyName}
            .click();
    }`;
                })
                .join("\n");

        return `
class LoginPage {

    constructor(page) {

        this.page = page;
${locatorDefinitions}
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