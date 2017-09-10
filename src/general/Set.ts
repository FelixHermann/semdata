export class Set<T> {
    public has(object: T) : boolean {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i] === object) {
                return true;
            }
        }
        return false;
    }

    public push(object: T) {
        this.list.push(object);
    }

    private list: Array<T> = [];
}