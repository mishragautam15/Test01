const fs = require("fs");

class PageMethodReader {

    getMethods(filePath) {

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

        const matches =
            content.match(
                /async\s+([a-zA-Z0-9_]+)\s*\(/g
            ) || [];

        return matches.map(
            match =>
                match
                    .replace(
                        "async ",
                        ""
                    )
                    .replace(
                        "(",
                        ""
                    )
                    .trim()
        );
    }
}

module.exports =
    PageMethodReader;