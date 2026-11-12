const MCPDiscoveryResultParser =
    require(
        "../services/mcp/MCPDiscoveryResultParser"
    );

const PageObjectGenerator =
    require(
        "../services/generators/PageObjectGenerator"
    );

const parser =
    new MCPDiscoveryResultParser();

const generator =
    new PageObjectGenerator();

const locatorMetadata =
    parser.parse(
        "./generated/mcp/TC309287_Locators.json"
    );

const pageObject =
    generator.generate(
        locatorMetadata
    );

const filePath =
    generator.save(
        pageObject,
        "LoginPage.js"
    );

console.log(
    filePath
);