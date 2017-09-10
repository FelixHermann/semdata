import {SimpleDataNode} from "./model/SimpleDataNode";
import {Colors, getColorValue} from "./visual/ColorManagement";
import {Utils} from "./visual/Utils";
import {MAX_WIDTH_OF_NODE_VIEW} from "./visual/general";
import {EfTurLoggingSystem} from "./logger/EfTurLogger/EfTurLoggingSystem";
import {IGroupLogger} from "./logger/EfTurLogger/IGroupLogger";
import {EfTurDocument} from "./model/EfTurDocument";
import {DocumentController} from "./DocumentController";
import {WindowManager} from "./WindowManager";
import {RestFunctionality} from "./RestFunctionality";
import {Configuration} from "./Configuration";
import {SimpleVisualNode} from "./visual/SimpleVisualNode";

function installLoggingSystem() {
    let efTurLoggingSystem = new EfTurLoggingSystem();
    LOGGER = efTurLoggingSystem.getGroupLogger();
    let container = efTurLoggingSystem.getContainer();
    if (Configuration.singleton.showLogger()) {
        document.body.appendChild(container.getUIObject());
        container.setMaxWidth(800); // after getUIObject!
    }
}

export function loadAppFromJSON(jsonObject) {

    testDiv = RestFunctionality.singleton.getUIObject();

    if (!Configuration.singleton.isViewer()) {
        document.body.appendChild(testDiv);
    }

    document.body.appendChild(appDiv);
    document.body.spellcheck = false;
    installLoggingSystem();
    LOGGER.startGroup("loadApp");

    documentController = new DocumentController();

    RestFunctionality.singleton.register({
        notify() {
            let jsonString = RestFunctionality.singleton.getContentOfTextArea();
            documentController.setJSON((JSON).parse(jsonString));
        }
    });

    appDiv.appendChild(documentController.getRepresentation().getUIObject());

    document.body.style.margin = "0";
    document.body.style.backgroundColor = getColorValue(backgroundColor);

    EfTurDocument.singleton.register({
        notify() {
            adaptTitle();

        }
    });

    adaptToWindowSize();
    window.addEventListener("resize", function () {
        adaptToWindowSize();
    });

    appendPlaceholder();
    appendTmpField();

    documentController.setJSON(jsonObject);
    LOGGER.endGroup("loadApp");
}

function adaptTitle() {
    WindowManager.singleton.setTitle((<SimpleDataNode> EfTurDocument.singleton.rootNode).getName());

    if (Configuration.singleton.isWebsite()) {
        let simpleDataNode: SimpleDataNode = <SimpleDataNode> EfTurDocument.singleton.rootNode;
        let visualRootNode: SimpleVisualNode = documentController.visualRootNode;
        let actualVisualNode = visualRootNode.getRelationshipsController().getVisualNodeAtPosition(1);
        let actualDataNode = (<SimpleVisualNode> actualVisualNode).getDataNode();
        document.title = actualDataNode.getName();
    }
}

export function getWindowWidth() {
    LOGGER.log("getWindowWidth");
    return window.innerWidth - 40;
}

function adaptToWindowSize() {
    LOGGER.startGroup("adaptToWindowSize");
    let width = getWindowWidth();
    let elem = documentController.getRepresentation().getUIObject();

    let marginLeft;
    let newWidth;

    if (width > MAX_WIDTH_OF_NODE_VIEW) {
        newWidth = MAX_WIDTH_OF_NODE_VIEW;
        marginLeft = (width - MAX_WIDTH_OF_NODE_VIEW) / 2;
    } else {
        newWidth = width;
        marginLeft = 0;
    }

    // elem.style.width = newWidth + "px";
    elem.style.marginLeft = marginLeft + "px";
    documentController.getRepresentation().setWidth(newWidth);

    let height = window.innerHeight - 30;
    placeholder.style.height = height + "px";
    LOGGER.endGroup("adaptToWindowSize");
}


export function appendPlaceholder() {
    document.body.appendChild(placeholder);
}


function appendTmpField() {
    tmpField = document.createElement("div");
    document.body.appendChild(tmpField);
}

export let testDiv;
export let tmpField;
let backgroundColor = Colors.White;
let placeholder = Utils.getDiv();
let documentController: DocumentController;
let appDiv = Utils.getDiv();
export var LOGGER: IGroupLogger;
