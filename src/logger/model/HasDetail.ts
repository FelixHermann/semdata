import {DataNode, Relationship} from "./Interfaces/DataNode";
import {Observer} from "./observe";
import {HasDetail_TYP} from "./TypInformations";
import {ID_MANAGER, setIDForDataNode} from "../App";
export class HasDetail implements Relationship {

    getTypInformation(): string {
        return HasDetail_TYP;
    }

    public register(observer: Observer) {
    }

    public unregister(observer: Observer) {
    }

    public constructor(subject: DataNode, object: DataNode) {
        this.subject = subject;
        this.object = object;
    }

    public getDependencies() : Array<DataNode>{
        let list = [];
        list.push(this.object, this.subject);
        return list;
    }

    public static createInstance(subject: DataNode, object: DataNode) : HasDetail {
        let instance = new HasDetail(subject, object);
        setIDForDataNode(instance);
        return instance
    }

    public delete() {
        this.subject = null;
        this.object = null;
        this.onDeleteAttr.call(this);
    }

    public onDelete(callback: Function) {
        this.onDeleteAttr = callback;
    }

    public getSubject() {
        return this.subject;
    }
    public getObject() {
        return this.object;
    }

    public getDataNodeId(): number {
        return this.dataNodeId;
    }

    public getType() {
        // not used here
    }

    public getObjectAsJSON() {
        let jsonObject = {};
        jsonObject["dataNodeId"] = this.dataNodeId;
        jsonObject["classAttr"] = "HasDetail";
        jsonObject["from"] = this.subject.getDataNodeId();
        jsonObject["to"] = this.object.getDataNodeId();
        return jsonObject;
    }

    public setDataNodeId(id: number) {
        this.dataNodeId = id;
    }

    setSubject(subject: DataNode) {
        this.subject = subject;
    }

    setObject(object: DataNode) {
        this.object = object;
    }

    private dataNodeId: number;
    private subject : DataNode;
    private object: DataNode;
    private onDeleteAttr : Function;
}