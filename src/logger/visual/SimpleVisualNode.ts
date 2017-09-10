import {DataNode} from "../model/Interfaces/DataNode";
import {IUserEventAcceptor, IZoomOutHandler, VisualNode} from "./Interfaces/interfaces";
import {SimpleDataNode} from "../model/SimpleDataNode";
import {Colors, getColorForChild} from "./ColorManagement";
import {FocusableTextField} from "./FocusableTextField";
import {ListController} from "./ListController";
import {PlaceholderRelationship} from "../model/PlaceholderRelationship";
import {CreateRelationship} from "./CreateRelationship";
import {HasDetail} from "../model/HasDetail";
import {ObActions} from "../model/observe";
import {VisualHeadBody} from "./VisualHeadBody";
import {EventManagerForSimpleVisualNode} from "./EventManagerForSimpleVisualNode";
import {NamedLink} from "../model/NamedLink";
import {DataTypes} from "../model/DataTypes";
import {NamedLinkVisualNode} from "./NamedLinkVisualNode";

export class SimpleVisualNode extends VisualHeadBody implements VisualNode {

    public constructor(dataNode: SimpleDataNode, backgroundColor: Colors) {
        super();
        this.dataNode = dataNode;
        this.backgroundColor = backgroundColor;
        let self = this;
        this.dataNode.register({
            notify(action: ObActions, object : DataNode, position : number) {
                self.dataNodeChanged(action, object, position);
            }
        });

        this.eventManager = new EventManagerForSimpleVisualNode(this, this);


        this.head = new FocusableTextField(this.dataNode.getName(), this.backgroundColor, this.eventManager);


        this.configureTextField();
    }


    private configureTextField() {
        let self = this;
        this.head.onTextChange(function () {
            // update simpleDataNode
            self.textFieldChanged();
        });
    }

    public getRelationshipsController() : ListController {
        return this.relationshipsController;
    }

    public setParentZoomOutHandler(parentZoomOutHandler: IZoomOutHandler) {
        this.eventManager.setParentZoomOutHandler(parentZoomOutHandler);
    }

    public getHead(): VisualNode {
        return this.head;
    }

    public getBody(): VisualNode {
        if (this.relationshipsController == null) {
            this.createBody(this.getMaxWidth());
        }
        return this.relationshipsController;
    }

    public createBody(maxWidth: number) {
        this.createRelationshipController(maxWidth);
    }

    private createRelationshipController(maxWidth: number) {
        let relationships : Array<VisualNode> = [];

        for (var i = 0; i < this.dataNode.getRelationships().length; i++) {
            let currentRelationship = this.dataNode.getRelationships()[i];
            let visualRelationship: VisualNode = this.getVisualNodeForDataNode(currentRelationship);
            relationships[i] = visualRelationship;
        }
        this.relationshipsController = new ListController(relationships, maxWidth);
        this.configureRelationshipsController();
    }

    private deleteRelationshipController() {
        this.hideBody();
    }

    public bodyAvailable(): boolean {
        return this.dataNode.getRelationships().length > 0;
    }

    public newChild() {
        this.dataNode.addRelationshipAtPosition(PlaceholderRelationship.createInstance(), 0);
        if (!this.bodyIsVisible()) {
            this.zoomIn();
        }
        this.relationshipsController.takeCursorFromTop();
    }

    private configureRelationshipsController() {
        let self = this;
        this.relationshipsController.onChildLeavesWithEnter(function (listElem: VisualNode) {
            self.relationshipsController_childLeavesWithEnter(listElem);
        });
    }

    public relationshipsController_childLeavesWithEnter(listElem: VisualNode) {
        let indexForNewRelationship = 1 + this.relationshipsController.getIndexOfChild(listElem);
        this.createRelationshipAtPosition(indexForNewRelationship);
    }

    public createRelationshipAtPosition(position: number) {
        this.dataNode.addRelationshipAtPosition(PlaceholderRelationship.createInstance(), position);
        this.relationshipsController.focusVisualNodeAtPosition(position);
    }

    public getDataNode(): SimpleDataNode {
        return this.dataNode;
    }

