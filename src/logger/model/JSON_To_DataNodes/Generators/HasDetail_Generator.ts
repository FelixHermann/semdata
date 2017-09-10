import {I_DataNode_Generator} from "../../Interfaces/I_DataNode_Generator";
import {IMap} from "../../../general/Interfaces/IMap";
import {DataNode} from "../../Interfaces/DataNode";
import {HasDetail} from "../../HasDetail";
export class HasDetail_Generator implements I_DataNode_Generator{
    complete(provider: IMap<number, DataNode>) {
        this.hasDetailNode.setSubject(provider.get(this.json.from));
        this.hasDetailNode.setObject(provider.get(this.json.to));
    }

    createStub(): DataNode {
        this.hasDetailNode = new HasDetail(null, null);
        return this.hasDetailNode;
    }

    setJSON(json) {
        this.json = json;
    }

    private json;
    private hasDetailNode: HasDetail;
}