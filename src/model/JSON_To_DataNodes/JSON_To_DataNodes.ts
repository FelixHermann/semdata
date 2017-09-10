import {Generator_Provider} from "./Generator_Provider";
import {I_DataNode_Generator} from "../Interfaces/I_DataNode_Generator";
import {DataNode_Provider_OldID} from "./DataNode_Provider_OldID";
import {DataNode} from "../Interfaces/DataNode";
import {ID_Manager} from "../../general/ID_Manager";

export class JSON_To_DataNodes {

    constructor(listOfDataNodes, iDManager: ID_Manager<DataNode>) {
        this.generatorProvider = new Generator_Provider();
        this.iDManager = iDManager;
        this._iDMapper = new Map<number, number>();

        this.listOfDataNodes = listOfDataNodes;
        this.listOfGenerators = [];
    }

    createDataNodes() {
        for (let i = 0; i < this.listOfDataNodes.length; i++) {
            this.handle(this.listOfDataNodes[i]);
        }
        this._dataNodeProviderOldID = new DataNode_Provider_OldID(this.iDManager, this._iDMapper);
        for (let i = 0; i < this.listOfGenerators.length; i++) {
            this.listOfGenerators[i].complete(this._dataNodeProviderOldID);
        }
    }

    handle(jsonObject) {
        let generator = this.generatorProvider.get(jsonObject.classAttr);
        this.listOfGenerators.push(generator);

        generator.setJSON(jsonObject);
        let dataNode : DataNode = generator.createStub();
        let newID = this.iDManager.getNewID();
        this._iDMapper.set(jsonObject.dataNodeId, newID);
        dataNode.setDataNodeId(newID);
        this.iDManager.set(newID, dataNode);
    }

    get iDMapper(): Map<number, number> {
        return this._iDMapper;
    }


    get dataNodeProviderOldID(): DataNode_Provider_OldID {
        return this._dataNodeProviderOldID;
    }

    private listOfGenerators: Array<I_DataNode_Generator>;
    private _iDMapper : Map<number, number>;
    private generatorProvider : Generator_Provider;
    private iDManager: ID_Manager<DataNode>;
    private listOfDataNodes: Array<any>;
    private _dataNodeProviderOldID: DataNode_Provider_OldID;
}