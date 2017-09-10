import {NamedLinkVisualNode} from "./NamedLinkVisualNode";
import {VisualHeadBody} from "./VisualHeadBody";
import {IZoomOutHandler} from "./Interfaces/interfaces";
import {Clipboard} from "./Clipboard";
import {DataNode} from "../model/Interfaces/DataNode";

export class EventManagerForNamedLink {
    public constructor(namedLinkVisualNode: NamedLinkVisualNode, headBody: VisualHeadBody) {
        this.namedLinkVisualNode = namedLinkVisualNode;
        this.dataNode = namedLinkVisualNode.getDataNode();
        this.headBody = headBody;
    }

    public setParentZoomOutHandler(parentZoomOutHandler: IZoomOutHandler) {
        this.parentZoomOutHandler = parentZoomOutHandler;
    }

    public focusEvent() {
    }

    public toggleEvent() {
        if (this.headBody.bodyIsVisible()) {
            this.headBody.zoomOut();
        } else {
            this.headBody.zoomIn();
        }
    }

    public copyEvent() {
    }

    public pasteEvent() {
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
    }

    public previousEvent() {
    }

    public nextEvent() {
    }

    public enterPressed() {
        this.namedLinkVisualNode.getCallbacks().leavesWithEnter();
    }

    public newChildEvent() {
    }

    public deleteMeEvent() {
        this.namedLinkVisualNode.getCallbacks().delete();
    }

    public confirmEvent() {
    }

    public createLinkEvent() {
    }

    private namedLinkVisualNode: NamedLinkVisualNode;
    private dataNode: DataNode;
    private headBody: VisualHeadBody;
    private parentZoomOutHandler: IZoomOutHandler;
}