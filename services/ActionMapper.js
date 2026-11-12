class ActionMapper {

    map(steps) {

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
                    "await loginPage.enterUsername('abcr');"
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

            else if (
                text.includes("forgot password")
            ) {

                actions.push(
                    "// TODO: Forgot Password Flow"
                );
            }

            else if (
                text.includes("forgot username")
            ) {

                actions.push(
                    "// TODO: Forgot Username Flow"
                );
            }

            else if (
                text.includes("login button")
            ) {

                actions.push(
                    "// TODO: Login Button Flow"
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

module.exports = ActionMapper;