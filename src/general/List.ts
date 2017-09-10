export class List<T> {

    public constructor() {
        this.objects = [];
    }

    // It is allowed that position == length. (that means toInsert is appended to the list)
    public insert(toInsert: T, position: number) {
        if (position < this.objects.length) {
            this.objects.splice(position, 0, toInsert);
        } else if (position == this.objects.length) {
            this.objects[position] = toInsert;
        }
    }

    public remove(position: number) {
        this.objects.splice(position, 1);
    }

    public get(position: number) {
        return this.objects[position];
    }

    public getIndex(object: T): number {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i] == object) {
                return i;
            }
        }
        return -1;
    }

    public getNext(object: T) {
        let index: number = this.getIndex(object);
        if (index + 1 < this.objects.length) {
            return this.objects[index + 1];
        } else {
            return null;
        }
    }

    public getPrevious(object: T) {
        let index: number = this.getIndex(object);
        if (index > 0) {
            return this.objects[index - 1];
        } else {
            return null;
        }
    }

    public getLength(): number {
        return this.objects.length;
    }

    private objects: Array<T>;
}