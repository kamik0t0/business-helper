import { useState } from "react";
import {
    sortByDate,
    sortByCounterparty,
    sortBySumm,
    sortById,
} from "../scripts/sorts";

export function useSort(action, invoices) {
    const [sortOrder, setSortOrder] = useState(false);

    const sort = (event) => {
        const sortField = event.target.innerHTML;
        let sortedItems;
        switch (sortField) {
            case "Дата":
                sortedItems = sortByDate(invoices, sortOrder);
                break;
            case "Номер":
                sortedItems = sortById(invoices, sortOrder);
                break;
            case "Покупатель":
                sortedItems = sortByCounterparty(invoices, sortOrder);
                break;
            case "Продавец":
                sortedItems = sortByCounterparty(invoices, sortOrder);
                break;
            case "Сумма":
                sortedItems = sortBySumm(invoices, sortOrder);
                break;

            default:
                sortedItems = sortBySumm(invoices, sortOrder);
        }
        setSortOrder(!sortOrder);
        action(sortedItems);
    };

    return { sort, sortOrder };
}
