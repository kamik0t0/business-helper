export function getValue(
    event,
    number,
    counterparties,
    setCounterparties,
    row,
    setCounterparty
) {
    localStorage.setItem(
        "counterparty",
        JSON.stringify(counterparties[number - 1])
    );
    localStorage.setItem("counterpartyId", counterparties[number - 1].id);
    highlight(number, counterparties, setCounterparties, row);
    let counterparty = JSON.parse(localStorage.getItem("counterparty"));
    setCounterparty(counterparty);
}

// выделение позиции
export function highlight(number, array, setCounterparties, row) {
    console.log(array);
    // если позиция не была задана
    if (!row.current) {
        // получение номера
        row.current = number;
        // подсветка
        array[row.current - 1].highlight = true;
        // рендер
        setCounterparties([...array]);
        return;
    }
    // клик по выделенной позиции
    if (row.current === number) return;
    // клик по другой позиции
    if (row.current !== number && row.current) {
        if (array[row.current - 1]) {
            // снятие выделение с уже выделенной позиции
            array[row.current - 1].highlight = false;
            // установка выделения другой позиции
            array[number - 1].highlight = true;
            // сохранение этой позиции
            row.current = number;
        } else {
            row.current = number;
        }
        // рендер
        setCounterparties([...array]);
        return;
    }
}
