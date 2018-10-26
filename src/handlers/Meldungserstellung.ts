// tslint:disable:object-literal-sort-keys
// tslint:disable:max-line-length
import * as Alexa from "alexa-sdk";
import * as Helper from "./Helper";

const responseReady = ":responseReady";
const delegateDialog = ":delegate";

export const handlers: Alexa.Handlers<any> = {
    "LaunchRequest"() {
        this.attributes.meldung = {
            stoerung: {
                fahrzeug: {
                },
                infrastruktur: {
                    gleisabschnitt: {
                    },
                    haltestelle: {
                    },
                },
            },
        };
        this.response.speak("Willkommen zum Alexa Skill SSB Störmeldung3. Möchten Sie eine Störung erstellen oder eine vorhandene Störung bearbeiten?").listen("");
        this.emit(responseReady);
    },
    "MeldungsErstellungsIntent"() {
        if (this.event.request.dialogState !== "COMPLETED") {
            this.emit(delegateDialog);
        } else {
            const fahrzeugHandlerState = "_FahrzeugState";
            const infrastrukturHandlerState = "_InfrastrukturState";
            const fahrzeugSlotValue = "Fahrzeug";
            const infrastrukturSlotValue = "Infrastruktur";
            this.attributes.meldung.stoerung.stoerungstyp = this.event.request.intent.slots.StoerungstypSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            const stoerungstyp = this.attributes.meldung.stoerung.stoerungstyp;
            this.handler.state = Helper.defineHandlerState( this.event.request.intent.slots.StoerungstypSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name,
                                                            fahrzeugHandlerState, infrastrukturHandlerState, fahrzeugSlotValue, infrastrukturSlotValue);
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
const stoerungstypSpeech = (stoerungstyp: string) => {
    const fahrzeugSlot = "Fahrzeug";
    const infrastrukturSlot = "Infrastruktur";
    if (stoerungstyp === fahrzeugSlot) {
        const vehicleSpeech: string = "Können Sie bitte das Fahrzeug näher beschreiben. Handelt es sich dabei um eine Bahn oder um einen Bus?";
        return vehicleSpeech;
    } else if (stoerungstyp === infrastrukturSlot) {
        const infrastructureSpeech: string = "Können Sie bitte die Infrastruktur näher beschreiben. Handelt es sich dabei um eine Haltestelle oder um ein Gleisabschnitt.";
        return infrastructureSpeech;
    } else {
        const errorSpeech: string = "Funktion stoerungstypSpeech hat nicht geklappt";
        return errorSpeech;
    }
};
