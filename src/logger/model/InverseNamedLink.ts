import {OriginalNamedLink, NamedLink} from "./NamedLink";
import {DataTypes} from "./DataTypes";
import {Observable, ObActions} from "./observe";
import {DataNode} from "./Interfaces/DataNode";
import {INVERSE_NAMED_LINK_TYP} from "./TypInformations";
import {setIDForDataNode} from "../App";

export class InverseNamedLink extends Observable implements NamedLink {
    getTypInformation(): string {
        return INVERSE_NAMED_LINK_TYP;
    }

    public constructor(concreteNamedLink: OriginalNamedLink) {
        super();
        this._originalNamedLink = concreteNamedLink;
    }

    public getDependencies() : Array<DataNode>{
        // TODO
        let list = [];
        return list;
    }

    public originalNamedLinkHasBeenDeleted() {
        this.nameOfThisInverseNamedLink = "*this link has been deleted*";
        this.onDeleteAttr.call(this);
    }

    public deleteRelationship() {
        this._originalNamedLink.deleteRelationship();
    }

    public onDelete(callback: Function) {
        this.onDeleteAttr = callback;
    }

    public getName() : string{
        if (this.hasOwnName) {
            return this.nameOfThisInverseNamedLink;
        } else {
            let inverseName : string;
            inverseName = this._originalNamedLink.getName() + "-inverse";
            return inverseName;
        }
    }

    public getTo() {
        return this._originalNamedLink.getFrom();
    }

    public setName(name: string) {
        this.nameOfThisInverseNamedLink = name;
        this.hasOwnName = true;
        this.notify(ObActions.ChangedName, null, null);
    }

    public getObjectAsJSON() {
        let jsonObject = {};
        jsonObject["dataNodeId"] = this.dataNodeId;
        jsonObject["classAttr"] = "InverseNamedLink";
        jsonObject["originalNamedLink"] = this._originalNamedLink.getDataNodeId();
        return jsonObject;
    }

    public static createInstance(concreteNamedLink: OriginalNamedLink) : InverseNamedLink {
        let instance = new InverseNamedLink(concreteNamedLink);
        setIDForDataNode(instance);
        return instance;
    }

    public getDataNodeId(): number {
        return this.dataNodeId;
    }

    public setDataNodeId(id: number) {
        this.dataNodeId = id;
    }

    public getType() {
        return DataTypes.NamedLinkType;
    }

    public nameOfOriginalNamedLinkChanged() {
        if (this.hasOwnName) {
            // do nothing ...
        } else {
            this.notify(ObActions.ChangedName, null, null);
        }
    }

    set originalNamedLink(value: OriginalNamedLink) {
        this._originalNamedLink = value;
    }

    private dataNodeId: number;
    private nameOfThisInverseNamedLink: string;
    private hasOwnName: boolean = false;
    private _originalNamedLink: OriginalNamedLink;
    private onDeleteAttr : Function;
}