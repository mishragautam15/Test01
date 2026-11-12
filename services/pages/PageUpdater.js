const fs = require("fs");

class PageUpdater {

    appendMethods(
        filePath,
        methods
    ) {

        let content =
            fs.readFileSync(
                filePath,
                "utf8"
            );

        const lastBrace =
            content.lastIndexOf(
                "}"
            );

        const methodsBlock =
            methods.join("\n");

        content =
            content.slice(
                0,
                lastBrace
            ) +
            methodsBlock +
            "\n}" +
            "\n\nmodule.exports = LoginPage;";

        fs.writeFileSync(
            filePath,
            content
        );
    }
}

module.exports =
    PageUpdater;