requirejs.config({
    paths: {
        "jquery": [
            "libs/jQueryDebugging"
        ],
        "keys": ["libs/keys"],
    }
});

require(["target/Tester/Tester", "jquery", "keyBindings", "target/loadApp", "target/exporter/data"], function (testModule, $, keyBindings, loader, data) {
    testModule.Tester.run();
});