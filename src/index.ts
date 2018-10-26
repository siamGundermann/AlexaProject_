// tslint:disable:object-literal-sort-keys
// tslint:disable:max-line-length
import * as Alexa from "alexa-sdk";
import * as Fahrzeug from "./handlers/Fahrzeug";
import * as Infrastruktur from "./handlers/Infrastruktur";
import * as Meldungsbeschreibung from "./handlers/Meldungsbeschreibung";
import * as Meldungserstellung from "./handlers/Meldungserstellung";

export const handler = (event: Alexa.RequestBody<Alexa.Request>, context: Alexa.Context, callback:
    (err: any, response: any) => void): void => {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = undefined;
    alexa.dynamoDBTableName = "Meldung";
    alexa.registerHandlers(Meldungserstellung.handlers,
        Fahrzeug.handlers,
        Infrastruktur.handlers,
        Meldungsbeschreibung.handlers);
    alexa.execute();
};

const firstLetterToUpper = (word: string) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
};

const dateNow = () => {
    const today = new Date().getDate();
    return today;
};
