// Присваивает обновленные значения полям объекта
export function setUpdateOrgValue(event, field, newValue, Updated) {
    // если нет ограничения по длине, то присваивается значение - true
    if (!Updated.current["inputValueLength"]) {
        Updated.current[field] = newValue.trim();
        return true;
    }
    // если есть ограничение по длине и новое значение не соответствует - false
    if (newValue.length !== Updated.current["inputValueLength"]) return false;
    // если все ок - true
    Updated.current[field] = newValue.trim();
    return true;
}
