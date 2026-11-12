class TestFlowGenerator {

    generate(locatorMetadata) {

        const actions = [];

        for (const flow of locatorMetadata.testFlow) {

            if (
                flow.method ===
                "enterUsername"
            ) {

                actions.push(
                    `await loginPage.enterUsername(
    credentials.candidate.username
);`
                );
            }

            else if (
                flow.method ===
                "enterPassword"
            ) {

                actions.push(
                    `await loginPage.enterPassword(
    credentials.candidate.password
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