import {DataNode} from "../Interfaces/DataNode";
import {IMap} from "../../general/Interfaces/IMap";
import {ID_Manager} from "../../general/ID_Manager";

export class DataNode_Provider_OldID implements IMap<number, DataNode> {

    constructor(idManager: ID_Manager<DataNode>, idMapper: Map<number, number>) {
        this._idManager = idManager;
        this._idMapper = idMapper;
    }

    get(key: number): DataNode {
        if (this._idMapper.has(key)) {
            let newKey = this._idMapper.get(key);
            if (this._idManager.has(newKey)) {
                return this._idManager.get(newKey);
            } else {
                console.log("error, DataNode_Provider_OldID, dataNode does not exist")
            }
        } else {
            console.log("error, DataNode_Provider_OldID, newKey does not exist")
        }
        return null;
    }

    set(key: number, value: DataNode) {
        throw new Error("Method not implemented.");
    }

    delete(key: number) {
        throw new Error("Method not implemented.");
    }

    keys() {
        return this._idMapper.keys();
    }


    private _idManager: ID_Manager<DataNode>;
    private _idMapper: Map<number, number>;
}