const PageMethodReader =
    require(
        "../../services/pages/PageMethodReader"
    );

const PageMethodComparer =
    require(
        "../../services/pages/PageMethodComparer"
    );

const PageMethodGenerator =
    require(
        "../../services/pages/PageMethodGenerator"
    );

const PageUpdater =
    require(
        "../../services/pages/PageUpdater"
    );

const MCPDiscoveryResultParser =
    require(
        "../../services/mcp/MCPDiscoveryResultParser"
    );

const reader =
    new PageMethodReader();

const comparer =
    new PageMethodComparer();

const generator =
    new PageMethodGenerator();

const updater =
    new PageUpdater();

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

const missingControls =
    comparer.getMissingMethods(
        existingMethods,
        metadata
    );

const methods =
    missingControls.map(
        control =>
            generator.generate(
                control
            )
    );

updater.appendMethods(
    "./pages/LoginPage.js",
    methods
);

console.log(
    "Methods appended successfully."
);