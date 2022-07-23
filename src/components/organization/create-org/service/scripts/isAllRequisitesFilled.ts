// Проверяет заполнены ли все поля при создании организации
import { ICounterparty } from "../../../../../interfaces/counterparty";

export function isAllRequisitesFilled(organization: ICounterparty) {
    for (const key in organization) {
        if (organization[key] === undefined) delete organization[key];
        // если поле не заполнено
        if (organization[key] === null) return false;
        // если не заполнено, но есть пробелы
        if (
            organization[key] !== null &&
            typeof organization[key] === "string"
        ) {
            if (organization[key]?.toString().trim().length === 0) return false;
        }
    }
    return true;
}
