import { MutableRefObject } from "react";
import { IEvent } from "../../../../../interfaces/event";
import { ICounterpartyWithInputValueLength } from "../../../../../interfaces/counterparty";

// Присваивает обновленные значения полям объекта
export const setUpdateOrgValue = (
    newValue: string,
    inputField: string,
    Updated: MutableRefObject<ICounterpartyWithInputValueLength>
): boolean => {
    // если нет ограничения по длине, то возвращается значение - true
    if (!Updated.current?.inputValueLength) {
        Updated.current[inputField] = newValue.trim();
        return true;
    }
    // если есть ограничение по длине и новое значение не соответствует - false
    if (newValue.length !== Updated.current.inputValueLength) return false;
    // если все ок - true
    Updated.current[inputField] = newValue.trim();
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
