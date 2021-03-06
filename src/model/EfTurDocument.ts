import {ID_Manager} from "../general/ID_Manager";
import {DataNode} from "./Interfaces/DataNode";
import {NoNotifyObjectType_Observable} from "../general/observe/NoNotifyObjectType_Observable";
export class EfTurDocument extends NoNotifyObjectType_Observable{

    public static singleton : EfTurDocument = new EfTurDocument();

    constructor() {
        super();
        this._idManager = new ID_Manager<DataNode>();
    }

    get idManager(): ID_Manager<DataNode> {
        return this._idManager;
    }

    get rootNode(): DataNode {
        return this._rootNode;
    }

    set rootNode(value: DataNode) {
        this._rootNode = value;
        this.notify();
    }

    resetDocument() {
        this._idManager = new ID_Manager<DataNode>();
    }

    private _idManager : ID_Manager<DataNode>;
    private _rootNode: DataNode;
}