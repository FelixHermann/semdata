import {DataNode} from "./model/Interfaces/DataNode";
import {EfTurDocument} from "./model/EfTurDocument";

export function setIDForDataNode(dataNode: DataNode) {
    let tmpID = EfTurDocument.singleton.idManager.getNewID();
    dataNode.setDataNodeId(tmpID);
    EfTurDocument.singleton.idManager.set(tmpID, dataNode);
}

export function getAllDataNodes(): Array<DataNode> {
    let list : Array<DataNode> = [];

    let dataNodes = EfTurDocument.singleton.idManager.values();
    let currentDataNode_Wrapper = dataNodes.next();

    while (currentDataNode_Wrapper.done != true) {
        list.push(currentDataNode_Wrapper.value);
        currentDataNode_Wrapper = dataNodes.next();
    }

    return list;
}
