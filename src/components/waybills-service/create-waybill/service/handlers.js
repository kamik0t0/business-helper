import { highlight } from "../../../../utils/highlight.js";
// считывание и сохранение наименования товара
export function getNomenclature(event, number, positions) {
    let nomenclature = event.target.value;
    positions[number].nomenclature = nomenclature;
}
// считывание и сохранение количества товара
export function getQuantity(event, number, positions, setPositions) {
    // проверка на отрицательное значение
    let quantity = +event.target.value < 0 ? 0 : +event.target.value;
    positions[number].quantity = quantity;
    // рендер
    setPositions();
}
// считывание и сохранение цены товара
export function getPrice(event, number, positions, setPositions) {
    // проверка на отрицательное значение
    let price = +event.target.value < 0 ? 0 : +event.target.value;
    positions[number].price = price;
    // рендер
    setPositions();
}
// получение позиции
export function getRow(event, number, positions, setPositions, row) {
    setPositions(highlight(number, [...positions], row));
}

// Подсчёт сумм по накладной и сохранение значения для отправки
export function total(array, field, WAYBILL) {
    WAYBILL.current[field] = +array.reduce(
        (prev, item) => prev + item[field],
        0
    );
    return WAYBILL.current[field];
}
// формирование текущей даты
export function makeDefaultDate() {
    const date = new Date();
    const month =
        date.getMonth() >= 10
            ? date.getMonth() + 1
            : "0" + +(date.getMonth() + 1);
    const day = date.getMonth() >= 10 ? date.getDate() : "0" + +date.getDate();
    const hour =
        date.getHours() >= 10 ? date.getHours() : "0" + +date.getHours();
    const minute =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + +date.getMinutes();
    const seconds =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + +date.getSeconds();
    return `${date.getFullYear()}-${month}-${day}T${hour}:${minute}:${seconds}.000Z`;
}

export function makeDate() {
    const date = new Date();
    const hour =
        date.getHours() >= 10 ? date.getHours() : "0" + +date.getHours();
    const minute =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + +date.getMinutes();
    const seconds =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + +date.getSeconds();
    return `T${hour}:${minute}:${seconds}.000Z`;
}
