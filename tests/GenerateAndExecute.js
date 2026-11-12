const AutomationEngine =
    require("../services/AutomationEngine");

const ConfigService =
    require("../services/ConfigService");

(async () => {

    const configService =
        new ConfigService();

    const environment =
        configService
            .getEnvironment();

    const commandLineTestCaseId =
        process.argv[2];

    const testCaseId =
        commandLineTestCaseId ||
        environment.testCaseId;

    if (!testCaseId) {

        throw new Error(
            "No Test Case ID configured."
        );
    }

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

        console.log("\n");

        console.log(
            "===================================="
        );

        console.log(
            `Test Case: ${result.testCaseId}`
        );

        console.log(
            "Validation Failed"
        );

        result.errors.forEach(
            error =>
                console.log(
                    `- ${error}`
                )
        );

        console.log(
            "===================================="
        );

        return;
    }

    if (
        result.status ===
        "WAITING_FOR_MCP"
    ) {

        console.log("\n");

        console.log(
            "===================================="
        );

        console.log(
            `Test Case: ${result.testCaseId}`
        );

        console.log(
            `Title: ${result.title}`
        );

        console.log(
            result.message
        );

        console.log(
            `Prompt Generated: ${result.promptPath}`
        );

        console.log(
            "===================================="
        );

        process.exit(100);

        return;
    }

    console.log(
        `Test Case ID: ${testCaseId}`
    );

    console.log(
        "\nSpec:"
    );

    console.log(
        result.specPath
    );

    console.log(
        "\nPrompt:"
    );

    console.log(
        result.promptPath
    );

})();