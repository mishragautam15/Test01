const LocatorRepository =
    require(
        "../services/mcp/LocatorRepository"
    );

const repository =
    new LocatorRepository();

console.log(
    repository.getAll()
);