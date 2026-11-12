const AdoClient =
    require('../../services/ado/AdoClient');

(async () => {

    try {

        const ado =
            new AdoClient();

        const workItem =
            await ado.getWorkItem(309287);

        console.log(
            JSON.stringify(
                workItem,
                null,
                2
            )
        );

    } catch (error) {

        console.error(
            error.response?.data ||
            error.message
        );
    }

})();