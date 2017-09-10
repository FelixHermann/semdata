import {List} from "./general/List";
import {tmpField} from "./loadApp";
import {TextField} from "./visual/TextField";
import {BodyContainer} from "./visual/BodyContainer";
import {IBodyContainer} from "./visual/Interfaces/interfaces";

export function runTests() {
    new Tests().testList();
}

export class Tests {

    public testBody() {
        let body : IBodyContainer = new BodyContainer(null);
        body.setContent(new TextField("teste body, XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXX XXXXXXXXXX " +
            "XXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXX XXXXXXXXXX " +
            "XXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXX XXXXXXXXXX " +
            "XXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXX XXXXXXXXXX " +
            "XXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXX XXXXXXXXXX " +
            "XXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXX XXXXXXXXXX " +
            "XXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXX XXXXXXXXXX " +
            "XXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXX XXXXXXXXXX " +
            "XXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXXXX", null));

        tmpField.appendChild(body.getUIObject());

        body.startExpandAnimation();
    }


    public testTextField() {
        let textField = new TextField("test FocusableTextField", null);
        tmpField.appendChild(textField.getUIObject());
        textField.onTextChange(function () {
            console.log("text changed - " + textField.getText());
        });
        let newText = "newText";
        textField.setText(newText);
        this.assert(textField.getText() === newText);
    }

    public testList() {
        let list : List<string> = new List<string>();
        let iNull = "iNull";
        let iOne = "iOne";
        let iTwo = "iTwo";
        list.insert(iNull, 0);
        list.insert(iOne, 1);
        list.insert(iTwo, 2);

        // getNext()
        this.assert(list.getNext(iNull) === iOne);

        // getPrevious()
        this.assert(list.getPrevious(iTwo) == iOne);

        // getIndex()
        this.assert(list.getIndex(iOne) == 1);

        // insert at the end
        list.insert("c", 3);
        this.assert(list.get(3).indexOf("c") == 0);

        // insert in the middle
        list.insert("b", 2);
        this.assert(list.get(2).indexOf("b") == 0);

        // insert at the beginning
        list.insert("a", 0);
        this.assert(list.get(0).indexOf("a") == 0);

        // remove
        list= new List<string>();
        list.insert("iNull", 0);
        list.insert("iOne", 1);
        list.insert("iTwo", 2);
        list.remove(1);
        this.assert(list.get(1).indexOf("iTwo") == 0);
    }

    private assert(boolValue: boolean) {
        if (boolValue) {
            console.log("passed");
        } else {
            console.log("!!! error !!!");
        }
    }
}