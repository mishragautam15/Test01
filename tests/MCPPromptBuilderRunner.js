const AdoTestCaseService =
    require("../services/ado/AdoTestCaseService");

const MCPPromptBuilder =
    require("../services/mcp/MCPPromptBuilder");

(async () => {

    const service =
        new AdoTestCaseService();

    const builder =
        new MCPPromptBuilder();

    const testCase =
        await service.getTestCase(
            309287
        );

    const prompt =
        builder.build(
            testCase
        );

    console.log(prompt);

})();