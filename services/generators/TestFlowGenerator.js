class TestFlowGenerator {

    generate(locatorMetadata) {

        const actions = [];

        for (const flow of locatorMetadata.testFlow) {

            if (
                flow.method ===
                "enterUsername"
            ) {

                actions.push(
                    `await loginPage.${flow.method}(
    credentials.candidate.username
);`
                );
            }

            else {

                actions.push(
                    `await loginPage.${flow.method}();`
                );
            }
        }

        return actions;
    }
}

module.exports =
    TestFlowGenerator;