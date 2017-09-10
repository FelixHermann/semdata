import {DataNode} from "./Interfaces/DataNode";

export interface Observer {
    notify(action: ObActions, object : DataNode, position : number): void;
}

export enum ObActions {
    ChangedName,
    RemovedRelationship,
    AddedRelationship,
    ReplacedRelationship,
}

export class Observable {

    public register(observer: Observer): void {
        this.observers.push(observer);
    }

    public unregister(observer: Observer): void {
        var n: number = this.observers.indexOf(observer);
        this.observers.splice(n, 1);
    }

    public notify(action: ObActions, object : DataNode, position : number): void {
        var i: number, max: number;
        for (i = 0, max = this.observers.length; i < max; i += 1) {
            this.observers[i].notify(action, object, position);
        }
    }

    private observers: Observer[] = [];
}