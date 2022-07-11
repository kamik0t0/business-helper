export function isAnyOrgValueUpdated(Updated, USERORG) {
    for (const field in Updated) {
        // удаление лишнего поля
        if (Updated[field] === undefined) delete Updated[field];
        // удаление поля контроля длины
        if (Updated["inputValueLength"]) delete Updated["inputValueLength"];

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
