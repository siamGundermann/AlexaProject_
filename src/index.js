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
const Fahrzeug = __importStar(require("./handlers/Fahrzeug"));
const Infrastruktur = __importStar(require("./handlers/Infrastruktur"));
const Meldungsbeschreibung = __importStar(require("./handlers/Meldungsbeschreibung"));
const Meldungserstellung = __importStar(require("./handlers/Meldungserstellung"));
exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = undefined;
    alexa.dynamoDBTableName = "Meldung";
    alexa.registerHandlers(Meldungserstellung.handlers, Fahrzeug.handlers, Infrastruktur.handlers, Meldungsbeschreibung.handlers);
    alexa.execute();
};
const firstLetterToUpper = (word) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
};
const dateNow = () => {
    const today = new Date().getDate();
    return today;
};
