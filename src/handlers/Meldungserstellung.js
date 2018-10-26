"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helper = __importStar(require("./Helper"));
const responseReady = ":responseReady";
const delegateDialog = ":delegate";
exports.handlers = {
    "LaunchRequest"() {
        this.attributes.meldung = {
            stoerung: {
                fahrzeug: {},
                infrastruktur: {
                    gleisabschnitt: {},
                    haltestelle: {},
                },
            },
        };
        this.response.speak("Willkommen zum Alexa Skill SSB Störmeldung3. Möchten Sie eine Störung erstellen oder eine vorhandene Störung bearbeiten?").listen("");
        this.emit(responseReady);
    },
    "MeldungsErstellungsIntent"() {
        if (this.event.request.dialogState !== "COMPLETED") {
            this.emit(delegateDialog);
        }
        else {
            const fahrzeugHandlerState = "_FahrzeugState";
            const infrastrukturHandlerState = "_InfrastrukturState";
            const fahrzeugSlotValue = "Fahrzeug";
            const infrastrukturSlotValue = "Infrastruktur";
            this.attributes.meldung.stoerung.stoerungstyp = this.event.request.intent.slots.StoerungstypSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            const stoerungstyp = this.attributes.meldung.stoerung.stoerungstyp;
            this.handler.state = Helper.defineHandlerState(this.event.request.intent.slots.StoerungstypSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name, fahrzeugHandlerState, infrastrukturHandlerState, fahrzeugSlotValue, infrastrukturSlotValue);
            this.response.speak(stoerungstypSpeech(stoerungstyp))
                .listen("");
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
};
const stoerungstypSpeech = (stoerungstyp) => {
    const fahrzeugSlot = "Fahrzeug";
    const infrastrukturSlot = "Infrastruktur";
    if (stoerungstyp === fahrzeugSlot) {
        const vehicleSpeech = "Können Sie bitte das Fahrzeug näher beschreiben. Handelt es sich dabei um eine Bahn oder um einen Bus?";
        return vehicleSpeech;
    }
    else if (stoerungstyp === infrastrukturSlot) {
        const infrastructureSpeech = "Können Sie bitte die Infrastruktur näher beschreiben. Handelt es sich dabei um eine Haltestelle oder um ein Gleisabschnitt.";
        return infrastructureSpeech;
    }
    else {
        const errorSpeech = "Funktion stoerungstypSpeech hat nicht geklappt";
        return errorSpeech;
    }
};
