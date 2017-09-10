import {I_DataNode_Generator} from "../../Interfaces/I_DataNode_Generator";
import {IMap} from "../../../general/Interfaces/IMap";
import {DataNode} from "../../Interfaces/DataNode";
import {PlaceholderRelationship} from "../../PlaceholderRelationship";
export class Placeholder_Generator implements I_DataNode_Generator{
    complete(provider: IMap<number, DataNode>) {
    }
    createStub(): DataNode {
        return new PlaceholderRelationship();
    }
    setJSON(json) {
    }
}