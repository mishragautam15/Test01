const PageLocatorReader =
    require(
        "../../services/pages/PageLocatorReader"
    );

const PageLocatorComparer =
    require(
        "../../services/pages/PageLocatorComparer"
    );

const MCPDiscoveryResultParser =
    require(
        "../../services/mcp/MCPDiscoveryResultParser"
    );

const reader =
    new PageLocatorReader();

const comparer =
    new PageLocatorComparer();

const parser =
    new MCPDiscoveryResultParser();

const existingLocators =
    reader.getLocators(
        "./pages/LoginPage.js"
    );

const metadata =
    parser.parse(
        "./generated/mcp/TC306399_Locators.json"
    );

const missingLocators =
    comparer.getMissingLocators(
        existingLocators,
        metadata
    );

console.log(
    JSON.stringify(
        missingLocators,
        null,
        2
    )
);