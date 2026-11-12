class PageMethodGenerator {

    generate(control) {

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
    }
`;
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
    }
`;
        }

        return `
    async ${control.suggestedMethod}() {

        await this.${propertyName}
            .click();
    }
`;
    }
}

module.exports =
    PageMethodGenerator;