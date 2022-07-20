interface item {
    highlight: boolean;
}

export function highlightPosition(
    itemIndex: number,
    highlightedItem: item,
    items: item[],
    mutate?: boolean
): item[] {
    if (highlightedItem) {
        // выключить подсвеченный элемент
        items.forEach((item: item, index: number) => {
            if (item.highlight) {
                let UnHighlightedItem;

                if (mutate) {
                    UnHighlightedItem = Object.assign(item, {
                        highlight: false,
                    });
                } else {
                    UnHighlightedItem = Object.assign({}, item, {
                        highlight: false,
                    });
                }

                items[index] = UnHighlightedItem;
                return;
            }
        });
        // заменить элемент на его копию но highlight = true
        items.splice(itemIndex, 1, highlightedItem);
    }
    // вернуть массив
    return items;
}
