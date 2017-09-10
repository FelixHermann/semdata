import {Callbacks} from "./Callbacks";
import {Colors, getColorValue} from "./ColorManagement";
import {IUserEventAcceptor} from "./Interfaces/interfaces";
import {FONT, FONT_SIZE} from "./general";

export class TextField {

    public constructor(text: string, eventAcceptor: IUserEventAcceptor) {
        this._mySpan = this.createUIObject(text, eventAcceptor);
    }

    public getCallbacks(): Callbacks {
        return this.callbacks;
    }

    public onTextChange(callback: Function) {
        this.onTextChangeAttr = callback;
    }

    public setFontColor(fontColor: Colors) {
        this.fontColor = fontColor;
        this._mySpan.style.color = getColorValue(this.fontColor);
    }

    public setBackgroundColor(color: Colors) {
        this.backgroundColor = color;
        this._mySpan.style.backgroundColor = getColorValue(this.fontColor);
    }

    public takeCursor() {
        let range;
        let selection;
        let element = this._mySpan;
        range = document.createRange();
        range.selectNodeContents(element);
        range.collapse(true);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus(); // the cursor is visible only if the element is focused
    }

    public setText(newText: string) {
        this._mySpan.innerText = newText;
    }

    public getText() {
        return this._mySpan.innerText;
    }

    private createUIObject(text: string, eventAcceptor: IUserEventAcceptor) {
        let UIObject = document.createElement("span");

        // UIObject.innerText = text;
        UIObject.innerHTML = text;
        UIObject.style.textDecoration = "inherit";

        UIObject.style.wordWrap = "break-word";
        UIObject.style.font = FONT_SIZE + " " + FONT;

        // min-width (needs inline-block)
        UIObject.style.minWidth = "20px";
        UIObject.style.display = "inline-block";

        UIObject.contentEditable = "false";

        UIObject.userEventAcceptor = eventAcceptor;
        let self = this;
        UIObject.oninput = function () {
            self.textChanged();
        };
        return UIObject;
    }

    getUIObject() {
        return this._mySpan;
    }

    private textChanged() {
        this.onTextChangeAttr.call(this);
    }

    private backgroundColor;
    private fontColor: Colors;
    private _mySpan;
    private onTextChangeAttr;
    private callbacks: Callbacks = new Callbacks();
}