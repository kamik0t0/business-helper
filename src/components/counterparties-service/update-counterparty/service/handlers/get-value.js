export function getValue(event, field, length, Updated) {
    // получаем значение длины и создаем соответствующее поле для последующей проверки
    delete Updated.current[`lngth`];
    if (
        length === undefined ||
        length === "undefined" ||
        length === null ||
        length === "null" ||
        !length
    )
        return;
    Updated.current[`lngth`] = length !== undefined && length;
}
