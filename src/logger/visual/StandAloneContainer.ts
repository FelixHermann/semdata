import {I_EfTurContainer} from "./Interfaces/I_EfTurContainer";
import {Utils} from "./Utils";
export class StandAloneContainer implements I_EfTurContainer {
    setContent(content) {
        this.content = content;
    }

    removeContent() {
        throw new Error("not implemented");
    }

    getUIObject() {
        this.myDiv = this.content.getUIObject();
        return this.myDiv;
    }

    setMaxWidth(maxWidth: number) {
        console.log("setMaxWidth, StandAloneContainer");
        this.content.setMaxWidth(maxWidth);
    }

    private content;
    private myDiv = Utils.getDiv();
}