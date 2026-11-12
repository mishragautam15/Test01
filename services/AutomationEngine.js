const AdoTestCaseService =
    require("./ado/AdoTestCaseService");

const SpecGenerator =
    require("./SpecGenerator");

const MCPPromptBuilder =
    require("./mcp/MCPPromptBuilder");

const MCPPromptWriter =
    require("./mcp/MCPPromptWriter");

const MCPDiscoveryResultParser =
    require("./mcp/MCPDiscoveryResultParser");

const TestFlowGenerator =
    require("./generators/TestFlowGenerator");

class AutomationEngine {

    constructor() {

        this.adoService =
            new AdoTestCaseService();

        this.specGenerator =
            new SpecGenerator();

        this.mcpPromptBuilder =
            new MCPPromptBuilder();

        this.mcpPromptWriter =
            new MCPPromptWriter();

        this.mcpParser =
            new MCPDiscoveryResultParser();

        this.testFlowGenerator =
            new TestFlowGenerator();
    }

    async generate(testCaseId) {

        const testCase =
            await this.adoService
                .getTestCase(
                    testCaseId
                );

        const mcpPrompt =
            this.mcpPromptBuilder
                .build(
                    testCase
                );

        const promptPath =
            this.mcpPromptWriter
                .save(

                    mcpPrompt,

                    `TC${testCase.id}_MCPPrompt.txt`
                );

        const locatorMetadata =
            this.mcpParser
                .parse(

                    `./generated/mcp/TC${testCase.id}_Locators.json`
                );

        const actions =
            this.testFlowGenerator
                .generate(
                    locatorMetadata
                );

        const spec =
            this.specGenerator
                .generate(
                    testCase.title,
                    actions
                );

        const titleSlug =
            testCase.title
                .replace(
                    /[^a-zA-Z0-9 ]/g,
                    ""
                )
                .replace(
                    /\s+/g,
                    "_"
                );

        const specPath =
            this.specGenerator
                .save(

                    spec,

                    `TC${testCase.id}_${titleSlug}.spec.js`
                );

        return {
            specPath,
            promptPath
        };
    }
}

module.exports =
    AutomationEngine;