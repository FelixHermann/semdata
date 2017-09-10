import {SimpleVisualNode} from "./SimpleVisualNode";
import {Clipboard} from "./Clipboard";
import {VisualHeadBody} from "./VisualHeadBody";
import {setContentOfTextArea, textArea, updateVisualDataNodeView} from "../loadApp";
import {DataNode} from "../model/Interfaces/DataNode";
import {IUserEventAcceptor, IZoomOutHandler} from "./Interfaces/interfaces";
import {getDataNodes, getExportAsJson_Object} from "../model/ExportImport";
import {HasDetail} from "../model/HasDetail";
import {SimpleDataNode} from "../model/SimpleDataNode";
import {JSON_To_DataNodes} from "../model/JSON_To_DataNodes/JSON_To_DataNodes";
import {ID_MANAGER, setRootNode} from "../App";
import {IMap} from "../general/Interfaces/IMap";

export class EventManagerForSimpleVisualNode implements IUserEventAcceptor {

    public constructor(simpleVisualNode: SimpleVisualNode, headBody: VisualHeadBody) {
        this.simpleVisualNode = simpleVisualNode;
        this.dataNode = simpleVisualNode.getDataNode();
        this.headBody = headBody;
    }

    public exportObjectEvent() {
        let jsonObject = getExportAsJson_Object(this.dataNode);
        let text = JSON.stringify(jsonObject);
        setContentOfTextArea(text);
    }

    public importToObjectEvent() {
        let completeJSONObject = JSON.parse(textArea.value);

        let rootNode = completeJSONObject.rootNode;

        let listOfAllDataNodes_JSON = completeJSONObject.listOfAllDataNodes;

        let jsonToDataNodes = new JSON_To_DataNodes(listOfAllDataNodes_JSON, ID_MANAGER);

        jsonToDataNodes.createDataNodes();

        let dataNodeProvider: IMap<number, DataNode> = jsonToDataNodes.dataNodeProviderOldID;

        let rootNodeOfImport = dataNodeProvider.get(rootNode);

        let hasDetail = HasDetail.createInstance(this.dataNode, rootNodeOfImport);
        this.simpleVisualNode.getDataNode().addRelationship(hasDetail);
    }

    public setParentZoomOutHandler(parentZoomOutHandler: IZoomOutHandler) {
        this.parentZoomOutHandler = parentZoomOutHandler;
    }

    public focusEvent() {
        this.simpleVisualNode.focus();
    }

    public toggleEvent() {
        if (this.headBody.bodyIsVisible()) {
            this.headBody.zoomOut();
        } else {
            this.headBody.zoomIn();
        }
    }

    public copyEvent() {
        Clipboard.singleton.putIntoClipboard(this.dataNode);
    }

    public pasteEvent() {
        console.log("pasteEvent on SimpleVisualNode not possible at the moment");
    }

    public zoomInEvent() {
        this.headBody.zoomIn();
    }

    public zoomOutEvent() {
        if (this.headBody.zoomOutPossible()) {
            this.headBody.zoomOut();
            this.headBody.getHead().takeCursorFromBottom(); // the object, that consumes the zoomEvent gets the focus ...
            this.headBody.focus();
        } else {
            this.parentZoomOutHandler.zoomOutEvent();
        }
    }

    public totalZoomEvent() {
        setRootNode(this.dataNode);
        updateVisualDataNodeView();
    }

    public previousEvent() {
        // this.simpleVisualNode.emitsCursorTop();
    }

    public nextEvent() {
        // this.simpleVisualNode.emitsCursorBottom();
    }

    public enterPressed() {
        this.simpleVisualNode.getCallbacks().leavesWithEnter();
    }

    public newChildEvent() {
        this.simpleVisualNode.newChild();
    }

    public deleteMeEvent() {
        this.simpleVisualNode.getCallbacks().delete();
    }

    public confirmEvent() {
        console.log("ConfirmEvent on SimpleVisualNode is not defined!");
    }

    public createLinkEvent() {
        console.log("Operation not supported. It is not possible to create link on simpleVisualNode.");
    }

    private simpleVisualNode: SimpleVisualNode;
    private dataNode: DataNode;
    private headBody: VisualHeadBody;
    private parentZoomOutHandler: IZoomOutHandler;
}