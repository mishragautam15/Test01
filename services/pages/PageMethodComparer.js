class PageMethodComparer {

    getMissingMethods(
        existingMethods,
        locatorMetadata
    ) {

        return locatorMetadata.controls
            .filter(
                control =>
                    !existingMethods.includes(
                        control.suggestedMethod
                    )
            );
    }
}

module.exports =
    PageMethodComparer;