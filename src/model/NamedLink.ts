import {Relationship, DataNode} from "./Interfaces/DataNode";
import {InverseNamedLink} from "./InverseNamedLink";
import {DataTypes} from "./DataTypes";
import {ORIGINAL_NAMED_LINK_TYP} from "./TypInformations";
import {setIDForDataNode} from "../App";
import {GenericObservable} from "../general/observe/GenericObservable";
import {Notifier} from "./Notifier";
import {GenericObActions} from "../general/observe/GenericObAction";
import {GenericObserver} from "../general/Interfaces/GenericObserver";

export interface NamedLink extends Relationship {
    getName(): string;
    getTo();
    setName(name: string);
    deleteRelationship();
    register(observer: GenericObserver<Notifier>);
    unregister(observer:  GenericObserver<Notifier>);
}

export class OriginalNamedLink extends GenericObservable<Notifier> implements NamedLink {
    getTypInformation(): string {
        return ORIGINAL_NAMED_LINK_TYP;
    }

    public constructor() {
        super();
    }

    public getDependencies() : Array<DataNode>{
        let list = [];
        list.push(this.from, this.to, this._inverseNamedLink);
        return list;
    }

    public static createInstance(name: string, from: DataNode,  to : DataNode): OriginalNamedLink {
        let instance = new OriginalNamedLink();
        instance.name = name;
        instance._inverseNamedLink = InverseNamedLink.createInstance(instance);
        instance.setFrom(from);
        instance.setTo(to);
        setIDForDataNode(instance);
        return instance;
    }

    public deleteRelationship() {
        this.from = null;
        this.to = null;
        this.name = null;
        this.onDeleteAttr.call(this);
        this._inverseNamedLink.originalNamedLinkHasBeenDeleted();
    }

    public onDelete(callback: Function) {
        this.onDeleteAttr = callback;
    }

    public getInverseNamedLink() {
        return this._inverseNamedLink;
    }

    public getType() {
        return DataTypes.NamedLinkType;
    }

    public getObjectAsJSON() {
        let jsonObject = {};
        jsonObject["dataNodeId"] = this.dataNodeId;
        jsonObject["name"] = this.name;
        jsonObject["classAttr"] = "OriginalNamedLink";
        jsonObject["inverseNamedLink"] = this._inverseNamedLink.getDataNodeId();
        jsonObject["to"] = this.to.getDataNodeId();
        jsonObject["from"] = this.from.getDataNodeId();
        return jsonObject;
    }

    public getName() {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
        this.notify(new Notifier(GenericObActions.changedText, null, null));
        this._inverseNamedLink.nameOfOriginalNamedLinkChanged();
    }

    public getTo() {
        return this.to;
    }

    public setFrom(from: DataNode) {
        // TODO eigentlich müsste zuvor der alte "Connector" geloescht werden
        this.from = from;
        // this.notify("setFrom", from, -1);
    }

    public setTo(to: DataNode) {
        // TODO eigentlich müsste zuvor der alte "Connector" geloescht werden
        this.to = to;
        // this.notify("setTo", to, -1);
    }

    public getFrom() {
        return this.from;
    }

    public getDataNodeId(): number {
        return this.dataNodeId;
    }

    public setDataNodeId(id: number) {
        this.dataNodeId = id;
    }


    set inverseNamedLink(value: InverseNamedLink) {
        this._inverseNamedLink = value;
    }

    private onDeleteAttr : Function;
    private dataNodeId: number;
    private name: string;
    private to: DataNode;
    private from: DataNode;
    private _inverseNamedLink: InverseNamedLink;
}