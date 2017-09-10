import {Colors} from "../ColorManagement";
import {Callbacks} from "../Callbacks";


export interface IZoomOutHandler {
    zoomOutEvent();
}

export interface IBodyContainer_Creator {
    create(): IBodyContainer;
}

export interface IUserEventAcceptor extends IManipulationEvents, INavigationEvents {}

export interface UIObject {
    removeFromDOM();
    getUIObject();
}

export interface IManipulationEvents {
    copyEvent();
    pasteEvent();
    enterPressed();
    newChildEvent();
    deleteMeEvent();
    confirmEvent();
    createLinkEvent();
    exportObjectEvent();
    importToObjectEvent();
}

export interface IBodyContainer {
    setContent(content);
    setCollapsed();
    setExpanded();
    startExpandAnimation();
    startCollapseAnimation();
    getUIObject();
    onCollapsed(callback: Function);
    setMaxWidth(maxWidth: number);
}

export interface IHeadContainer {
    setContent(content);
    bodyIsAvailable(bool: boolean);
    isExpanded(bool: boolean);
    getUIObject();
    setEventManager(eventManager: IUserEventAcceptor);
    setBackgroundColor(backgroundColor: Colors);
    setMaxWidth(maxWidth: number);
}

export interface INavigationEvents {
    focusEvent();
    toggleEvent();
    zoomInEvent();
    zoomOutEvent();
    totalZoomEvent();
    previousEvent();
    nextEvent();
}

export interface IFocusable {
    takeCursorFromBottom();
    takeCursorFromTop();
    focus();
    getCallbacks(): Callbacks;
}

export interface VisualNode extends IFocusable {
    // onEmitsCursorTop(callback: Function);
    // onEmitsCursorBottom(callback: Function);
    // onLeavesWithEnter(callback: Function);
    // onDelete(callback: Function);
    // getCallbacks(): Callbacks;

    getUIObject();
    zoomOutPossible(): boolean;
    zoomIn();
    zoomOut();
    takeCursorFromBottom();
    takeCursorFromTop();

    removeFromDOM();

    setMaxWidth(maxWidth: number);
    setParentZoomOutHandler(parentZoomOutHandler: IZoomOutHandler);

    // not used at the moment
    focus();
    removeFocus();
}

export interface RelationshipVisualNode extends VisualNode {
}
