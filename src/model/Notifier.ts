import {GenericObActions} from "../general/observe/GenericObAction";
import {DataNode} from "./Interfaces/DataNode";
export class Notifier {

    constructor(action: GenericObActions, object: DataNode, position: number) {
        this.action = action;
        this.position = position;
        this.object = object;
    }

    action: GenericObActions;
    position: number;
    object: DataNode;
}