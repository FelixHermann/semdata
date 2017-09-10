import {DataNode, Relationship} from "./Interfaces/DataNode";
import {setIDForDataNode} from "../App";

export class PlaceholderRelationship implements Relationship {
    getTypInformation(): string {
        return undefined;
    }

    public onDelete(callback: Function) {
        this.onDeleteAttr = callback;
    }


    public getDependencies() : Array<DataNode>{
        let list = [];
        return list;
    }

    public static createInstance() : PlaceholderRelationship {
        let instance = new PlaceholderRelationship();
        setIDForDataNode(instance);
        return instance;
    }

    public delete() {
        this.onDeleteAttr.call(this);
    }


    public getDataNodeId(): number {
        return this.dataNodeId;
    }

    public setDataNodeId(id: number) {
        this.dataNodeId = id;
    }

    public getType() {
    }

    public getObjectAsJSON() {
        let jsonObject = {};
        jsonObject["dataNodeId"] = this.dataNodeId;
        jsonObject["classAttr"] = "PlaceholderRelationship";
        return jsonObject;
    }

    public getName() {
        console.log("getName() not implemented");
    }

    private dataNodeId: number;

    private onDeleteAttr: Function;
}