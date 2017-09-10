import {I_EfTurContainer} from "./Interfaces/I_EfTurContainer";
import {Utils} from "./Utils";
import {LOGGER} from "../loadApp";
export class StandAloneContainer implements I_EfTurContainer {
    setContent(content) {
        this.content = content;
        Utils.removeAllChildren(this.myDiv);
        this.myDiv.appendChild(this.content.getUIObject());
        this.content.setMaxWidth(this.width);
    }

    removeContent() {
        throw new Error("not implemented");
    }

    getUIObject() {
        return this.myDiv;
    }

    setWidth(maxWidth: number) {
        LOGGER.log("setWidth, StandAloneContainer");
        this.width = maxWidth;
        if (this.content != null) {
            this.content.setMaxWidth(maxWidth);
        }
    }

    private content;
    private myDiv = Utils.getDiv();
    private width: number;
}