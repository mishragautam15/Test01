class TestFlowGenerator {

    generate(
        testCase,
        locatorMetadata
    ) {

        const actions = [];

        const methods =
            locatorMetadata.controls
                .map(
                    control =>
                        control.suggestedMethod
                );

        for (
            const method of methods
        ) {

            if (
                method ===
                "enterUsername"
            ) {

                actions.push(
`await loginPage.enterUsername(
    credentials.candidate.username
);`
                );

                continue;
            }

            if (
                method ===
                "enterPassword"
            ) {

                actions.push(
`await loginPage.enterPassword(
    credentials.candidate.password
);`
                );

                continue;
            }

            actions.push(
                `await loginPage.${method}();`
            );
        }

        return actions;
    }
}

module.exports =
    TestFlowGenerator;