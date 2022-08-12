import { ICounterparty } from "../../../../../interfaces/counterparty";

/* Временный комментарий для себя:
расширяем интефейс IOrg опциональным свойством inputValueLength типа number и описываем сигнатуру индекса, т.е. тип вызываемого свойства объекта и тип получаемого значения. Интерфейс содержит типы как number так и string, при этом поскольку имеется опциональное свойство которое может быть удалено то значение и тип этого свойства может быть undefined
*/

export function isAnyOrgValueUpdated(
    Updated: ICounterparty,
    USERORG: ICounterparty
): boolean {
    for (const field in Updated) {
        if (Updated[field] !== USERORG[field]) return true;
    }
    return false;
}
