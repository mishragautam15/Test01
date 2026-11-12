const fs = require("fs");

class PageLocatorReader {

    getLocators(filePath) {

        if (
            !fs.existsSync(filePath)
        ) {

            return [];
        }

        const content =
            fs.readFileSync(
                filePath,
                "utf8"
            );

        const lines =
            content.split("\n");

        const locators = [];

        for (
            const line of lines
        ) {

            const trimmed =
                line.trim();

            if (
                trimmed.startsWith(
                    "this."
                ) &&
                trimmed.includes("=")
            ) {

                const locator =
                    trimmed
                        .replace(
                            "this.",
                            ""
                        )
                        .split("=")[0]
                        .trim();

                locators.push(
                    locator
                );
            }
        }

        return locators;
    }
}

module.exports =
    PageLocatorReader;