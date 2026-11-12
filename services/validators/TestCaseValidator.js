class TestCaseValidator {

    validate(testCase) {

        const errors = [];

        if (!testCase) {

            errors.push(
                "Test case not found."
            );
        }

        if (
            !testCase.steps ||
            testCase.steps.length === 0
        ) {

            errors.push(
                "No test steps found."
            );
        }

        const hasActionableStep =
            testCase.steps &&
            testCase.steps.some(
                step =>
                    step.action &&
                    step.action.trim().length > 0
            );

        if (!hasActionableStep) {

            errors.push(
                "No actionable steps found."
            );
        }

        return {

            isValid:
                errors.length === 0,

            errors
        };
    }
}

module.exports =
    TestCaseValidator;