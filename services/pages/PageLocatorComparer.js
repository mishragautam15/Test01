class PageLocatorComparer {

    getMissingLocators(
        existingLocators,
        locatorMetadata
    ) {

        return locatorMetadata.controls
            .filter(control => {

                const propertyName =
                    control.businessName
                        .replace(
                            /\s+/g,
                            ""
                        )
                        .replace(
                            /^[A-Z]/,
                            match =>
                                match.toLowerCase()
                        );

                return !existingLocators.includes(
                    propertyName
                );
            });
    }
}

module.exports =
    PageLocatorComparer;