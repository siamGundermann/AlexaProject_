/**
 * Funktion vergleicht den vom User gesprochenen SlotValue mit definierten IntentSlot Werten des Intents
 * und gibt ihm einen Handler Status zurück, den die Session annehmen soll.
 * @param slotValue gesprochener Wert, der von User gespeichert wird.
 * @param handlerState1 HandlerState, den die Session annehmen kann.
 * @param handlerState2 HandlerState, den die Session annehmen kann.
 * @param intentSlot1 Wert, der zum Abgleich von slotValue benötigt wird.
 * @param intentSlot2 Wert, der zum Abgleich von slotValue benötigt wird.
 */
export const defineHandlerState = (slotValue: any, handlerState1: string, handlerState2: string,
                                   intentSlot1: string, intentSlot2: string) => {
    if (slotValue === intentSlot1) {
        return handlerState1;
    } else if (slotValue === intentSlot2) {
        return handlerState2;
    }
};
