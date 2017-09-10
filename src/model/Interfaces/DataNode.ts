export interface DataNode {
    getDataNodeId(): number;
    setDataNodeId(id: number);
    getObjectAsJSON();
    getType(); // used when a VisualNode is created and "instanceof" doesn't work ; depreceated
    getTypInformation(): string;
    getDependencies(): Array<DataNode>;
}

export interface Relationship extends DataNode {
    onDelete(callback: Function);
}