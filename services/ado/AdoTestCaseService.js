const TestCase =
    require("../../domain/TestCase");

const AdoClient =
    require("./AdoClient");

const AdoStepParser =
    require("./AdoStepParser");

class AdoTestCaseService {

    constructor() {

        this.adoClient =
            new AdoClient();

        this.stepParser =
            new AdoStepParser();
    }

    async getTestCase(testCaseId) {

        const workItem =
            await this.adoClient
                .getWorkItem(
                    testCaseId
                );

        return new TestCase(

            workItem.id,

            workItem.fields[
            "System.Title"
            ],

            this.stepParser.parse(

                workItem.fields[
                "Microsoft.VSTS.TCM.Steps"
                ]
            )
        );
    }
}

module.exports =
    AdoTestCaseService;