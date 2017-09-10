import {IFocusable, IUserEventAcceptor, VisualNode} from "./Interfaces/interfaces";
import {DataNode} from "../model/Interfaces/DataNode";
import {Colors} from "./ColorManagement";
import {TextField} from "./TextField";

export class FocusableTextField extends TextField implements VisualNode, IFocusable {

    public constructor(text: string, backgroundColor: Colors, eventAcceptor: IUserEventAcceptor) {
        super(text, eventAcceptor);
        this.setBackgroundColor(backgroundColor);
    }

    public takeCursorFromBottom() {
        this.takeCursor();
    }

    public takeCursorFromTop() {
        this.takeCursor();
    }

    public focus() {
        this.takeCursor();
    }

    // not used here:
    public getDataNode(): DataNode {
        return undefined;
    }
    public zoomInPossible(): boolean {
        return undefined;
    }
    public zoomOutPossible(): boolean {
        return undefined;
    }
    public zoomIn() {
    }
    public zoomOut() {
    }
    public removeFocus() {
    }
}