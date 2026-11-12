const AdoClient =
    require("../../services/ado/AdoClient");

const AdoStepParser =
    require("../../services/ado/AdoStepParser");

(async () => {

    const ado =
        new AdoClient();

    const parser =
        new AdoStepParser();

    const workItem =
        await ado.getWorkItem(
            309287
        );

    const xmlSteps =
        workItem.fields[
            "Microsoft.VSTS.TCM.Steps"
        ];

    const steps =
        parser.parse(xmlSteps);

    console.log(
        JSON.stringify(
            steps,
            null,
            2
        )
    );

})();