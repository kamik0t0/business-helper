// Проверяет поле на ограничение по длине, если
export function setInputLengthLimit(event, field, length, Updated) {
    delete Updated.current[`inputValueLength`];
    if (length === undefined) return;
    Updated.current[`inputValueLength`] = length;
}
