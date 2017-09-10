
export class ID_Manager<T> extends Map<number, T> {

    getNewID() : number {
        this.highestID++;
        let toReturn = this.highestID;
        return toReturn;
    }

    remove(key: number) {
        // TODO free this key
        super.delete(key);
    }
    private highestID : number = -1;
}