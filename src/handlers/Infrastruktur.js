"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:object-literal-sort-keys
// tslint:disable:max-line-length
const Alexa = __importStar(require("alexa-sdk"));
const Helper = __importStar(require("./Helper"));
const responseReady = ":responseReady";
const delegateDialog = ":delegate";
exports.handlers = Alexa.CreateStateHandler("_InfrastrukturState", {
    "InfrastrukturIntent"() {
        if (this.event.request.dialogState !== "COMPLETED") {
            this.emit(delegateDialog);
        }
        else {
            const haltestellenHandlerState = "_HaltestellenState";
            const gleisabschnittHandlerState = "_Gleisabschnitt";
            const haltestelleSlotValue = "Haltestelle";
            const gleisabschnittSLotValue = "Gleisabschnitt";
            this.attributes.meldung.stoerung.infrastruktur.infrastrukturtyp = this.event.request.intent.slots.InfrastrukturtypSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            // this.handler.state = undefined;
            this.handler.state = Helper.defineHandlerState(this.event.request.intent.slots.InfrastrukturtypSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name, haltestellenHandlerState, gleisabschnittHandlerState, haltestelleSlotValue, gleisabschnittSLotValue);
            this.response.speak("Beschreiben Sie die Störung oder den Schaden mit ihren eigenen Worten. Fangen Sie den Satz mit dem Wort \"Beschreibung\" an und erläutern sie den Sachverhalt.").listen();
            this.emit(responseReady);
        }
    },
    "AMAZON.HelpIntent"() {
        this.response.speak("Wenn Sie nicht weiter wissen, dann sagen sie Exit oder Stop").listen("");
        this.emit(responseReady);
    },
    "AMAZON.CancelIntent"() {
        this.response.speak("Auf Wiedersehen!");
        this.emit(responseReady);
    },
    "AMAZON.StopIntent"() {
        this.response.speak("Auf Wiedersehen!");
        this.emit(responseReady);
    },
});
