import {DataNode} from "./Interfaces/DataNode";
import {Set} from "../general/Set";
import {JSON_To_DataNodes} from "./JSON_To_DataNodes/JSON_To_DataNodes";
import {IMap} from "../general/Interfaces/IMap";
import {getAllDataNodes} from "../App";
import {EfTurDocument} from "./EfTurDocument";

export function getJSONObjectWithAllDataNodes() {
    let listOfAllDataNodes : Array<DataNode> = getAllDataNodes();

    return listOfDataNodes_To_JSON(listOfAllDataNodes);
}

function listOfDataNodes_To_JSON(dataNodes: Array<DataNode>) {
    let list = [];
    for (let i = 0; i < dataNodes.length; i++) {
        list.push(dataNodes[i].getObjectAsJSON());
    }
    return list;
}

export function getExportAsJson_Object(dataNode: DataNode) {
    let dependencies: Array<DataNode> = getAllDependencies(dataNode);
    let jsonObject = {};
    jsonObject["rootNode"] = dataNode.getDataNodeId();
    jsonObject["listOfAllDataNodes"] = listOfDataNodes_To_JSON(dependencies);
    return jsonObject;
}

function getAllDependencies(dataNode: DataNode) : Array<DataNode> {
    visited = new Set<DataNode>();
    todos = [];
    dependencies = [];
    todos.push(dataNode);
    workTodoList();
    return dependencies;
}

function workTodoList() {
    let currentDataNode: DataNode;
    while(todos.length > 0) {
        currentDataNode = todos.pop();
        if (!visited.has(currentDataNode)) {
            visit(currentDataNode);
        }
    }
}

function visit(dataNode: DataNode) {
    visited.push(dataNode);
    dependencies.push(dataNode);
    let dependenciesOfDataNode = dataNode.getDependencies();
    for (let i = 0; i < dependenciesOfDataNode.length; i++) {
        let currentDependency = dependenciesOfDataNode[i];
        todos.push(currentDependency);
    }
}

export function getExportAsJson() {
    let jsonObject = {};
    jsonObject["rootNode"] = EfTurDocument.singleton.rootNode.getDataNodeId();
    jsonObject["listOfAllDataNodes"] = getJSONObjectWithAllDataNodes();
    return jsonObject;
}

export function getDataNodes(jsonObject) {

    EfTurDocument.singleton.resetDocument();

    let rootNode = jsonObject["rootNode"];
    let listOfAllDataNodes_JSON = jsonObject["listOfAllDataNodes"];

    let jsonToDataNodes = new JSON_To_DataNodes(listOfAllDataNodes_JSON, EfTurDocument.singleton.idManager);

    jsonToDataNodes.createDataNodes();

    let dataNodeProvider: IMap<number, DataNode> = jsonToDataNodes.dataNodeProviderOldID;


    EfTurDocument.singleton.rootNode = dataNodeProvider.get(rootNode);
}

let visited: Set<DataNode>;
let todos: Array<DataNode>;
let dependencies: Array<DataNode>;