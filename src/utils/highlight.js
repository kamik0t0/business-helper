// выделение позиции
export function highlight(number, array, setArray, row) {
    number++;
    // если позиция не была задана
    if (!row.current) {
        // получение номера
        row.current = number;
        // подсветка
        array[row.current - 1].highlight = true;
        // рендер
        setArray();
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
        setArray();
        return;
    }
}
