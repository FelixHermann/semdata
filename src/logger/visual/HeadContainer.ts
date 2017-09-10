import {Colors, getColorValue} from "./ColorManagement";
import {IHeadContainer, IUserEventAcceptor} from "./Interfaces/interfaces";
import {BOX_SHADOW_NODE, EDGE_RADIUS, NODE_DISPLAY, STANDARD_MARGIN, STANDARD_PADDING} from "./general";
import {Utils} from "./Utils";

export class HeadContainer implements IHeadContainer {
    private maxWidth: number;

    private setStyle_NotExpanded() {
        this.myDiv.style.borderRadius = EDGE_RADIUS;

        // this.myDiv.style.paddingBottom = "3px";
        // this.myDiv.style.marginBottom = DISTANCE_BETWEEN_NODES + "px";

        this.myDiv.style.padding = STANDARD_PADDING + "px";
        this.myDiv.style.margin = STANDARD_MARGIN + "px";


        this.myDiv.style.boxShadow = "none";
        this.myDiv.style.backgroundColor = getColorValue(this.backgroundColor);
    }

    public setMaxWidth(maxWidth: number) {
        this.maxWidth = maxWidth;
        if (this.myDiv != null) {
            this.myDiv.style.maxWidth = (this.maxWidth + 6) + "px";
        }
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

    private createUIObject() {
        this.myDiv = Utils.getDiv();
        this.myDiv.style.display = NODE_DISPLAY;

        this.setStyle_NotExpanded();

        if (this.bodyIsAvailableAttr) {
            this.myDiv.style.cursor = "pointer";
            this.myDiv.style.textDecoration = "underline";
        }

        let self = this;
        this.myDiv.onclick = function (ev) {
            if (ev.ctrlKey && ev.shiftKey) {
                self.eventManager.totalZoomEvent();
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

        this.content_domObject = this.content.getUIObject();
        this.myDiv.appendChild(this.content_domObject);
    }

    setContent(content: any) {
        this.content = content;
    }

    setEventManager(eventManager: IUserEventAcceptor) {
        this.eventManager = eventManager;
    }

    setBackgroundColor(backgroundColor: Colors) {
        this.backgroundColor = backgroundColor;
    }

    bodyIsAvailable(bool: boolean) {
        this.bodyIsAvailableAttr = bool;
    }

    isExpanded(bool: boolean) {
        if (bool) {
            this.setStyle_Expanded();
        } else {
            this.setStyle_NotExpanded();
        }
    }

    getUIObject() {
        if (this.myDiv == null) {
            this.createUIObject();
        }
        return this.myDiv;
    }

    private myDiv = null;
    private backgroundColor: Colors;
    private bodyIsAvailableAttr: boolean;
    private eventManager: IUserEventAcceptor;
    private content;
    private content_domObject;
}