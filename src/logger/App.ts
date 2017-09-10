import {ID_Manager} from "./general/ID_Manager";
import {DataNode} from "./model/Interfaces/DataNode";
export var ID_MANAGER : ID_Manager<DataNode> = new ID_Manager<DataNode>();

export function resetID_Manager() {
    ID_MANAGER = new ID_Manager<DataNode>();
}

export function setIDForDataNode(dataNode: DataNode) {
    let tmpID = ID_MANAGER.getNewID();
    dataNode.setDataNodeId(tmpID);
    ID_MANAGER.set(tmpID, dataNode);
}

export function getRootNode() {
    return rootNode;
}

export function setRootNode(dataNode: DataNode) {
    rootNode = dataNode;
}

export function getAllDataNodes(): Array<DataNode> {
    let list : Array<DataNode> = [];

    let dataNodes = ID_MANAGER.values();
    let currentDataNode_Wrapper = dataNodes.next();

    while (currentDataNode_Wrapper.done != true) {
        list.push(currentDataNode_Wrapper.value);
        currentDataNode_Wrapper = dataNodes.next();
    }

    return list;
}


let rootNode : DataNode;
