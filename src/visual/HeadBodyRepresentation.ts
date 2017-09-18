import {IBodyContainer, IBodyContainer_Creator, IHeadContainer} from "./Interfaces/interfaces";
import {Utils} from "./Utils";
export class HeadBodyRepresentation {

    setHeadContainer(headContainer: IHeadContainer) {
        this.headContainer = headContainer;
    }

    setBodyContainer_Creator(bodyContainer_creator: IBodyContainer_Creator) {
        this.bodyContainer_creator = bodyContainer_creator;
    }

    removeFromDOM() {
        if (this.bodyIsVisible) {
            Utils.remove(this.bodyDiv);
        }
        Utils.remove(this.headContainer.getUIObject());
    }

    showBody() {
        this.bodyContainer = this.bodyContainer_creator.create();

        this.bodyContainer.setCollapsed();

        this.bodyDiv = this.bodyContainer.getUIObject();
        Utils.insertAfter(this.headContainer.getUIObject(), this.bodyDiv);
        let self = this;
        let expand = function () {
            self.bodyContainer.startExpandAnimation();
        };
        let timeLineBreak : number = 0; // before 50, before 100
        window.setTimeout(expand, timeLineBreak);
        this.bodyIsVisible = true;
    }

    hideBody() {
        this.bodyContainer.startCollapseAnimation();
        let self = this;
        this.bodyContainer.onCollapsed(function () {
            window.setTimeout(function () {
                self.removeBody();
            }, 0);
        });
    }

    private removeBody() {
        Utils.remove(this.bodyDiv);
        this.headContainer.isExpanded(false);
        this.bodyIsVisible = false;
    }

    get_bodyIsVisible(): boolean {
        return this.bodyIsVisible;
    }

    setMaxWidth(maxWidth: number) {
        this.bodyContainer.setMaxWidth(maxWidth);
    }

    private headContainer: IHeadContainer;
    private bodyContainer: IBodyContainer;
    private bodyContainer_creator: IBodyContainer_Creator;
    private bodyIsVisible: boolean = false;

    private bodyDiv;
}