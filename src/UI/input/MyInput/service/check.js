// Валидация ввода числовых значений
export function check(isNumber, field, prevValue, setError, length) {
    let input = document.getElementById(field + prevValue);
    if (!isNumber) return;
    input.value = input.value.replace(/[^0-9]/g, "");
    if (input.value.length === length) {
        setError(false);
    } else {
        setError(true);
    }
}
