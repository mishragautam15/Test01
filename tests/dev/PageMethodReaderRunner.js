const PageMethodReader =
    require(
        "../../services/pages/PageMethodReader"
    );

const reader =
    new PageMethodReader();

const methods =
    reader.getMethods(
        "./pages/LoginPage.js"
    );

console.log(methods);
