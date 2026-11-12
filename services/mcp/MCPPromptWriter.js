const fs = require("fs");
const path = require("path");

class MCPPromptWriter {

    save(prompt, fileName) {

        const outputPath = path.join(
            process.cwd(),
            "generated",
            "prompts",
            fileName
        );

        fs.writeFileSync(
            outputPath,
            prompt
        );

        return outputPath;
    }
}

module.exports =
    MCPPromptWriter;