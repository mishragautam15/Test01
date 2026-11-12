const ConfigService =
    require("../../services/ConfigService");

const config =
    new ConfigService();

console.log(
    "Environment:"
);

console.log(
    config.getEnvironment()
);

console.log(
    "Credentials:"
);

console.log(
    config.getCredentials()
);