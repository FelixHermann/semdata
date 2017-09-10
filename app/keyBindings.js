define(["jquery", "keys"], function ($) {
    function getVisualNodeWithFocusJavaScript() {
        var focused = document.activeElement;
        return focused.userEventAcceptor;
    }

    $(document).bind('keydown', 'return', function (ev) {
        getVisualNodeWithFocusJavaScript().enterPressed();
    });

    $(document).bind('keydown', 'ctrl+shift+return', function () {
        getVisualNodeWithFocusJavaScript().newChildEvent();
    });
    $(document).bind('keydown', 'ctrl+e', function (ev) {
        getVisualNodeWithFocusJavaScript().exportObjectEvent();
        ev.preventDefault();
    });
    $(document).bind('keydown', 'ctrl+i', function (ev) {
        getVisualNodeWithFocusJavaScript().importToObjectEvent();
        ev.preventDefault();
    });
    $(document).bind('keydown', 'ctrl+s', function (ev) {
        getVisualNodeWithFocusJavaScript().standard_expanded_toggleEvent();
        ev.preventDefault();
    });
    $(document).bind('keydown', 'ctrl+shift+c', function (ev) {
        getVisualNodeWithFocusJavaScript().copyEvent();
        ev.preventDefault();
    });
    $(document).bind('keydown', 'ctrl+shift+x', function (ev) {
        getVisualNodeWithFocusJavaScript().cutEvent();
        ev.preventDefault();
    });
    $(document).bind('keydown', 'ctrl+shift+v', function (ev) {
        getVisualNodeWithFocusJavaScript().pasteEvent();
        ev.preventDefault();
    });
    $(document).bind('keydown', 'ctrl+return', function (ev) {
        getVisualNodeWithFocusJavaScript().confirmEvent();
    });
    $(document).bind('keydown', 'ctrl+.', function () {
        getVisualNodeWithFocusJavaScript().createLinkEvent();

    });
    $(document).bind('keydown', 'ctrl+shift+backspace', function () {
        getVisualNodeWithFocusJavaScript().deleteMeEvent();
    });
    $(document).bind('keydown', 'ctrl+down', function () {
        getVisualNodeWithFocusJavaScript().zoomInEvent();
    });

    $(document).bind('keydown', 'ctrl+up', function () {
        getVisualNodeWithFocusJavaScript().zoomOutEvent();
    });

    $(document).bind('keydown', 'down', function () {
        getVisualNodeWithFocusJavaScript().next();
    });

    $(document).bind('keydown', 'up', function () {
        getVisualNodeWithFocusJavaScript().previous();
    });

    $.hotkeys.options.filterTextInputs = false;
    $.hotkeys.options.filterContentEditable = false;
    $.hotkeys.options.filterInputAcceptingElements = false;

});
