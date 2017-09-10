import {ILogger} from "../general/Interfaces/ILogger";
import {DisplayLogger} from "../general/DisplayLogger";
import {EfTurLoggingSystem} from "../logger/EfTurLogger/EfTurLoggingSystem";
export class Tester {
    static run() {
        new Tester().runTests();
    }

    constructor() {
        let displayLogger = new DisplayLogger();
        document.body.appendChild(displayLogger.getUIObject());
        this.logger = displayLogger;
    }

    runTests() {
        this.logger.log("test");
        //
        let efTurLoggingSystem = new EfTurLoggingSystem();
        let logger_efTur = efTurLoggingSystem.getGroupLogger();

        logger_efTur.startGroup("gruppe1");
        logger_efTur.log("gruppe1/log");
        logger_efTur.endGroup("gruppe1");
        logger_efTur.log("root/log");

        let container = efTurLoggingSystem.getContainer();
        document.body.appendChild(container.getUIObject());
        container.setMaxWidth(800);
    }

    private logger : ILogger;
}