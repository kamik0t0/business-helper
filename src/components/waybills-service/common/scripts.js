export function setInvoicePositionCalculations(event, index, positions, prop) {
    if (prop === "nomenclature") {
        let value = event.target.value;
        positions[index][prop] = value;
    } else {
        let value = +event.target.value < 0 ? 0 : +event.target.value;
        positions[index][prop] = value;
    }
    return positions;
}
// считывание и сохранение наименования товара
export function getNomenclature(event, number, positions) {
    let nomenclature = event.target.value;
    positions[number].nomenclature = nomenclature;
    return positions;
}
// считывание и сохранение количества товара
export function getQuantity(event, number, positions) {
    // проверка на отрицательное значение
    let quantity = +event.target.value < 0 ? 0 : +event.target.value;
    positions[number].quantity = quantity;
    return positions;
}
// считывание и сохранение цены товара
export function getPrice(event, number, positions) {
    // проверка на отрицательное значение
    let price = +event.target.value < 0 ? 0 : +event.target.value;
    positions[number].price = price;
    return positions;
}
// Подсчёт сумм по накладной и сохранение значения для отправки
export const calculateInvoiceSummary = (array, field) =>
    +array.reduce((prev, item) => prev + +item[field], 0);

// формирование текущей даты
export function makeDefaultDate() {
    const date = new Date();
    const month =
        date.getMonth() >= 10
            ? date.getMonth() + 1
            : "0" + +(date.getMonth() + 1);
    const day = date.getDate() >= 10 ? date.getDate() : "0" + +date.getDate();
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

export const getDate = (event) => `${event.target.value}${makeDate()}`;

export const getCounterpartyName = (event) => event.target.value;
