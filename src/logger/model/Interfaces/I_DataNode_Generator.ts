import {IMap} from "../../general/Interfaces/IMap";
import {DataNode} from "./DataNode";

export interface I_DataNode_Generator {
    complete(provider: IMap<number, DataNode>);
    createStub(): DataNode;
    setJSON(json);
}
