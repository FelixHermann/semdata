import {IBodyContainer, IHeadContainer, IUserEventAcceptor, IZoomOutHandler, VisualNode} from "./Interfaces/interfaces";
import {Callbacks} from "./Callbacks";
import {DataNode} from "../model/Interfaces/DataNode";
import {Colors} from "./ColorManagement";
import {BodyContainer} from "./BodyContainer";
import {HeadContainer} from "./HeadContainer";
import {HeadBodyRepresentation} from "./HeadBodyRepresentation";
import {LOGGER} from "../loadApp";

export abstract class VisualHeadBody implements VisualNode {

    abstract getBackgroundColor(): Colors;
    abstract createBody(maxWidth: number);
    abstract getHead(): VisualNode;
    abstract getBody(): VisualNode;
    abstract bodyAvailable() : boolean;
    abstract getEventManager() : IUserEventAcceptor;
    abstract setParentZoomOutHandler(parentZoomOutHandler: IZoomOutHandler);

    public getDataNode() : DataNode {
        return undefined;
    }

    public getCallbacks(): Callbacks {
        return this.callbacks;
    }

    private createUIObject() {
        LOGGER.startGroup("createUIObject, VisualHeadBody");

        this.configureHead();
        this.headContainer = new HeadContainer();
        this.headContainer.setContent(this.getHead());
        this.headContainer.setEventManager(this.getEventManager());
        this.headContainer.setBackgroundColor(this.getBackgroundColor());
        this.headContainer.setMaxWidth(this.maxWidth);
        this.updateHead();
        this.myDiv = this.headContainer.getUIObject();

        this.headBodyRepresentation = new HeadBodyRepresentation();
        let self = this;
        this.headBodyRepresentation.setBodyContainer_Creator(new class{
            create() {
                let bodyContainer: IBodyContainer = new BodyContainer(self.getBackgroundColor());
                self.createBody(self.getMaxWidth()); // TODO delete old body ...
                bodyContainer.setContent(self.getBody());
                bodyContainer.setMaxWidth(self.getMaxWidth());
                return bodyContainer;
            }
        });
        this.headBodyRepresentation.setHeadContainer(this.headContainer);
        LOGGER.endGroup("createUIObject, VisualHeadBody");
    }

    public removeFromDOM() {
        this.headBodyRepresentation.removeFromDOM();
    }

    public getUIObject() {
        if (this.myDiv === null) {
            this.createUIObject();
        }
        return this.myDiv;
    }

    public showBody() {
        this.headBodyRepresentation.showBody();
    }

    public hideBody() {
        this.headBodyRepresentation.hideBody();
    }

    public updateHead() {
        this.headContainer.bodyIsAvailable(this.bodyAvailable());
    }

    public bodyIsVisible() {
        let toReturn = null;
        if (this.headBodyRepresentation == null) {
            toReturn =  false;
        } else {
            toReturn =  this.headBodyRepresentation.get_bodyIsVisible();
        }

        LOGGER.log("bodyIsVisible, VisualHeadBody, returns: " + toReturn);
        return toReturn;
    }

    public setMaxWidth(maxWidth: number) {
        this.maxWidth = maxWidth;
        if (this.headContainer != null) {
            this.headContainer.setMaxWidth(maxWidth);
        }
        if (this.bodyIsVisible()) {
            this.headBodyRepresentation.setMaxWidth(maxWidth);
        }
    }

    public getMaxWidth() {
        return this.maxWidth;
    }

    public configureBody() {
        let self = this;
        this.getBody().getCallbacks().onEmitsCursorBottom(function () {
            self.callbacks.emitsCursorBottom();
        });
        this.getBody().getCallbacks().onEmitsCursorTop(function () {
            self.getHead().takeCursorFromBottom();
            self.focus();
        });
    }

    private configureHead() {
        let self = this;
        this.getHead().getCallbacks().onEmitsCursorBottom(function () {
            if (self.bodyIsVisible()) {
                self.getBody().takeCursorFromTop();
            } else {
                self.callbacks.emitsCursorBottom();
            }
        });
        this.getHead().getCallbacks().onEmitsCursorTop(function () {
            self.callbacks.emitsCursorTop()
        });
    }

    public takeCursorFromBottom() {
        if(this.bodyIsVisible()) {
            this.getBody().takeCursorFromBottom();
        } else {
            this.getHead().takeCursorFromBottom();
            this.focus();
        }
    }

    public focus() {
    }

    public removeFocus() {
    }

    public takeCursorFromTop() {
        this.getHead().takeCursorFromTop();
        this.focus();
    }

    public zoomOutPossible(): boolean {
        return this.bodyIsVisible();
    }

    public zoomInPossible(): boolean {
        return undefined;
    }

    public zoomIn() {
        if (this.bodyIsVisible()) {
            this.getBody().zoomIn();
        } else {
            if (this.bodyAvailable()) {
                this.showBody();
                this.headContainer.isExpanded(true);
            }
        }
    }

    public zoomOut() {
        if (this.bodyIsVisible()) {
            if (this.getBody().zoomOutPossible()) {
                this.getBody().zoomOut();
            } else {
                this.hideBody();
            }
        }
    }


    public scaleToMinimum() {
        if (this.bodyIsVisible()) {
            this.hideBody();
        }
    }

    private myDiv = null;
    private maxWidth: number;
    private callbacks: Callbacks = new Callbacks();
    private headContainer: IHeadContainer = null;
    private headBodyRepresentation: HeadBodyRepresentation = null;
}