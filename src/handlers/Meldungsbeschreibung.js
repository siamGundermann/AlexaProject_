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
// tslint:disable:no-string-literal
const Alexa = __importStar(require("alexa-sdk"));
const responseReady = ":responseReady";
const delegateDialog = ":delegate";
exports.handlers = Alexa.CreateStateHandler("_BeschreibungsState", {
    MeldungsbeschreibungsIntent() {
        if (this.event.request.dialogState !== "COMPLETED") {
            this.emit(delegateDialog);
        }
        else {
            this.handler.state = undefined;
            delete this.attributes["STATE"];
            delete this.attributes.STATE;
            this.attributes.meldung.stoerung.stoerbeschreibung = this.event.request.intent.slots.BeschreibungsSlot.value;
            this.response.speak("Vielen Dank für ihre Meldung. Der nächste freie Mitarbeiter wird sich um die Störung kümmern.");
            this.emit(responseReady);
        }
    },
});
const dateNow = () => {
    const today = new Date().getDate();
    return today;
};
