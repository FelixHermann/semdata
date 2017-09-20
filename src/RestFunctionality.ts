import {Utils} from "./visual/Utils";
import {GenericObservable} from "./general/observe/GenericObservable";
import {GenericObActions} from "./general/observe/GenericObAction";
export class RestFunctionality extends GenericObservable<GenericObActions>{
    static singleton = new RestFunctionality();

    constructor() {
        super();

        this.myDiv = Utils.getDiv();
        this.textArea = document.createElement("textarea");
        this.myDiv.appendChild(this.createImportFunctionality());
        this.myDiv.appendChild(this.textArea);

        this.myDiv.style.backgroundColor = "lightgreen";
    }

    getUIObject() {
        return this.myDiv;
    }

    setContentOfTextArea(text: string) {
        this.textArea.value = text;
    }
    getContentOfTextArea(): string {
        return this.textArea.value;
    }

    private createImportFunctionality() {
        let button = document.createElement('input');
        button.type = 'button';
        button.value = "Import";
        let self = this;
        button.addEventListener("click", function () {
            self.notify(null);
        });
        return button;
    }

    private myDiv;
    private textArea;
}



