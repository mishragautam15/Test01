const AdoClient =
    require("../services/ado/AdoClient");

const AdoStepParser =
    require("../services/ado/AdoStepParser");

const ActionMapper =
    require("../services/ActionMapper");

(async () => {

    const ado =
        new AdoClient();

    const parser =
        new AdoStepParser();

    const mapper =
        new ActionMapper();

    const workItem =
        await ado.getWorkItem(
            309287
        );

    const steps =
        parser.parse(
            workItem.fields[
                "Microsoft.VSTS.TCM.Steps"
            ]
        );

    const actions =
        mapper.map(steps);

    console.log(actions);

})();
