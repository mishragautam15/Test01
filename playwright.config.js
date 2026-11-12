const { defineConfig } =
    require('@playwright/test');

module.exports = defineConfig({

    testDir: '.',

    timeout: 60000,

    use: {

        headless: false,

        screenshot:
            'only-on-failure',

        trace:
            'on-first-retry',

        video:
            'retain-on-failure'
    }
});