// tslint:disable:object-literal-sort-keys
// tslint:disable:max-line-length
// tslint:disable:no-string-literal
import * as Alexa from "alexa-sdk";

const responseReady = ":responseReady";
const delegateDialog = ":delegate";

export const handlers: Alexa.Handlers<any> = Alexa.CreateStateHandler("_BeschreibungsState", {
    MeldungsbeschreibungsIntent() {
        if (this.event.request.dialogState !== "COMPLETED") {
            this.emit(delegateDialog);
        } else {
            this.handler.state = undefined;
            delete this.attributes["STATE"];
            delete this.attributes.STATE;
            this.attributes.meldung.stoerung.stoerbeschreibung = this.event.request.intent.slots.BeschreibungsSlot.value;
            this.response.speak("Vielen Dank für ihre Meldung. Der nächste freie Mitarbeiter wird sich um die Störung kümmern.");
            // this.emit(responseReady);
            this.emit(":saveState", true);
        }
    },
});

const dateNow = () => {
    const today = new Date().getDate();
    return today;
};
