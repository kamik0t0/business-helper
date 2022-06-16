import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    sortByDate,
    sortByCounterparty,
    sortBySumm,
    sortById,
} from "../scripts/sorts";

export function useSort(type, waybills) {
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState(false);

    const sort = (event) => {
        const sortField = event.target.innerHTML;
        let sortedItems;
        switch (sortField) {
            case "Дата":
                sortedItems = sortByDate(waybills, sortOrder);
                break;
            case "Номер":
                sortedItems = sortById(waybills, sortOrder);
                break;
            case "Покупатель":
                sortedItems = sortByCounterparty(waybills, sortOrder);
                break;
            case "Продавец":
                sortedItems = sortByCounterparty(waybills, sortOrder);
                break;
            case "Сумма":
                sortedItems = sortBySumm(waybills, sortOrder);
                break;
        }

        setSortOrder(!sortOrder);
        dispatch({
            type,
            payload: sortedItems,
        });
    };

    return sort;
}
