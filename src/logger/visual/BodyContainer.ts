import {Colors, getColorValue} from "./ColorManagement";
import {IBodyContainer} from "./Interfaces/interfaces";
import {BOX_SHADOW_NODE, INDENTATION_PADDING, STANDARD_MARGIN, STANDARD_PADDING} from "./general";
import {Utils} from "./Utils";
export class BodyContainer implements IBodyContainer {

    constructor(backgroundColor: Colors) {
        this.backgroundColor = backgroundColor;
        this.createUIObject();
    }

    setMaxWidth(maxWidth: number) {
        this.maxWidth = maxWidth;
        this.containerDiv.style.width = this.maxWidth + "px";
        this.content.setMaxWidth(this.maxWidth - 2 * (INDENTATION_PADDING + STANDARD_MARGIN));
    }

    private createUIObject() {
        let width = this.maxWidth;
        this.containerDiv = Utils.getDiv();


        this.containerDiv.style.marginLeft = STANDARD_MARGIN + "px";
        this.containerDiv.style.marginRight = STANDARD_MARGIN + "px";
        this.containerDiv.style.marginBottom = STANDARD_MARGIN + "px";

        this.containerDiv.style.padding = STANDARD_PADDING + "px";
        this.containerDiv.style.paddingLeft = INDENTATION_PADDING + "px";
        this.containerDiv.style.paddingRight = INDENTATION_PADDING + "px";


        this.containerDiv.style.overflow = "hidden";
        this.containerDiv.style.backgroundColor = getColorValue(this.backgroundColor);
        this.containerDiv.style.display = "inline-block"; // otherwise the shadow of head looks ugly


        this.containerDiv.style.width = this.maxWidth + "px";


        this.containerDiv.style.boxShadow = BOX_SHADOW_NODE;

        let fontSizeDiv = Utils.getDiv();
        fontSizeDiv.appendChild(this.containerDiv);
        fontSizeDiv.style.fontSize = "0%"; // to prevent gap (at the beginning of the animation) caused by inline-block of containerDiv
        this.containerDiv.style.fontSize = "12pt"; // normalize fontSize
        this.myDiv = fontSizeDiv;
    }

    getUIObject() {
        return this.myDiv;
    }

    setContent(content: any) {
        this.content = content;
        this.content_domObject = this.content.getUIObject();
        this.containerDiv.appendChild(this.content_domObject);
    }

    setCollapsed() {
        this.containerDiv.style.maxHeight = "0px";
    }

    setExpanded() {
        throw new Error("Method not implemented.");
    }

    startExpandAnimation() {
        let timeExpand : number = 150;
        let timeExpandInSeconds : number = timeExpand / 1000;

        this.containerDiv.style.transition = "max-height " + timeExpandInSeconds + "s";

        let self = this;
        let expand = function () {
            self.startExpandAnimation_helper();
        };
        let freeMaxHeight = function () {
            self.containerDiv.style.maxHeight = "none";
        };

        window.setTimeout(expand, 1); // one millisecond - for start value of maxHeight
        window.setTimeout(freeMaxHeight, timeExpand);
    }


    private startExpandAnimation_helper() {
        let offsetHeight = this.content_domObject.offsetHeight;
        this.containerDiv.style.maxHeight = offsetHeight + "px";
    }

    startCollapseAnimation() {
        let offsetHeight = this.content_domObject.offsetHeight;
        this.containerDiv.style.maxHeight = offsetHeight + "px";

        let timeCollapse : number = 150;
        let timeCollapseInSeconds : number = timeCollapse / 1000;

        this.containerDiv.style.transition = "max-height " + timeCollapseInSeconds + "s";

        let self = this;
        let collapse = function () {
            self.startCollapseAnimation_helper();
        };
        let end = function () {
            self.onCollapsedAttr.call(self);
        };

        window.setTimeout(collapse, 1); // one millisecond - for start value of maxHeight
        window.setTimeout(end, timeCollapse);
    }

    private startCollapseAnimation_helper() {
        this.containerDiv.style.maxHeight = "0px";
    }

    onCollapsed(callback: Function) {
        this.onCollapsedAttr = callback;
    }

    private onCollapsedAttr: Function;
    private myDiv = Utils.getDiv();
    private maxWidth: number;
    private content;
    private content_domObject;
    private backgroundColor: Colors;
    private containerDiv = null;
}