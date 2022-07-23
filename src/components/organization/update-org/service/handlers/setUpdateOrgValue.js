// Присваивает обновленные значения полям объекта
export function setUpdateOrgValue(newValue, inputField, Updated) {
    // если нет ограничения по длине, то возвращается значение - true
    if (!Updated.current["inputValueLength"]) {
        Updated.current[inputField] = newValue.trim();
        return true;
    }
    // если есть ограничение по длине и новое значение не соответствует - false
    if (newValue.length !== Updated.current["inputValueLength"]) return false;
    // если все ок - true
    Updated.current[inputField] = newValue.trim();
    return true;
}

export function setInputValue(event, inputField, Updated) {
    if (!Updated.current["inputValueLength"]) {
        Updated.current[inputField] = event.target.value.trim();
        return;
    }
    if (event.target.value.length !== Updated.current["inputValueLength"])
        return;
    Updated.current[inputField] = event.target.value.trim();
}
