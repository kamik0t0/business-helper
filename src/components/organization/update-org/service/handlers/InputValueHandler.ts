import { IEvent } from "../../../../../interfaces/event";

// Присваивает обновленные значения полям объекта
export const doesPropertyShouldUpdate = (
    value: string | number | undefined | null | boolean,
    length: number
): boolean => {
    if (!length) return true;
    else if (typeof value === "string" && value.length !== length) return false;
    return true;
};

export const InputValueHandler = (
    event: IEvent,
    inputField: string,
    updateProperty: (field: string, value: string | number | boolean) => void,
    inputFieldLength?: number
) => {
    const value = event.target.value;

    if (inputFieldLength) {
        if (value.toString().length === inputFieldLength) {
            updateProperty(inputField, event.target.value);
        } else {
            // alert(`Нужно ввести ${inputFieldLength} цифр!`);
            updateProperty(inputField, event.target.value);
        }
    } else {
        updateProperty(inputField, event.target.value);
    }
};
