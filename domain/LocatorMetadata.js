class LocatorMetadata {

    constructor(
        pageName,
        controls,
        testFlow
    ) {

        this.pageName =
            pageName;

        this.controls =
            controls;

        this.testFlow =
            testFlow || [];
    }
}

module.exports =
    LocatorMetadata;