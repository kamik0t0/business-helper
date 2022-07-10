import { useState } from "react";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";
import {
    sortByDate,
    sortByCounterparty,
    sortBySumm,
    sortById,
} from "../scripts/sorts";

export function useSort(action, waybills) {
    const dispatch = useTypedDispatch();
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
        dispatch(action(sortedItems));
    };

    return sort;
}
