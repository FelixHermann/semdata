import {GenericObservable} from "./general/observe/GenericObservable";
import {GenericObActions} from "./general/observe/GenericObAction";
export class Window extends GenericObservable<GenericObActions> {
    static singleton = new Window();

    setTitle(title: string) {
        document.title = title;
    }

    constructor() {
        super();
        let self = this;
        window.addEventListener("resize", function () {
            self.notify(null); // at the moment only resizing
        });
    }
}