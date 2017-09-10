
import {VisualNode} from "./Interfaces/interfaces";
export function getVisualNodeWithFocus(): VisualNode {
    var nativeFocused = document.activeElement;
    return nativeFocused.visualNode; // TODO get type
}


export const STANDARD_HORIZONTAL_MARGIN = 3;
export const INDENTATION_PADDING = 6;
export const STANDARD_VERTICAL_MARGIN = 3;
export const STANDARD_PADDING = 3;
export const STANDARD_MARGIN = 3;

export const EDGE_RADIUS : string = "3px";

export const NODE_DISPLAY : string = "inline-block";

export const FONT : string = "sans-serif";
export const FONT_SIZE : string = "12pt";



export const MAX_WIDTH_OF_NODE_VIEW = 800;
export const BOX_SHADOW_NODE : string = "2px 2px 1px #999";
// export const BOX_SHADOW_NODE : string = "1px 1px 1px 1px #999";
export const MAXIMUM_WIDTH_OF_NODE : number = 600;


export var focusedObject: VisualNode = null;

export function getFocusedObject() : VisualNode {
    return focusedObject;
}

export function setFocusedObject(newFocusedObject : VisualNode) {
    focusedObject = newFocusedObject;
}
