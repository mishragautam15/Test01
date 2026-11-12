const fs = require("fs");
const path = require("path");

class ConfigService {

    getEnvironment() {

        return JSON.parse(
            fs.readFileSync(
                path.join(
                    process.cwd(),
                    "config",
                    "environment.json"
                ),
                "utf8"
            )
        );
    }

    getCredentials() {

        return JSON.parse(
            fs.readFileSync(
                path.join(
                    process.cwd(),
                    "config",
                    "credentials.json"
                ),
                "utf8"
            )
        );
    }
}

module.exports =
    ConfigService;