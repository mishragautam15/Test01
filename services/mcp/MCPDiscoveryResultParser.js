const fs = require("fs");

const LocatorMetadata =
    require("../../domain/LocatorMetadata");

class MCPDiscoveryResultParser {

    parse(filePath) {

        if (!fs.existsSync(filePath)) {

            throw new Error(
                `MCP result file not found: ${filePath}`
            );
        }

        const content =
            fs.readFileSync(
                filePath,
                "utf8"
            );

        const result =
            JSON.parse(content);

        return new LocatorMetadata(

            result.pageName,

            result.controls,

            result.testFlow
        );
    }
}

module.exports =
    MCPDiscoveryResultParser;