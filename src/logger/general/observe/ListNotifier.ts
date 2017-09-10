import {GenericObActions} from "./GenericObAction";
export class ListNotifier<T> {
    action: GenericObActions;
    position: number;
    object: T;
}