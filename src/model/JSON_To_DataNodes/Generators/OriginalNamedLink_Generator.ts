import {I_DataNode_Generator} from "../../Interfaces/I_DataNode_Generator";
import {IMap} from "../../../general/Interfaces/IMap";
import {DataNode} from "../../Interfaces/DataNode";
import {OriginalNamedLink} from "../../NamedLink";
import {InverseNamedLink} from "../../InverseNamedLink";
export class OriginalNamedLink_Generator implements I_DataNode_Generator {

    complete(provider: IMap<number, DataNode>) {
        this.originalNamedLink.setFrom(provider.get(this.json.from));
        this.originalNamedLink.setTo(provider.get(this.json.to));
        let key = this.json.inverseNamedLink;
        this.originalNamedLink.inverseNamedLink = <InverseNamedLink> provider.get(key);
        this.originalNamedLink.setName(this.json.name);
    }

    createStub(): DataNode {
        this.originalNamedLink = new OriginalNamedLink();
        return this.originalNamedLink;
    }

    setJSON(json) {
        this.json = json;
    }

    private json;
    private originalNamedLink: OriginalNamedLink;

}