import { IEvent } from "../interfaces/event";

export const digitInputValidator = (event: IEvent, isNumber: boolean) => {
    event.preventDefault();
    if (!isNumber) return;
    const inputData = event.target.value;
    event.target.value = inputData.toString().replace(/[^0-9]/g, "");
};

export const isError = (value: string, length: number): boolean => {
    if (typeof value === "string" && value.toString().length === length) {
        return false;
    } else {
        return true;
    }
};
