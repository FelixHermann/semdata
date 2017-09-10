import {GenericObservable} from "./general/observe/GenericObservable";
import {GenericObActions} from "./general/observe/GenericObAction";
import {LOGGER} from "./loadApp";
export class WindowManager extends GenericObservable<GenericObActions> {
    static singleton = new WindowManager();

    setTitle(title: string) {
        LOGGER.log("setTitle");
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