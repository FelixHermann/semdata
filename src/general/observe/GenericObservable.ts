import {GenericObserver} from "../Interfaces/GenericObserver";
export class GenericObservable<NotifyObjectType> {
    register(observer: GenericObserver<NotifyObjectType>): void {
        this.observers.push(observer);
    }

    unregister(observer: GenericObserver<NotifyObjectType>): void {
        var n: number = this.observers.indexOf(observer);
        this.observers.splice(n, 1);
    }

    notify(notifyObject: NotifyObjectType): void {
        var i: number, max: number;
        for (i = 0, max = this.observers.length; i < max; i += 1) {
            this.observers[i].notify(notifyObject);
        }
    }

    private observers: GenericObserver<NotifyObjectType>[] = [];
}
