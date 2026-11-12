const { execSync } =
    require("child_process");

console.log(
    "\n===================================="
);

console.log(
    "AI-Infused Playwright Automation"
);

console.log(
    "====================================\n"
);

try {

    console.log(
        "Step 1 : Generate Test Assets\n"
    );

    execSync(
        "node tests/GenerateAndExecute.js",
        {
            stdio: "inherit"
        }
    );
        
    console.log(
        "\n===================================="
    );

    console.log(
        "READY TO EXECUTE"
    );

    console.log(
        "===================================="
    );

} catch (error) {

    if (
        error.status === 100
    ) {

        console.log(
            "\nWorkflow paused waiting for MCP metadata."
        );

        process.exit(0);
    }

    if (
        error.status === 101
    ) {

        console.log(
            "\nWorkflow stopped due to validation errors."
        );

        process.exit(0);
    }

    console.error(
        "\nUnexpected framework error."
    );

    console.error(
        error.message
    );

    process.exit(1);
}