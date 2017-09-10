import {I_DataNode_Generator} from "../../Interfaces/I_DataNode_Generator";
import {IMap} from "../../../general/Interfaces/IMap";
import {DataNode, Relationship} from "../../Interfaces/DataNode";
import {SimpleDataNode} from "../../SimpleDataNode";

export class SimpleDataNode_Generator implements I_DataNode_Generator{

    complete(provider: IMap<number, DataNode>) {
        let relationshipsJSON = this.json.relationships;
        for (let i = 0; i < relationshipsJSON.length; i++) {
            let currentID = <number> relationshipsJSON[i];
            let currentRelationship : Relationship = <Relationship> provider.get(currentID);
            this.simpleDataNode.addRelationshipAtPosition(currentRelationship, i);
        }
        if (this.json.standardExpanded == "true") {
            this.simpleDataNode.standard_expanded = true;
        }
    }

    createStub(): DataNode {
        this.simpleDataNode = new SimpleDataNode(this.json.name);
        return this.simpleDataNode;
    }

    setJSON(json) {
        this.json = json;
    }

    private json;
    private simpleDataNode: SimpleDataNode;
}