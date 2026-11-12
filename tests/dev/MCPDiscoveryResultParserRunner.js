const MCPDiscoveryResultParser =
    require(
        "../../services/mcp/MCPDiscoveryResultParser"
    );

const parser =
    new MCPDiscoveryResultParser();

const result =
    parser.parse(
        "./generated/mcp/TC309287_Locators.json"
    );

console.log(
    JSON.stringify(
        result,
        null,
        2
    )
);
