import {
    HasDetail_TYP, INVERSE_NAMED_LINK_TYP, ORIGINAL_NAMED_LINK_TYP, PLACEHOLDER_TYP,
    SIMPLE_DATA_NODE_TYP
} from "../TypInformations";
import {SimpleDataNode_Generator} from "./Generators/SimpleDataNode_Generator";
import {I_DataNode_Generator} from "../Interfaces/I_DataNode_Generator";
import {IMap} from "../../general/Interfaces/IMap";
import {HasDetail_Generator} from "./Generators/HasDetail_Generator";
import {OriginalNamedLink_Generator} from "./Generators/OriginalNamedLink_Generator";
import {InverseNamedLink_Generator} from "./Generators/InverseNamedLink_Generator";
import {Placeholder_Generator} from "./Generators/Placeholder_Generator";
export class Generator_Provider {
    constructor() {
        this.generatorProvider = new Map<string, Function>();
        this.generatorProvider.set(SIMPLE_DATA_NODE_TYP, function () {
            return new SimpleDataNode_Generator();
        });
        this.generatorProvider.set(HasDetail_TYP, function () {
            return new HasDetail_Generator();
        });
        this.generatorProvider.set(ORIGINAL_NAMED_LINK_TYP, function () {
            return new OriginalNamedLink_Generator();
        });
        this.generatorProvider.set(INVERSE_NAMED_LINK_TYP, function () {
            return new InverseNamedLink_Generator();
        });
        this.generatorProvider.set(PLACEHOLDER_TYP, function () {
            return new Placeholder_Generator();
        });
    }

    get(typInformation: string) : I_DataNode_Generator {
        return this.generatorProvider.get(typInformation)();
    }

    private generatorProvider : IMap<string, Function>;
}