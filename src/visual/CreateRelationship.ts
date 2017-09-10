import {IUserEventAcceptor, IZoomOutHandler, VisualNode} from "./Interfaces/interfaces";
import {Relationship} from "../model/Interfaces/DataNode";
import {Colors, getColorValue} from "./ColorManagement";
import {Callbacks} from "./Callbacks";
import {PlaceholderRelationship} from "../model/PlaceholderRelationship";
import {FocusableTextField} from "./FocusableTextField";
import {SimpleDataNode} from "../model/SimpleDataNode";
import {HasDetail} from "../model/HasDetail";
import {SimpleVisualNode} from "./SimpleVisualNode";
import {Clipboard} from "./Clipboard";
import {EventManagerForCreateRelationship} from "./EventManagerForCreateRelationship";
import {Utils} from "./Utils";
import {
    EDGE_RADIUS, getFocusedObject, NODE_DISPLAY, setFocusedObject, STANDARD_MARGIN,
    STANDARD_PADDING
} from "./general";

export class CreateRelationship implements VisualNode {

    public constructor(placeholderRelationship: PlaceholderRelationship,
                       simpleVisualNode: SimpleVisualNode, backgroundColor: Colors) {
        this.placeholderRelationship = placeholderRelationship;
        this.backgroundColor = backgroundColor;
        this.simpleVisualNode = simpleVisualNode;
        this.eventManager = new EventManagerForCreateRelationship(this);
    }

    private newChild() {
        let index = this.getOwnIndex();
        this.confirm();
        let node = <SimpleVisualNode> this.simpleVisualNode.getRelationshipsController().getVisualNodeAtPosition(index);
        node.newChild();
    }

    getCallbacks(): Callbacks {
        return this.callbacks;
    }

    getEventManager(): IUserEventAcceptor {
        return undefined;
    }

    setParentZoomOutHandler(parentZoomOutHandler: IZoomOutHandler) {
    }

    setMaxWidth(maxWidth: number) {
    }

    public paste() {
        console.log("paste ... CreateRelationship");
        let hasDetail: Relationship = HasDetail.createInstance(this.simpleVisualNode.getDataNode(), Clipboard.singleton.getDataNode());
        this.replaceCreateRelationshipByConnector(hasDetail);
    }

    public confirm() {
        let object = SimpleDataNode.createInstance(this.getText());
        object.standard_expanded = true;
        let hasDetail: HasDetail = HasDetail.createInstance(this.simpleVisualNode.getDataNode(), object);
        this.replaceCreateRelationshipByConnector(hasDetail);
    }

    public confirmAndLeaveWithEnter() {
        let index = this.getOwnIndex();
        this.confirm();
        this.simpleVisualNode.createRelationshipAtPosition(index + 1);
    }

    private getOwnIndex() {
        return this.simpleVisualNode.getRelationshipsController().getIndexOfChild(this);
    }

    private replaceCreateRelationshipByConnector(connector: Relationship) {
        let index = this.getOwnIndex();
        this.simpleVisualNode.getDataNode().replaceRelationshipAtPosition(connector, index);
        this.simpleVisualNode.getRelationshipsController().focusVisualNodeAtPosition(index);
    }

    public focus() {
        let previousFocused = getFocusedObject();
        if (previousFocused != null) {
            previousFocused.removeFocus();
        }
        this.nodeDiv.style.backgroundColor = getColorValue(Colors.LightLightBlue);
        setFocusedObject(this);
    }

    public removeFocus() {
        this.nodeDiv.style.backgroundColor = getColorValue(this.backgroundColor);
    }

    public zoomIn() {
    }

    public zoomOut() {
    }

    public getDataNode(): PlaceholderRelationship {
        return this.placeholderRelationship;
    }

    public getText() {
        return this.head.getText();
    }

    public onEnterPressedAtTextField(callback: Function) {
        this.onEnterPressedAtTextFieldAttr = callback;
    }

    public enterPressedAtTextField() {
        this.onEnterPressedAtTextFieldAttr.call(this);
    }

    public createUIObject() {
        this.nodeDiv = Utils.getDiv();

        // this.nodeDiv.style.display = NODE_DISPLAY;
        this.nodeDiv.style.borderRadius = EDGE_RADIUS;

        this.nodeDiv.style.padding = STANDARD_PADDING + "px";
        this.nodeDiv.style.margin = STANDARD_MARGIN + "px";

        this.nodeDiv.style.boxShadow = "0px 0px 1px 2px grey, inset 0px 0px 0px 2px grey";
        this.nodeDiv.style.backgroundColor = getColorValue(this.backgroundColor);

        this.head = new FocusableTextField("", null, this.eventManager);
        this.configureHead();
        let headDiv = this.head.getUIObject();
        // headDiv.style.display = NODE_DISPLAY;
        this.nodeDiv.appendChild(headDiv);
    }

    public getUIObject() {
        if (this.nodeDiv === null) {
            this.createUIObject();
        }
        return this.nodeDiv;
    }

    private configureHead() {
        let self = this;
        this.head.onTextChange(function () {
            self.textChanged();
        });
    }

    public removeFromDOM() {
        Utils.remove(this.nodeDiv);
    }

    private textChanged() {
        // at the moment: do nothing
    }

    public zoomInPossible(): boolean {
        return false;
    }

    public zoomOutPossible(): boolean {
        if (this.zoomStatus == 0) {
            return false;
        } else {
            // TODO
        }
    }

    public takeCursorFromTop() {
        this.head.takeCursorFromTop();
        this.focus();
    }

    public takeCursorFromBottom() {
        if (this.zoomStatus == 0) {
            this.head.takeCursorFromBottom();
        } else {
            // TODO
        }
        this.focus();
    }

    // private createLinkEventOnCreateRelationship(createRelationship: CreateRelationship) {
    //     console.log("createLinkEventOnCreateRelationship");
    //
    //     let object = SimpleDataNode.createInstance([new TextObject("")]);
    //     let namedLink: OriginalNamedLink = OriginalNamedLink.createInstance(createRelationship.getText(), this.dataNode, object);
    //     object.addRelationship(namedLink.getInverseNamedLink());
    //
    //     let index = this.relationshipsController.getIndexOfChild(createRelationship);
    //
    //     createRelationship.getDataNode().delete(); // this may lead to an "ZoomOut"-Event ...
    //     this.dataNode.addRelationshipAtPosition(namedLink, index);
    //     if (!this.bodyIsVisible()) {
    //         this.zoomIn();
    //     }
    //     this.relationshipsController.focusVisualNodeAtPosition(index);
    //
    //     (<SimpleVisualNode> getVisualNodeWithFocus()).zoomInEvent();
    //     (<SimpleVisualNode> getVisualNodeWithFocus()).nextEvent();
    // }

    private zoomStatus: number = 0;
    private backgroundColor: Colors;

    private nodeDiv = null;
    private head: FocusableTextField;

    private placeholderRelationship;

    private onEnterPressedAtTextFieldAttr: Function;

    private simpleVisualNode: SimpleVisualNode;

    private eventManager: EventManagerForCreateRelationship;

    private callbacks: Callbacks = new Callbacks();
}