import {I_EfTurContainer} from "../visual/Interfaces/I_EfTurContainer";
import {IGroupLogger} from "./IGroupLogger";
import {StandAloneContainer} from "../visual/StandAloneContainer";
import {EfTur_GroupLogger} from "./EfTur_GroupLogger";
export class EfTurLoggingSystem {

    constructor() {
        this.logger = new EfTur_GroupLogger();
        this.container = new StandAloneContainer();
        this.container.setContent(this.logger);
    }

    getContainer(): I_EfTurContainer {
        console.log("getContainer");

        return this.container;
    }

    getGroupLogger() : IGroupLogger {
        console.log("getLogger");

        return this.logger;
    }

    private logger: IGroupLogger;
    private container: I_EfTurContainer;
}