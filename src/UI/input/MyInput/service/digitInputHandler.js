// Валидация ввода числовых значений и alert
export function digitInputHandler(
    isNumber,
    field,
    prevValue,
    setInputError,
    length
) {
    if (!isNumber) return;
    const input = document.getElementById(field + prevValue);
    input.value = input.value.replace(/[^0-9]/g, "");
    // отделить логику
    if (input.value.length === length) {
        setInputError(false);
    } else {
        setInputError(true);
    }
}
