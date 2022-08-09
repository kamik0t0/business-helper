import { IInvoicePosition, IInvoice } from "../interfaces/invoice";
import { ICounterparty } from "../interfaces/counterparty";

export function highlight(
    itemIndex: number,
    highlightedItem: IInvoicePosition | IInvoice | ICounterparty,
    items: IInvoicePosition[] | IInvoice[] | ICounterparty[] | any
): IInvoicePosition[] | IInvoice[] | ICounterparty[] | any {
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
