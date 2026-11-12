class ActionGenerator {

    generate(steps) {

        const actions = [];

        for (const step of steps) {

            const text =
                step.action.toLowerCase();

            if (
                text.includes("access") &&
                text.includes("log in page")
            ) {

                actions.push(
                    "await loginPage.open();"
                );

                actions.push(
                    "await loginPage.acceptCookies();"
                );
            }

            else if (
                text.includes("user name")
            ) {

                actions.push(
                    "await loginPage.enterUsername(credentials.candidate.username);"
                );
            }

            else if (
                text.includes("cross icon")
            ) {

                actions.push(
                    "await loginPage.clickClearUsername();"
                );

                actions.push(
                    "await loginPage.verifyUsernameCleared();"
                );
            }

            else {

                actions.push(
                    `// TODO: ${step.action}`
                );
            }
        }

        return actions;
    }
}

module.exports =
    ActionGenerator;