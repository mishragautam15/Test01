const ConfigService =
    require("../ConfigService");

class MCPPromptBuilder {

    constructor() {

        this.configService =
            new ConfigService();
    }

    build(testCase) {

        const environment =
            this.configService
                .getEnvironment();

        return `
Use Playwright MCP.

Application URL:
${environment.baseUrl}

Analyze the application and identify all controls required to automate the following Azure DevOps test case.

Test Case ID:
${testCase.id}

Title:
${testCase.title}

Steps:
${testCase.steps
    .map(
        (step, index) =>
            `${index + 1}. ${step.action}`
    )
    .join("\n")}

Expected Results:
${testCase.steps
    .map(
        (step, index) =>
            `${index + 1}. ${step.expected}`
    )
    .join("\n")}

Return JSON only in the following format:

{
  "pageName": "",
  "controls": [
    {
      "businessName": "",
      "controlType": "",
      "playwrightLocator": "",
      "suggestedMethod": "",
      "reason": ""
    }
  ]
}

Rules:

1. Use Playwright recommended locators.
2. Prefer getByRole().
3. Prefer getByLabel().
4. Avoid XPath.
5. Return only controls required by the test case.
6. Return valid JSON only.
7. For each control provide a suggested POM method name.

Examples:

Username textbox
→ enterUsername

Password textbox
→ enterPassword

Login button
→ clickLogin

Forgot Password link
→ clickForgotPassword

Forgot Username link
→ clickForgotUsername

Clear Username button
→ clickClearUsername
`;
    }
}

module.exports =
    MCPPromptBuilder;