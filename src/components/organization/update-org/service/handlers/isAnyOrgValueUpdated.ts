import { MutableRefObject } from "react";
import { ICounterpartyWithInputValueLength } from "../../../../../interfaces/counterparty";

/* Временный комментарий для себя:
расширяем интефейс IOrg опциональным свойством inputValueLength типа number и описываем сигнатуру индекса, т.е. тип вызываемого свойства объекта и тип получаемого значения. Интерфейс содержит типы как number так и string, при этом поскольку имеется опциональное свойство которое может быть удалено то значение и тип этого свойства может быть undefined
*/

export function isAnyOrgValueUpdated(
    Updated: MutableRefObject<ICounterpartyWithInputValueLength>,
    USERORG: ICounterpartyWithInputValueLength
): boolean {
    for (const field in Updated.current) {
        // удаление лишнего поля
        if (Updated.current[field] === undefined) delete Updated.current[field];
        // удаление поля контроля длины
        if (Updated.current.inputValueLength)
            delete Updated.current.inputValueLength;
        if (
            // если значенине поля обновилось
            Updated.current[field] !== USERORG[field] &&
            // и значение поля !== undefined
            Updated.current[field] !== undefined
        )
            return true;
    }
    return false;
}
