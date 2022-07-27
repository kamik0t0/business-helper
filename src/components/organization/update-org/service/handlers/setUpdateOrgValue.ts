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

export const setInputValue = (
    event: IEvent,
    inputField: string,
    Updated: MutableRefObject<ICounterpartyWithInputValueLength>
): void => {
    if (!Updated.current?.inputValueLength) {
        Updated.current[inputField] = event.target.value.toString().trim();
    }
    if (
        event.target.value.toString().length !==
        Updated.current?.inputValueLength
    )
        Updated.current[inputField] = event.target.value.toString().trim();
};

// TODO: две функции с несколько измененной логикой выполняют по факту одно и то же, а именно мутируют объект который в итоге будет отправлен на сервер. Разница в том что setUpdateOrgValue получает обновленной значение (newValue) из неконтролируемого компонента - через ref, а setInputValue получает значение напрямую через event.target.value по событию onChange. Также есть отличие в возврате значения. Дилемма следующая: оставить две функции, либо попытаться реализовать все в одной.
