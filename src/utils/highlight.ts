interface item {
    highlight: boolean;
}

export function highlightPosition(
    itemIndex: number,
    highlightedItem: item,
    items: item[]
): item[] {
    if (highlightedItem) {
        // выключить подсвеченный элемент
        items.forEach((item: item, index: number) => {
            if (item.highlight) {
                const UnHighlightedItem = Object.assign({}, item, {
                    highlight: false,
                });
                items[index] = UnHighlightedItem;
                return;
            }
        });
        // заменить элемент на его копию но highlight : true
        items.splice(itemIndex, 1, highlightedItem);
    }
    // вернуть массив
    return items;
}

// выделение позиции legacy
// export function highlight(number, array, row) {
//     number++;
//     // клик по выделенной позиции
//     if (row.current === number) return array;
//     // если позиция не была задана
//     if (!row.current) {
//         // получение номера
//         row.current = number;
//         // подсветка
//         array[row.current - 1].highlight = true;
//         return array;
//     }
//     // клик по другой позиции
//     if (row.current !== number && row.current) {
//         if (array[row.current - 1]) {
//             // снятие выделение с уже выделенной позиции
//             array[row.current - 1].highlight = false;
//             // установка выделения другой позиции
//             array[number - 1].highlight = true;
//             // сохранение этой позиции
//             row.current = number;
//         } else {
//             row.current = number;
//         }
//         return array;
//     }
// }
