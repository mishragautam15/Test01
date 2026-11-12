const PageMethodReader =
    require(
        "../../services/pages/PageMethodReader"
    );

const PageMethodComparer =
    require(
        "../../services/pages/PageMethodComparer"
    );

const MCPDiscoveryResultParser =
    require(
        "../../services/mcp/MCPDiscoveryResultParser"
    );

const reader =
    new PageMethodReader();

const comparer =
    new PageMethodComparer();

const parser =
    new MCPDiscoveryResultParser();

const existingMethods =
    reader.getMethods(
        "./pages/LoginPage.js"
    );

const metadata =
    parser.parse(
        "./generated/mcp/TC306399_Locators.json"
    );

const missingMethods =
    comparer.getMissingMethods(
        existingMethods,
        metadata
    );

console.log(
    JSON.stringify(
        missingMethods,
        null,
        2
    )
);