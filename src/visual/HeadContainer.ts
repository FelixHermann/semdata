import {Colors, getColorValue} from "./ColorManagement";
import {IHeadContainer, IUserEventAcceptor} from "./Interfaces/interfaces";
import {BOX_SHADOW_NODE, EDGE_RADIUS, NODE_DISPLAY, STANDARD_MARGIN, STANDARD_PADDING} from "./general";
import {Utils} from "./Utils";
import {LOGGER} from "../loadApp";

export class HeadContainer implements IHeadContainer {

    private setStyle_NotExpanded() {
        this.myDiv.style.borderRadius = EDGE_RADIUS;
        this.myDiv.style.padding = STANDARD_PADDING + "px";
        this.myDiv.style.margin = STANDARD_MARGIN + "px";
        this.myDiv.style.boxShadow = "none";
        this.myDiv.style.backgroundColor = getColorValue(this.backgroundColor);
    }

    private setStyle_Expanded() {
        this.myDiv.style.borderBottomLeftRadius = "0px";
        this.myDiv.style.borderBottomRightRadius = "0px";

        // head touches body
        let overlap : number = 1; // without overlap there might be a line between head and body (Chrome, IE)
        this.myDiv.style.marginBottom = "-" + overlap + "px";
        this.myDiv.style.paddingBottom = (STANDARD_MARGIN + STANDARD_PADDING + overlap ) +"px";

        this.myDiv.style.backgroundColor = getColorValue(this.backgroundColor);
        this.myDiv.style.boxShadow = BOX_SHADOW_NODE;
    }


    public setMaxWidth(maxWidth: number) {
        this.maxWidth = maxWidth;
        if (this.myDiv != null) {
            this.myDiv.style.maxWidth = (this.maxWidth + 6) + "px";
        }
    }

    private createUIObject() {
        LOGGER.startGroup("createUIObject, HeadContainer");
        // this.myDiv.style.display = NODE_DISPLAY;

        this.setStyle_NotExpanded();

        this.content_domObject = this.content.getUIObject();
        this.myDiv.appendChild(this.content_domObject);
        LOGGER.endGroup("createUIObject, HeadContainer");
    }

    setContent(content: any) {
        this.content = content;
    }

    setEventManager(eventManager: IUserEventAcceptor) {
        this.eventManager = eventManager;

        let self = this;
        this.myDiv.onclick = function (ev) {
            if (ev.ctrlKey && ev.shiftKey) {
                // disabled because of website
                // self.eventManager.totalZoomEvent();
            } else if (!ev.ctrlKey) {
                self.eventManager.toggleEvent();
            }
            self.eventManager.focusEvent();
        };
        this.myDiv.oncontextmenu = function (ev) {
            if (ev.ctrlKey) {
                self.eventManager.zoomOutEvent();
            } else {
                self.eventManager.zoomInEvent();
            }
            ev.preventDefault();
            self.eventManager.focusEvent();
        };
    }

    setBackgroundColor(backgroundColor: Colors) {
        this.backgroundColor = backgroundColor;
    }

    bodyIsAvailable(bool: boolean) {
        this.bodyIsAvailableAttr = bool;
        this.refresh_bodyIsAvailable();
    }

    private refresh_bodyIsAvailable() {
        if (this.bodyIsAvailableAttr) {
            this.myDiv.style.textDecoration = "underline";
            this.myDiv.style.cursor = "pointer";
        } else {
            this.myDiv.style.textDecoration = "none";
            this.myDiv.style.cursor = "auto";
        }
    }

    isExpanded(bool: boolean) {
        if (bool) {
            this.setStyle_Expanded();
        } else {
            this.setStyle_NotExpanded();
        }
    }

    getUIObject() {
        if (!this.createdUIObject_tmp) {
            this.createUIObject();
            this.createdUIObject_tmp = true;
        }
        return this.myDiv;
    }

    private createdUIObject_tmp: boolean = false;

    private myDiv = Utils.getDiv();
    private backgroundColor: Colors;
    private bodyIsAvailableAttr: boolean;
    private eventManager: IUserEventAcceptor;
    private content;
    private content_domObject;
    private maxWidth: number;
}