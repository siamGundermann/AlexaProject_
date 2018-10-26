"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Funktion vergleicht den vom User gesprochenen SlotValue mit definierten IntentSlot Werten des Intents
 * und gibt ihm einen Handler Status zurück, den die Session annehmen soll.
 * @param slotValue gesprochener Wert, der von User gespeichert wird.
 * @param handlerState1 HandlerState, den die Session annehmen kann.
 * @param handlerState2 HandlerState, den die Session annehmen kann.
 * @param intentSlot1 Wert, der zum Abgleich von slotValue benötigt wird.
 * @param intentSlot2 Wert, der zum Abgleich von slotValue benötigt wird.
 */
exports.defineHandlerState = (slotValue, handlerState1, handlerState2, intentSlot1, intentSlot2) => {
    if (slotValue === intentSlot1) {
        return handlerState1;
    }
    else if (slotValue === intentSlot2) {
        return handlerState2;
    }
};
