export function highlight<Item>(
    itemIndex: number,
    highlightedItem: Item | null,
    items: Item[]
): Item[] {
    if (highlightedItem) {
        // выключить подсвеченный элемент
        items.forEach((item: any, index: number) => {
            if (item.highlight) {
                const UnHighlightedItem = Object.assign({}, item, {
                    highlight: false,
                });
                items[index] = UnHighlightedItem;
                return;
            }
        });
        // заменить на выделенный элемент
        items.splice(itemIndex, 1, highlightedItem);
    }
    // вернуть массив
    return items;
}
