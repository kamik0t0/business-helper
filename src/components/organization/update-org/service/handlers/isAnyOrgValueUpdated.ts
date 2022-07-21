import { IOrg } from "../../../../../interfaces/organization";

/* Временный комментарий для себя:
расширяем интефейс IOrg опциональным свойством inputValueLength типа number и описываем сигнатуру индекса, т.е. тип вызываемого свойства объекта и тип получаемого значения. Интерфейс содержит типы как number так и string, при этом поскольку имеется опциональное свойство которое может быть удалено то значение и тип этого свойства может быть undefined
*/
interface IOrgWithInputValueLength extends IOrg {
    inputValueLength?: number;
    [prop: string]: string | number | undefined;
}

export function isAnyOrgValueUpdated(
    Updated: IOrgWithInputValueLength,
    USERORG: IOrgWithInputValueLength
): boolean {
    for (const field in Updated) {
        // удаление лишнего поля
        if (Updated[field] === undefined) delete Updated[field];
        // удаление поля контроля длины
        if (Updated.inputValueLength) delete Updated.inputValueLength;

        if (
            // если значенине поля обновилось
            Updated[field] !== USERORG[field] &&
            // и наименование поля !== upINN
            field !== "upINN" &&
            // и значение поля !== undefined
            Updated[field] !== undefined
        )
            return true;
    }
    return false;
}
