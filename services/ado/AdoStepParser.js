const { XMLParser } =
    require("fast-xml-parser");

class AdoStepParser {

    parse(xmlSteps) {

        const parser =
            new XMLParser({
                ignoreAttributes: false
            });

        const result =
            parser.parse(xmlSteps);
       
        const rawSteps =
            Array.isArray(
                result.steps.step
            )
                ? result.steps.step
                : [result.steps.step];

        return rawSteps.map(step => ({

            action:
                step.parameterizedString?.[0]?.["#text"]
                || "",

            expected:
                step.parameterizedString?.[1]?.["#text"]
                || ""

        }));
    }
}

module.exports =
    AdoStepParser;