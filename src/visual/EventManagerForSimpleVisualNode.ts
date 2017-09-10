import {SimpleVisualNode} from "./SimpleVisualNode";
import {Clipboard} from "./Clipboard";
import {VisualHeadBody} from "./VisualHeadBody";
import {DataNode} from "../model/Interfaces/DataNode";
import {IUserEventAcceptor, IZoomOutHandler} from "./Interfaces/interfaces";
import {getExportAsJson_Object} from "../model/ExportImport";
import {HasDetail} from "../model/HasDetail";
import {JSON_To_DataNodes} from "../model/JSON_To_DataNodes/JSON_To_DataNodes";
import {IMap} from "../general/Interfaces/IMap";
import {EfTurDocument} from "../model/EfTurDocument";
import {RestFunctionality} from "../RestFunctionality";

export class EventManagerForSimpleVisualNode implements IUserEventAcceptor {

    public constructor(simpleVisualNode: SimpleVisualNode, headBody: VisualHeadBody) {
        this.simpleVisualNode = simpleVisualNode;
        this.dataNode = simpleVisualNode.getDataNode();
        this.headBody = headBody;
    }

    public exportObjectEvent() {
        let jsonObject = getExportAsJson_Object(this.dataNode);
        let text = JSON.stringify(jsonObject);
        RestFunctionality.singleton.setContentOfTextArea(text);

    }

    public importToObjectEvent() {
        let completeJSONObject = JSON.parse(RestFunctionality.singleton.getContentOfTextArea());

        let rootNode = completeJSONObject.rootNode;

        let listOfAllDataNodes_JSON = completeJSONObject.listOfAllDataNodes;

        let jsonToDataNodes = new JSON_To_DataNodes(listOfAllDataNodes_JSON, EfTurDocument.singleton.idManager);

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
            this.simpleVisualNode.getDataNode().standard_expanded = false;
            this.headBody.scaleToMinimum();
        } else {
            this.headBody.zoomIn();
        }
    }

    standard_expanded_toggleEvent() {
        let newValue : boolean = !this.simpleVisualNode.standard_expanded;
        this.simpleVisualNode.getDataNode().standard_expanded = newValue;
        if (newValue) {
            this.headBody.zoomIn();
        } else {
            this.headBody.scaleToMinimum();
        }
    }

    public cutEvent() {
        Clipboard.singleton.putIntoClipboard(this.dataNode);
        this.simpleVisualNode.getCallbacks().delete();

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
        EfTurDocument.singleton.rootNode = this.dataNode;
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