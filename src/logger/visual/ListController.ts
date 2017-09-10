import {IZoomOutHandler, VisualNode} from "./Interfaces/interfaces";
import {Callbacks} from "./Callbacks";
import {DataNode} from "../model/Interfaces/DataNode";
import {List} from "../general/List";

export class ListController extends Callbacks implements VisualNode {

    constructor(listElements: Array<VisualNode>, maxWidth: number) {
        super();
        this.myDiv = document.createElement('div');
        this.myDiv.style.width = this.maxWidth + "px";
        this.setMaxWidth(maxWidth);
        for (let i = 0; i < listElements.length; i++) {
            this.insertVisualNodeAtPosition(listElements[i], i);
        }
    }

    public getCallbacks(): Callbacks {
        return this.callbacks;
    }

    // TODO not used !!!
    public setParentZoomOutHandler(parentZoomOutHandler: IZoomOutHandler) {
    }

    private configureListElement(listElem : VisualNode) {
        let self = this;
        listElem.setMaxWidth(this.maxWidthForChildren);
        listElem.getCallbacks().onEmitsCursorTop(function () {
            self.childEmitsCursorTop(listElem);
        });
        listElem.getCallbacks().onEmitsCursorBottom(function () {
            self.childEmitsCursorBottom(listElem);
        });
        listElem.getCallbacks().onLeavesWithEnter(function () {
            self.childLeavesWithEnter(listElem);
        });
    }

    private childEmitsCursorTop(child: VisualNode) {
        let previousChild: VisualNode = this.subVisualNodes.getPrevious(child);
        if (previousChild == null) {
            this.emitsCursorTop();
        } else {
            previousChild.takeCursorFromBottom();
        }
    }

    private childEmitsCursorBottom(child: VisualNode) {
        let nextChild: VisualNode = this.subVisualNodes.getNext(child);
        if (nextChild == null) {
            this.emitsCursorBottom();
        } else {
            nextChild.takeCursorFromTop();
        }
    }

    private childLeavesWithEnter(visualNode: VisualNode) {
        this.onChildLeavesWithEnterAttr.call(this, visualNode);
    }

    public onChildLeavesWithEnter(callback: Function) {
        this.onChildLeavesWithEnterAttr = callback;
    }

    public zoomIn() {
        for (let i = 0; i < this.subVisualNodes.getLength(); i++) {
            this.subVisualNodes.get(i).zoomIn();
        }
    }

    public zoomOut() {
        for (var i = 0; i < this.subVisualNodes.getLength(); i++) {
            this.subVisualNodes.get(i).zoomOut();
        }
    }

    public zoomInPossible(): boolean {
        return undefined;
    }

    public zoomOutPossible(): boolean {
        for (var i = 0; i < this.subVisualNodes.getLength(); i++) {
            if (this.subVisualNodes.get(i).zoomOutPossible()) {
                return true;
            }
        }
        return false;
    }

    public getVisualNodeAtPosition(position: number): VisualNode {
        return this.subVisualNodes.get(position);
    }

    public insertVisualNodeAtPosition(visualNode: VisualNode, position: number) {
        this.configureListElement(visualNode);
        let visualNodeDiv = visualNode.getUIObject();
        if (position == this.subVisualNodes.getLength()) {
            this.myDiv.appendChild(visualNodeDiv);
        } else {
            // it is possible that myDiv.children.length > subVisualNodes.getLength()
            let UIObject_After = this.subVisualNodes.get(position).getUIObject();
            this.myDiv.insertBefore(visualNodeDiv, UIObject_After);
        }
        this.subVisualNodes.insert(visualNode, position);
    }

    public removeVisualNodeAtPosition(position: number) {
        this.subVisualNodes.get(position).removeFromDOM();
        this.subVisualNodes.remove(position);
    }

    public focusVisualNodeAtPosition(position: number) {
        this.subVisualNodes.get(position).takeCursorFromTop();
    }

    public getUIObject() {
        return this.myDiv;
    }

    public setMaxWidth(maxWidth: number) {
        this.maxWidth = maxWidth;
        this.set_maxWidthForChildren();
        for (let i = 0; i < this.subVisualNodes.getLength(); i++) {
            this.subVisualNodes.get(i).setMaxWidth(this.maxWidthForChildren);
        }
    }

    private set_maxWidthForChildren() {
        // this.maxWidthForChildren = this.maxWidth - INDENTATION - INDENTATION - 3;
        this.maxWidthForChildren = this.maxWidth;
    }

    public getIndexOfChild(child): number {
        return this.subVisualNodes.getIndex(child);
    }

    public takeCursorFromBottom() {
        let lastChildren = this.subVisualNodes.get(this.subVisualNodes.getLength() - 1);
        lastChildren.takeCursorFromBottom();
    }

    public takeCursorFromTop() {
        this.subVisualNodes.get(0).takeCursorFromTop();
    }

    getDataNode(): DataNode {
        // not used here ...
        return undefined;
    }

    focus() {
    }

    removeFocus() {
    }

    private myDiv;
    private subVisualNodes: List<VisualNode> = new List<VisualNode>();
    private onChildLeavesWithEnterAttr;
    private maxWidth: number;
    private maxWidthForChildren;

    private callbacks: Callbacks = new Callbacks();
}