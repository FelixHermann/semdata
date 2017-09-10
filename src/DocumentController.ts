import {I_EfTurContainer} from "./visual/Interfaces/I_EfTurContainer";
import {LOGGER} from "./loadApp";
import {EfTurDocument} from "./model/EfTurDocument";
import {StandAloneContainer} from "./visual/StandAloneContainer";
import {JSON_To_DataNodes} from "./model/JSON_To_DataNodes/JSON_To_DataNodes";
import {IMap} from "./general/Interfaces/IMap";
import {DataNode} from "./model/Interfaces/DataNode";
import {SimpleDataNode} from "./model/SimpleDataNode";
import {SimpleVisualNode} from "./visual/SimpleVisualNode";
import {MAX_WIDTH_OF_NODE_VIEW} from "./visual/general";
import {Configuration} from "./Configuration";
export class DocumentController {

    constructor() {
        LOGGER.log("constructor DocumentController");
        this.container = new StandAloneContainer();
        let self = this;
        EfTurDocument.singleton.register({
            notify() {
                LOGGER.startGroup("notify, DocumentController");
                self.refresh_VisualRootNode();
                LOGGER.endGroup("notify, DocumentController");
            }
        });
    }

    private refresh_VisualRootNode() {
        LOGGER.startGroup("refresh");
        let simpleDataNode = <SimpleDataNode> EfTurDocument.singleton.rootNode;

        this._visualRootNode = new SimpleVisualNode(simpleDataNode, 0);
        this.container.setContent(this._visualRootNode);

        this._visualRootNode.takeCursorFromTop();
        this._visualRootNode.zoomIn();

        if (Configuration.singleton.isWebsite()) {
            let simpleDataNode: SimpleDataNode = <SimpleDataNode> EfTurDocument.singleton.rootNode;
            let visualRootNode: SimpleVisualNode = <SimpleVisualNode> this._visualRootNode;
            let actualVisualNode = visualRootNode.getRelationshipsController().getVisualNodeAtPosition(1);
            actualVisualNode.zoomIn();
        }

        LOGGER.endGroup("refresh");
    }

    setJSON(jsonObject) {
        LOGGER.startGroup("setJSON");
        this.createDocument(jsonObject);
        LOGGER.endGroup("setJSON");
    }

    refreshRepresentation() {
        LOGGER.startGroup("refreshRepresentation");
        this.refresh_VisualRootNode();
        LOGGER.endGroup("refreshRepresentation");
    }

    getRepresentation() : I_EfTurContainer {
        LOGGER.log("getRepresentation");
        return this.container;
    }

    get visualRootNode() {
        return this._visualRootNode;
    }

    private createDocument(jsonObject) {
        LOGGER.startGroup("createDocument");
        EfTurDocument.singleton.resetDocument();
        let jsonToDataNodes = new JSON_To_DataNodes(jsonObject.listOfAllDataNodes,
            EfTurDocument.singleton.idManager);
        jsonToDataNodes.createDataNodes();
        let dataNodeProvider: IMap<number, DataNode> = jsonToDataNodes.dataNodeProviderOldID;
        EfTurDocument.singleton.rootNode = dataNodeProvider.get(jsonObject.rootNode);
        LOGGER.endGroup("createDocument");
    }

    private container;
    private _visualRootNode;
}