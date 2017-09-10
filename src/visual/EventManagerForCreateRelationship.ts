import {IUserEventAcceptor, IZoomOutHandler} from "./Interfaces/interfaces";
import {CreateRelationship} from "./CreateRelationship";

export class EventManagerForCreateRelationship implements IUserEventAcceptor {

    public constructor(createRelationship: CreateRelationship) {
        this.createRelationship = createRelationship;
    }

    public setParentZoomOutHandler(parentZoomOutHandler: IZoomOutHandler) {
        this.parentZoomOutHandler = parentZoomOutHandler;
    }

    public focusEvent() {
        this.createRelationship.focus();
    }

    public toggleEvent() {
    }

    public copyEvent() {
    }

    public pasteEvent() {
        this.createRelationship.paste();
    }

    public zoomInEvent() {
    }

    public zoomOutEvent() {
        this.parentZoomOutHandler.zoomOutEvent();
    }

    public totalZoomEvent() {
    }

    public previousEvent() {
        this.createRelationship.emitsCursorTop();
    }

    public nextEvent() {
        this.createRelationship.emitsCursorBottom();
    }

    public enterPressed() {
        this.createRelationship.confirmAndLeaveWithEnter();
    }

    public newChildEvent() {
        this.createRelationship.newChild();
    }

    public deleteMeEvent() {
    }

    public confirmEvent() {
        this.createRelationship.confirm();
    }

    public createLinkEvent() {
        console.log("Operation not supported at the moment.");
    }

    private createRelationship: CreateRelationship;
    private parentZoomOutHandler: IZoomOutHandler;
}