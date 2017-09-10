import {DataNode, Relationship} from "./Interfaces/DataNode";
import {HasDetail} from "./HasDetail";
import {setIDForDataNode} from "../App";
import {GenericObservable} from "../general/observe/GenericObservable";
import {Notifier} from "./Notifier";
import {GenericObActions} from "../general/observe/GenericObAction";

export class SimpleDataNode extends GenericObservable<Notifier> implements DataNode {


    public constructor(name: string) {
        super();
        this.name = name;
    }

    get standard_expanded(): boolean {
        return this._standard_expanded;
    }

    set standard_expanded(value: boolean) {
        this._standard_expanded = value;
    }

    getTypInformation(): string {
        throw new Error("Method not implemented.");
    }

    public static createInstance(name: string) : SimpleDataNode {
        let instance = new SimpleDataNode(name);
        setIDForDataNode(instance);
        return instance;
    }

    public static createHasDetailAndSetConnector(from: SimpleDataNode, to: DataNode) {
        let rel = HasDetail.createInstance(from, to);
        from.addRelationship(rel);
    }

    public setDataNodeId(id: number) {
        this.dataNodeId = id;
    }

    public getDataNodeId(): number {
        return this.dataNodeId;
    }

    private configureRelationship(relationship: Relationship) {
        let self = this;
        relationship.onDelete(function () {
            self.deleteRelationship(relationship);
        });
    }

    public getDependencies() : Array<DataNode>{
        return this.relationships;
    }

    public deleteRelationship(relationship: Relationship) {
        let index = this.relationships.indexOf(relationship);
        this.relationships.splice(index, 1);
        this.notify(new Notifier(GenericObActions.RemovedObject, relationship, index));
    }

    public getObjectAsJSON() {
        var jsonObject = {};
        jsonObject["dataNodeId"] = this.dataNodeId;
        jsonObject["name"] = this.name;
        jsonObject["classAttr"] = "SimpleDataNode";
        var jsonRelationshipsList = [];
        for (var i = 0; i < this.relationships.length; i++) {
            jsonRelationshipsList[i] = this.relationships[i].getDataNodeId();
        }
        jsonObject["relationships"] = jsonRelationshipsList;
        jsonObject["standardExpanded"] = "" + this._standard_expanded + "";
        return jsonObject;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
        this.notify(new Notifier(GenericObActions.changedText , null, null));
    }

    public addRelationshipAtPosition(toAdd: Relationship, position: number) {
        this.relationships.splice(position, 0, toAdd);
        this.configureRelationship(toAdd);
        this.notify(new Notifier(GenericObActions.AddedObject, toAdd, position));
    }

    public replaceRelationshipAtPosition(newRelationship: Relationship, position: number) {
        this.relationships.splice(position, 1, newRelationship);
        this.configureRelationship(newRelationship);
        this.notify(new Notifier(GenericObActions.ReplacedObject, newRelationship, position));
    }

    public addRelationship(relationship: Relationship) {
        this.relationships.push(relationship);
        this.configureRelationship(relationship);
        this.notify(new Notifier(GenericObActions.AddedObject, relationship, this.relationships.length - 1));
    }

    public getRelationships() {
        return this.relationships;
    }

    public getType() {
        // not used here
    }

    private dataNodeId: number;
    private name: string;
    private relationships: Array<Relationship> = [];


    private _standard_expanded = false;
}