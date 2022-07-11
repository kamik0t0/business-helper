// Проверяет заполнены ли все поля при создании организации
export function isAllRequisitesFilled(organization) {
    for (const key in organization) {
        // если поле не заполнено
        if (organization[key] === undefined) return false;
        // если не заполнено, но есть пробелы
        if (
            organization[key] !== undefined &&
            typeof organization[key] === "string"
        ) {
            if (organization[key].trim().length === 0) return false;
        }
    }
    return true;
}
