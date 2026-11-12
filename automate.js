const AutomationEngine =
    require("./services/AutomationEngine");

const ConfigService =
    require("./services/ConfigService");

(async () => {

    console.log(
        "\n===================================="
    );

    console.log(
        "AI-Infused Playwright Automation"
    );

    console.log(
        "====================================\n"
    );

    const configService =
        new ConfigService();

    const environment =
        configService
            .getEnvironment();

    const testCaseId =
        environment.testCaseId;

    const engine =
        new AutomationEngine();

    const result =
        await engine.generate(
            testCaseId
        );

    if (
        result.status ===
        "VALIDATION_FAILED"
    ) {

        console.log(
            `Test Case: ${result.testCaseId}`
        );

        console.log(
            "\nStatus: VALIDATION_FAILED\n"
        );

        result.errors.forEach(
            error =>
                console.log(
                    `- ${error}`
                )
        );

        return;
    }

    if (
        result.status ===
        "WAITING_FOR_MCP"
    ) {

        console.log(
            `Test Case: ${result.testCaseId}`
        );

        console.log(
            `Title: ${result.title}`
        );

        console.log(
            "\nStatus: WAITING_FOR_MCP\n"
        );

        console.log(
            result.message
        );

        console.log(
            `\nPrompt: ${result.promptPath}`
        );

        return;
    }

    console.log(
        `Test Case: ${testCaseId}`
    );

    console.log(
        "\nStatus: READY_TO_EXECUTE\n"
    );

    console.log(
        `Page Object: ${result.pageObjectPath}`
    );

    console.log(
        `Spec: ${result.specPath}`
    );

})();