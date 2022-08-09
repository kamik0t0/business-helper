// Проверяет заполнены ли все поля при создании организации
import { IRequisiteView } from "../../../../../interfaces/requisite";

export function isAllRequisitesFilled(createFields: IRequisiteView[]) {
    for (const key of createFields) {
        if (key.value === null || key.value === "") return false;
    }
    return true;
}
