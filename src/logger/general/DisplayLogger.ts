import {ILogger} from "./ILogger";
import {I_UIObject} from "./I_UIObject";
import {Utils} from "../visual/Utils";

export class DisplayLogger implements ILogger, I_UIObject{

    getUIObject() {
        return this.myDiv;
    }

    log(toLog: string) {
        let toLog_Div = Utils.getDiv();
        toLog_Div.style.borderBottom = "dotted";
        toLog_Div.innerHTML = toLog;
        this.myDiv.appendChild(toLog_Div);
    }

    private myDiv = Utils.getDiv();
}