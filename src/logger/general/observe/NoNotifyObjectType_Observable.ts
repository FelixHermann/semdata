import {GenericObservable} from "./GenericObservable";
export class NoNotifyObjectType_Observable extends GenericObservable<object> {
    notify() {
        super.notify(null);
    }
}
