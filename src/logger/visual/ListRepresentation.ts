import {UIObject} from "./Interfaces/interfaces";
import {List} from "../general/List";


export class ListRepresentation {

    constructor(listElements: List<UIObject>) {
        this.myDiv = Utils.getDiv();
        for (let i = 0; i < listElements.getLength(); i++) {
            this.insertVisualNodeAtPosition(listElements[i], i);
        }
    }

    public insertVisualNodeAtPosition(visualNode: UIObject, position: number) {
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

    public getUIObject() {
        return this.myDiv;
    }

    public getVisualNodeAtPosition(position: number): UIObject {
        return this.subVisualNodes.get(position);
    }

    private myDiv;
    private subVisualNodes: List<UIObject> = new List<UIObject>();
}