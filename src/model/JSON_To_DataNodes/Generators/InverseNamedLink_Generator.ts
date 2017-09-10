import {I_DataNode_Generator} from "../../Interfaces/I_DataNode_Generator";
import {IMap} from "../../../general/Interfaces/IMap";
import {DataNode} from "../../Interfaces/DataNode";
import {OriginalNamedLink} from "../../NamedLink";
import {InverseNamedLink} from "../../InverseNamedLink";

export class InverseNamedLink_Generator implements I_DataNode_Generator {

    complete(provider: IMap<number, DataNode>) {
        this.inverseNamedLink.originalNamedLink = <OriginalNamedLink> provider.get(this.json.originalNamedLink);
    }

    createStub(): DataNode {
        this.inverseNamedLink = new InverseNamedLink(null);
        return this.inverseNamedLink;
    }

    setJSON(json) {
        this.json = json;
    }

    private json;
    private inverseNamedLink: InverseNamedLink;
}