    public dataNodeChanged(action: ObActions, object: DataNode, position: number) {
        if (action === ObActions.ChangedName) {
            let currentName = this.head.getText();
            let newName = this.dataNode.getName();
            if (currentName != newName) {
                this.head.setText(newName);
            }
        } else if (action === ObActions.RemovedRelationship) {
            if (this.bodyIsVisible()) {
                this.relationshipsController.removeVisualNodeAtPosition(position);
                if (this.dataNode.getRelationships().length == 0) {
                    this.deleteRelationshipController();
                }
            }
        } else if (action === ObActions.AddedRelationship) {
            if (this.bodyIsVisible()) {
                let visualRelationship: VisualNode = this.getVisualNodeForDataNode(object);
                this.relationshipsController.insertVisualNodeAtPosition(visualRelationship, position);
            }
        } else if (action === ObActions.ReplacedRelationship) {
            if (this.bodyIsVisible()) {
                let visualRelationship: VisualNode = this.getVisualNodeForDataNode(object);
                this.relationshipsController.removeVisualNodeAtPosition(position);
                this.relationshipsController.insertVisualNodeAtPosition(visualRelationship, position);
            }
        }
    }

    public getVisualNodeForDataNode(dataNode: DataNode): VisualNode {
        let visualNode : VisualNode;

        if (dataNode instanceof PlaceholderRelationship) {
            visualNode = this.getCreateRelationship(dataNode);
        } else {
            let backgroundColor = getColorForChild(this.backgroundColor);
            let parentZoomOutHandler = this.eventManager;
            if (dataNode instanceof SimpleDataNode) {
                visualNode = new SimpleVisualNode(dataNode, backgroundColor); // automatic cast (dataNode)
                visualNode.setParentZoomOutHandler(parentZoomOutHandler);
            } else if (dataNode instanceof HasDetail) {
                visualNode = this.getVisualNodeForDataNode(dataNode.getObject());
                // let visualNode = new VisualHasDetail(dataNode, backgroundColor, parentZoomOutHandler);
                // visualNode.setParentZoomOutHandler(parentZoomOutHandler);
                // return visualNode;
            } else if (dataNode.getType() === DataTypes.NamedLinkType) {
                var relationshipVisualNode: NamedLinkVisualNode = new NamedLinkVisualNode(<NamedLink> dataNode, backgroundColor);
                relationshipVisualNode.setParentZoomOutHandler(parentZoomOutHandler);
                visualNode = relationshipVisualNode;
            } else {
                console.log("VisualNode not implemented");
            }
        }
        let self = this;
        visualNode.getCallbacks().onDelete(function () {
            self.deleteVisualNode(visualNode);
        });
        return visualNode;
    }

    public deleteVisualNode(visualNode: VisualNode) {
        let index = this.relationshipsController.getIndexOfChild(visualNode);
        let relationship = this.dataNode.getRelationships()[index];

        if (relationship instanceof HasDetail){
            relationship.delete();
            if (index > 0) {
                this.relationshipsController.getVisualNodeAtPosition(index - 1).takeCursorFromBottom();
            } else {
                this.getHead().takeCursorFromBottom();
            }
        } else if (relationship.getType() === DataTypes.NamedLinkType){
            this.dataNode.deleteRelationship(relationship);
            if (index > 0) {
                this.relationshipsController.getVisualNodeAtPosition(index - 1).takeCursorFromBottom();
            } else {
                this.getHead().takeCursorFromBottom();
            }
        }
    }

    private getCreateRelationship(placeHolderRelationship: PlaceholderRelationship) : CreateRelationship{
        let createRelationship = new CreateRelationship(placeHolderRelationship, this, getColorForChild(this.backgroundColor));
        return createRelationship;
    }


    private textFieldChanged() {
        this.dataNode.setName(this.head.getText());
    }

    public getBackgroundColor(): Colors {
        return this.backgroundColor;
    }

    public getEventManager() : IUserEventAcceptor {
        return this.eventManager;
    }

    private dataNode: SimpleDataNode;
    private backgroundColor: Colors;
    private eventManager: EventManagerForSimpleVisualNode;
    private relationshipsController: ListController;
    private head: FocusableTextField;

}