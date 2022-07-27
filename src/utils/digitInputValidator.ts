import { IEvent } from "../interfaces/event";

export const digitInputValidator = (
    event: IEvent,
    isNumber: boolean,
    length: number | undefined
) => {
    event.preventDefault();
    if (!isNumber) return;

    const inputData = event.target.value;
    event.target.value = inputData.toString().replace(/[^0-9]/g, "");

    if (typeof inputData === "string" && inputData.length === length) {
        return false;
    } else {
        return true;
    }
};
