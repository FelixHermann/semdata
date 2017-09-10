import {IGroupLogger} from "./IGroupLogger";
import {SimpleDataNode} from "../model/SimpleDataNode";
import {SimpleVisualNode} from "../visual/SimpleVisualNode";
import {Utils} from "../visual/Utils";
export class EfTur_GroupLogger implements IGroupLogger {

    constructor() {
        this.stack.push(SimpleDataNode.createInstance("EfTur-Logging-Objects"));
    }

    startGroup(groupName: string) {
        console.log("start group, " + groupName);

        let superordinateGroup = this.getTopOfStack();
        let newGroup = SimpleDataNode.createInstance(groupName);
        SimpleDataNode.createHasDetailAndSetConnector(superordinateGroup, newGroup);
        this.stack.push(newGroup);
    }

    endGroup(groupName: string) {
        console.log("end group, " + groupName);

        if (groupName == this.getTopOfStack().getName()) {
            this.stack.pop();
        } else {
            throw new Error("groupName seems to be wrong");
        }
    }

    log(message: string) {
        console.log("log, " + message);

        let superordinateGroup = this.getTopOfStack();
        let message_DataNode = SimpleDataNode.createInstance(message);
        SimpleDataNode.createHasDetailAndSetConnector(superordinateGroup, message_DataNode);
    }

    getUIObject() {
        console.log("getUIObject, EfTur_GroupLogger");

        let simpleDataNode = this.stack[0];
        this.visualRootNode = new SimpleVisualNode(simpleDataNode, 0);
        let uiObject = this.visualRootNode.getUIObject();
        this.myDiv.appendChild(uiObject);
        return this.myDiv;
    }

    setMaxWidth(maxWidth: number) {
        console.log("setMaxWidth, " + this.visualRootNode);

        if (this.visualRootNode != null) {
            this.visualRootNode.setMaxWidth(maxWidth);
        }
    }

    private getTopOfStack() {
        return this.stack[this.stack.length - 1];
    }

    private stack : Array<SimpleDataNode> = [];
    private myDiv = Utils.getDiv();
    private visualRootNode: SimpleVisualNode = null;
}