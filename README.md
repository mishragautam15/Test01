# AI-Infused Playwright Framework

## Overview

AI-Infused Playwright Framework is an automation solution that integrates Azure DevOps (ADO), Playwright, and MCP-driven UI analysis to accelerate test automation creation.

The framework automatically:

- Retrieves test cases from Azure DevOps
- Generates MCP prompts
- Consumes MCP locator metadata
- Generates Playwright tests
- Reuses existing business functions
- Generates only missing business functions
- Executes automation with minimal manual effort

---

# Framework Vision

The framework follows the principle:

```text
Business Functions → Pages
Business Scenarios → Tests
Generated Assets → MCP & Prompts
```

Instead of generating automation from scratch every time, the framework:

1. Reuses existing business methods.
2. Generates only missing business methods.
3. Creates clean and maintainable test cases.

---

# Architecture

```text
Azure DevOps Test Case
            │
            ▼
     AutomationEngine
            │
            ▼
   Test Case Validation
            │
            ▼
   MCP Prompt Generation
            │
            ▼
       MCP Analysis
            │
            ▼
      Locator Metadata
            │
            ▼
 Existing Method Discovery
            │
            ▼
 Missing Method Detection
            │
            ▼
 Generate Missing Methods
            │
            ▼
      Test Generation
            │
            ▼
        Execution
```

---

# Project Structure

```text
Playwright-MCP-POC
│
├── automate.js
│
├── config
│   ├── credentials.json
│   └── environment.json
│
├── domain
│   ├── LocatorMetadata.js
│   └── TestCase.js
│
├── pages
│   ├── BasePage.js
│   ├── LoginPage.js
│   └── Future Page Objects
│
├── services
│   ├── AutomationEngine.js
│   ├── ConfigService.js
│   ├── SpecGenerator.js
│   │
│   ├── ado
│   │   ├── AdoClient.js
│   │   ├── AdoStepParser.js
│   │   └── AdoTestCaseService.js
│   │
│   ├── generators
│   │   ├── PageObjectGenerator.js
│   │   └── TestFlowGenerator.js
│   │
│   ├── mcp
│   │   ├── MCPPromptBuilder.js
│   │   ├── MCPPromptWriter.js
│   │   └── MCPDiscoveryResultParser.js
│   │
│   ├── pages
│   │   ├── PageMethodReader.js
│   │   ├── PageMethodComparer.js
│   │   ├── PageMethodGenerator.js
│   │   ├── PageUpdater.js
│   │   ├── PageLocatorReader.js
│   │   └── PageLocatorComparer.js
│   │
│   └── validators
│       └── TestCaseValidator.js
│
├── tests
│
├── generated
│   ├── prompts
│   └── mcp
│
└── tests/dev
    └── Development Utilities
```

---

# Configuration

## environment.json

```json
{
  "baseUrl": "https://qa.candidate.lhh.com/",
  "environment": "QA",
  "testCaseId": 306398
}
```

### Properties

| Property | Description |
|-----------|-------------|
| baseUrl | Application URL |
| environment | Execution environment |
| testCaseId | Azure DevOps Test Case ID |

---

## credentials.json

```json
{
  "candidate": {
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD"
  }
}
```

---

# Framework Execution

## Execute Framework

```powershell
node automate.js
```

---

# Execution States

## WAITING_FOR_MCP

Framework successfully:

- Retrieves ADO test case
- Validates test case
- Generates MCP prompt

Output:

```text
Status: WAITING_FOR_MCP
```

Example:

```text
====================================

Test Case: 306398

Title: Verify the translation of the page

Status: WAITING_FOR_MCP

Prompt:
generated/prompts/TC306398_MCPPrompt.txt

====================================
```

---

## READY_TO_EXECUTE

Framework successfully:

- Reads MCP metadata
- Generates required assets
- Creates Playwright test

Output:

```text
Status: READY_TO_EXECUTE
```

---

## VALIDATION_FAILED

Framework validation failed.

Example:

```text
No actionable test steps found.
```

---

# MCP Workflow

## Step 1

Run:

```powershell
node automate.js
```

Framework generates:

```text
generated/prompts/TCxxxxx_MCPPrompt.txt
```

---

## Step 2

Execute MCP analysis using the generated prompt.

---

## Step 3

Save MCP response:

```text
generated/mcp/TCxxxxx_Locators.json
```

Example:

```text
generated/mcp/TC306399_Locators.json
```

---

## Step 4

Run framework again:

```powershell
node automate.js
```

Framework proceeds with automation generation.

---

# Business Function Reuse Strategy

The framework follows:

```text
Read Existing Page
          │
          ▼
 Read Existing Methods
          │
          ▼
 Compare Against MCP
          │
          ▼
 Identify Missing Methods
          │
          ▼
 Generate Missing Methods
          │
          ▼
 Update Existing Page
```

This prevents duplication and promotes reuse.

---

# Page Method Discovery

## PageMethodReader

Reads existing methods from a page object.

Example:

```javascript
[
  "open",
  "acceptCookies",
  "enterUsername",
  "clickClearUsername"
]
```

---

## PageMethodComparer

Compares existing methods with MCP metadata.

Identifies only missing methods.

Example:

```javascript
[
  "enterPassword",
  "clickLogin",
  "verifyHomePageLoaded"
]
```

---

## PageMethodGenerator

Generates business methods dynamically.

Example:

```javascript
async enterPassword(value) {

    await this.password.fill(value);
}
```

---

## PageUpdater

Updates page objects by appending newly generated methods.

---

# Pages

The `pages` folder is the source of truth for business functions.

Example:

```javascript
class LoginPage {

    async open() {}

    async acceptCookies() {}

    async enterUsername() {}

    async enterPassword() {}

    async clickLogin() {}

    async verifyHomePageLoaded() {}
}
```

---

# Tests

The `tests` folder contains business scenarios.

Example:

```javascript
test(
    'Verify Home Page',
    async ({ page }) => {

        const loginPage =
            new LoginPage(page);

        await loginPage.open();

        await loginPage.enterUsername();

        await loginPage.enterPassword();

        await loginPage.clickLogin();

        await loginPage.verifyHomePageLoaded();
    }
);
```

---

# Guiding Principles

## Reuse Existing Business Functions

Do not regenerate existing methods.

Example:

```javascript
enterUsername()
```

If already present:

```text
Reuse
```

---

## Generate Missing Functions Only

Example:

```javascript
enterPassword()
```

If missing:

```text
Generate
```

---

## Keep Tests Clean

Tests should contain business actions only.

Example:

```javascript
await loginPage.login();

await homePage.verifyHomePageLoaded();
```

---

# Proven Test Case

Successfully automated and executed:

```text
TC306399

Test to verify if Page load is intact and complete
```

Result:

```text
PASS
```

---

# Future Roadmap

## Method Reuse Enhancement

Automatically update page objects with missing business functions.

---

## Multi-Page Support

Support generation of:

```text
LoginPage
HomePage
TranslationPage
ProfilePage
SettingsPage
```

---

## Locator Validation

Validate MCP locators before automation execution.

---

## Fully Automated Generation

Future target:

```text
ADO
 ↓
MCP
 ↓
Business Function Discovery
 ↓
Generate Missing Functions
 ↓
Generate Test
 ↓
Execute
```

with minimal manual intervention.

---

# Key Design Principle

```text
Pages = Business Functions

Tests = Business Scenarios

Generated Content = Support Artifacts
```

The framework should always prefer reusing existing business functions and generate only what is missing.