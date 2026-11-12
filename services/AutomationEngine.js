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

const TestCaseValidator =
    require("./validators/TestCaseValidator");

const PageObjectGenerator =
    require(
        "./generators/PageObjectGenerator"
    );

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

        this.validator =
            new TestCaseValidator();

        this.pageObjectGenerator =
            new PageObjectGenerator();

    }

    async generate(testCaseId) {

        const testCase =
            await this.adoService
                .getTestCase(
                    testCaseId
                );

        const validation =
            this.validator
                .validate(
                    testCase
                );

        if (
            !validation.isValid
        ) {

            return {

                status:
                    "VALIDATION_FAILED",

                testCaseId,

                errors:
                    validation.errors
            };
        }

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

        let locatorMetadata;

        try {

            locatorMetadata =
                this.mcpParser
                    .parse(
                        `./generated/mcp/TC${testCase.id}_Locators.json`
                    );

        } catch (error) {

            return {

                status:
                    "WAITING_FOR_MCP",

                promptPath,

                testCaseId:
                    testCase.id,

                title:
                    testCase.title,

                message:
                    `MCP metadata not found for TC${testCase.id}.
Generate MCP analysis and save the result as:
generated/mcp/TC${testCase.id}_Locators.json`
            };
        }

        const pageObject =
            this.pageObjectGenerator
                .generate(
                    locatorMetadata
                );

        const pageObjectPath =
            this.pageObjectGenerator
                .save(
                    pageObject,
                    "LoginPage.js"
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
            promptPath,
            pageObjectPath
        };
    }
}

module.exports =
    AutomationEngine;