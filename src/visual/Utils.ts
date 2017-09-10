export class Utils {

    static remove(toRemove) {
        toRemove.parentNode.removeChild(toRemove);
    }

    static insertAfter(htmlObject, toInsert) {
        let parent = htmlObject.parentNode;
        let next = htmlObject.nextSibling;
        if (next == null) {
            parent.appendChild(toInsert);
        } else {
            parent.insertBefore(toInsert, next);
        }
    }

    static removeNext(htmlObject) {
        Utils.remove(htmlObject.nextSibling);
    }

    static getDiv(): HTMLElement {
        return document.createElement('div');
    }

    static removeAllChildren(htmlObject) {
        while (htmlObject.hasChildNodes()) {
            htmlObject.removeChild(htmlObject.children[0]);
        }
    }
}