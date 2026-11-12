const AutomationEngine =
    require("../services/AutomationEngine");

(async () => {

    const testCaseId =
        process.argv[2];

    if (!testCaseId) {

        throw new Error(
            "Please provide a Test Case ID"
        );
    }

    const engine =
        new AutomationEngine();

    const result =
        await engine.generate(
            testCaseId
        );

    console.log(
        "Spec:"
    );

    console.log(
        result.specPath
    );

    console.log(
        "Prompt:"
    );

    console.log(
        result.promptPath
    );

})();