const MCPDiscoveryResultParser =
    require(
        "../../services/mcp/MCPDiscoveryResultParser"
    );

const TestFlowGenerator =
    require(
        "../../services/generators/TestFlowGenerator"
    );

const parser =
    new MCPDiscoveryResultParser();

const generator =
    new TestFlowGenerator();

const metadata =
    parser.parse(
        "./generated/mcp/TC309287_Locators.json"
    );

const actions =
    generator.generate(
        metadata
    );

console.log(actions);