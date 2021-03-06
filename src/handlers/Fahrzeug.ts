// tslint:disable:object-literal-sort-keys
// tslint:disable:max-line-length
import * as Alexa from "alexa-sdk";

const responseReady = ":responseReady";
const delegateDialog = ":delegate";

export const handlers: Alexa.Handlers<any> = Alexa.CreateStateHandler("_FahrzeugState", {
    "FahrzeugIntent"() {
        if (this.event.request.dialogState !== "COMPLETED") {
            this.emit(delegateDialog);
        } else {
            this.attributes.meldung.stoerung.fahrzeug.fahrzeugtyp = this.event.request.intent.slots.FahrzeugtypSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            this.attributes.meldung.stoerung.fahrzeug.liniennummer = this.event.request.intent.slots.LiniennummerSlot.value;
            // this.handler.state = undefined;
            this.handler.state = "_BeschreibungsState";
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
