import React, { useState } from "react";
import {
    sortByDate,
    sortByCounterparty,
    sortBySumm,
    sortById,
} from "../scripts/sorts";
import { IInvoice } from "../../../../../interfaces/invoice";

export function useSort(
    action: ([]: IInvoice[]) => void,
    invoices: IInvoice[]
) {
    const [sortOrder, setSortOrder] = useState(false);

    const sort = (event: React.MouseEvent<HTMLDivElement>): void => {
        const sortField: string = event.currentTarget.innerHTML;

        let sortedItems: IInvoice[];
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
