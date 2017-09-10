
// TODO
export class Callbacks {
    public leavesWithEnter() {
        this.onLeavesWithEnterAttr.call(this);
    }
    public emitsCursorTop() {
        this.onEmitsCursorTopAttr.call(this);
    }
    public emitsCursorBottom() {
        this.onEmitsCursorBottomAttr.call(this);
    }
    public delete() {
        this.onDeleteAttr.call(this);
    }

    public onLeavesWithEnter(callback: Function) {
        this.onLeavesWithEnterAttr = callback;
    }
    public onDelete(callback: Function) {
        this.onDeleteAttr = callback;
    }
    public onEmitsCursorTop(callback: Function) {
        this.onEmitsCursorTopAttr = callback;
    }
    public onEmitsCursorBottom(callback: Function) {
        this.onEmitsCursorBottomAttr = callback;
    }


    protected onLeavesWithEnterAttr: Function;
    protected onDeleteAttr: Function;

    protected onEmitsCursorTopAttr: Function;
    protected onEmitsCursorBottomAttr: Function;
}