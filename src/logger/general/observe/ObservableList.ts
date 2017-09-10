import {List} from "../List";
import {GenericObservable} from "./GenericObservable";
import {ListNotifier} from "./ListNotifier";
import {GenericObActions} from "./GenericObAction";

export class ObservableList<T> extends GenericObservable<ListNotifier<T>> {

    constructor() {
        super();
        this.list = new List<T>();
    }

    // It is allowed that position == length. (that means toInsert is appended to the list)
    public insert(toInsert: T, position: number) {
        this.list.insert(toInsert, position);

        let notifyObject: ListNotifier<T> = new ListNotifier<T>();
        notifyObject.position = position;
        notifyObject.object = toInsert;
        notifyObject.action = GenericObActions.AddedObject;

        this.notify(notifyObject);
    }

    public remove(position: number) {
        this.list.remove(position);

        let notifyObject: ListNotifier<T> = new ListNotifier<T>();
        notifyObject.position = position;
        notifyObject.object = null;
        notifyObject.action = GenericObActions.RemovedObject;

        this.notify(notifyObject);
    }

    public get(position: number) {
        return this.list.get(position);
    }

    public getIndex(object: T): number {
        return this.list.getIndex(object);
    }

    public getNext(object: T) {
        return this.list.getNext(object);
    }

    public getPrevious(object: T) {
        return this.list.getPrevious(object);
    }

    public getLength(): number {
        return this.list.getLength();
    }

    private list : List<T>;
}