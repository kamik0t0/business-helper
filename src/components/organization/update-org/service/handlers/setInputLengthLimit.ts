import { MutableRefObject } from "react";
import { ICounterpartyWithInputValueLength } from "../../../../../interfaces/counterparty";

// Устанавливает ограничение на длину поля
export function setInputLengthLimit(
    length: number | undefined,
    Updated: MutableRefObject<ICounterpartyWithInputValueLength>
): void {
    console.log(length);

    delete Updated.current.inputValueLength;
    if (length === undefined) return;
    Updated.current.inputValueLength = length;
}
