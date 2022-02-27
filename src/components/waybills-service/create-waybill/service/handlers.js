import { highlight } from "../../../../utils/highlight.js";
// добавление строки
export function addRow(
    event,
    positions,
    Positions,
    counter,
    setCounter,
    setPositions
) {
    event.preventDefault();
    setCounter((prev) => prev + 1);
    // добавление объекта строки
    positions.push(new Positions(counter));
    setPositions([...positions]);
}
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
    setPositions([...positions]);
}
// считывание и сохранение цены товара
export function getPrice(event, number, positions, setPositions) {
    // проверка на отрицательное значение
    let price = +event.target.value < 0 ? 0 : +event.target.value;
    positions[number].price = price;
    // рендер
    setPositions([...positions]);
}
// получение позиции
export function getRow(event, number, positions, setPositions, row) {
    highlight(number, positions, setPositions, row);
}
// удаление позиции
export function deleteRow(event, positions, setPositions, row) {
    console.log(row.current);
    event.preventDefault();
    if (row.current != null) {
        // удаление из массива
        positions.splice(row.current - 1, 1);
        // рендер
        setPositions([...positions]);
        // обнуление позиции
        row.current = null;
    }
}
// Подсчёт сумм по накладной и сохранение значения для отправки
export function total(array, field, WB) {
    WB.current[field] = +array.reduce((prev, item) => prev + item[field], 0);
    return WB.current[field];
}
