import {NoNotifyObjectType_Observable} from "./NoNotifyObjectType_Observable";
export class Observable_String_Data extends NoNotifyObjectType_Observable {

    set(toSet: string) {
        this.myString = toSet;
        this.notify();
    }

    get() : string {
        return this.myString;
    }

    private myString : string;
}