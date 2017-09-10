import {
    IUserEventAcceptor,
    IZoomOutHandler,
    VisualNode
} from "./Interfaces/interfaces";
import {Colors, getColorForChild} from "./ColorManagement";
import {NamedLink} from "../model/NamedLink";
import {DataNode} from "../model/Interfaces/DataNode";
import {ObActions} from "../model/observe";
import {VisualHeadBody} from "./VisualHeadBody";
import {EventManagerForNamedLink} from "./EventManagerForNamedLink";
import {FocusableTextField} from "./FocusableTextField";
import {SimpleDataNode} from "../model/SimpleDataNode";
import {SimpleVisualNode} from "./SimpleVisualNode";

export class NamedLinkVisualNode extends VisualHeadBody {

    public constructor(dataNode: NamedLink, backgroundColor: Colors) {
        super();
        this.dataNode = dataNode;
        this.backgroundColor = backgroundColor;
        let self = this;
        dataNode.register({
            notify(action: ObActions, object : DataNode, position : number) {
                self.dataNodeChanged(action, object, position);
            }
        });
        this.eventManager = new EventManagerForNamedLink(this, this);
        this.head = new FocusableTextField(this.getDataNode().getName(), backgroundColor, this.eventManager);
        this.head.setFontColor(Colors.Grey);
    }

    public getEventManager(): IUserEventAcceptor {
        return this.eventManager;
    }

    public setParentZoomOutHandler(parentZoomOutHandler: IZoomOutHandler) {
        this.eventManager.setParentZoomOutHandler(parentZoomOutHandler);
    }

    public getBackgroundColor(): Colors {
        return this.backgroundColor;
    }

    public createBody() {
        this.createRelatedVisualNode();
    }

    public bodyAvailable(): boolean {
        return this.dataNode.getTo() != null;
    }

    public getHead(): VisualNode {
        return this.head;
    }

    public getBody(): VisualNode {
        return this.relatedVisualNode;
    }

    public newChild() {
        console.log("not implemented");
    }

    private dataNodeChanged(action: ObActions, object: DataNode, position: number) {
    }

    public getDataNode() {
        return this.dataNode;
    }

    private getVisualNodeForDataNode(dataNode: DataNode): VisualNode {
        let visualNode : VisualNode;
        let backgroundColor = getColorForChild(this.backgroundColor);
        let parentZoomOutHandler = this.eventManager;
        if (dataNode instanceof SimpleDataNode) {
            visualNode = new SimpleVisualNode(dataNode, backgroundColor); // automatic cast (dataNode)
            visualNode.setParentZoomOutHandler(parentZoomOutHandler);
        } else {
            console.log("VisualNode not implemented");
        }
        return visualNode;
    }

    private configureRelatedVisualNode() {
        let self = this;
        this.relatedVisualNode.getCallbacks().onLeavesWithEnter(function () {
            self.getCallbacks().leavesWithEnter();
        });
    }

    // private deleteDataNode() {
    //     this.dataNode.deleteRelationship();
    // }

    private createRelatedVisualNode() {
        this.relatedVisualNode = this.getVisualNodeForDataNode(this.dataNode.getTo());
        this.configureRelatedVisualNode();
    }

    private dataNode: NamedLink;
    private backgroundColor: Colors;
    private relatedVisualNode : VisualNode;
    private head: FocusableTextField;
    private eventManager: EventManagerForNamedLink;
}
