requirejs.config({
    paths: {
        "jquery": [
            "libs/jQueryDebugging"
        ],
        "keys": ["libs/keys"],
    }
});

require(["jquery", "keyBindings", "target/loadApp", "target/data"], function ($, keyBindings, loader, data) {
    loader.loadAppFromJSON(data.jsonData);
});