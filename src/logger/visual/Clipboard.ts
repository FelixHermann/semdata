import {DataNode} from "../model/Interfaces/DataNode";
export class Clipboard {

    public putIntoClipboard(dataNode: DataNode) {
        this.storedDataNode = dataNode;
        console.log("put into clipboard: " + JSON.stringify(this.storedDataNode.getObjectAsJSON()));
    }

    public getDataNode() : DataNode {
        return this.storedDataNode;
    }

    private storedDataNode: DataNode;
    public static singleton = new Clipboard();
}