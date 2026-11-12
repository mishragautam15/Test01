const AdoTestCaseService =
    require("../../services/ado/AdoTestCaseService");

(async () => {

    const service =
        new AdoTestCaseService();

    const testCase =
        await service.getTestCase(
            309287
        );

    console.log(
        JSON.stringify(
            testCase,
            null,
            2
        )
    );

})();