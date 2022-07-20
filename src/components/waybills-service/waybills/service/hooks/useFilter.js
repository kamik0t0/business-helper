import { useRef } from "react";
import { throttle } from "../scripts/throttle";
import { useSearchParams } from "react-router-dom";
import { useFilterColumn } from "./useFilterColumn";

export function useFilter(invoices, setInvoices) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [column, setColumn] = useFilterColumn("cl_orgname");

    const startSearch = searchParams.get("search") || "";

    let isCooldown = useRef(false),
        savedArgs = useRef(),
        savedThis = useRef();

    // фильтрация
    function filterList(event) {
        const inputValue = event.target.value.toLowerCase();

        setSearchParams({ search: inputValue });

        let regexp = new RegExp(inputValue, "g");
        const filtered = invoices.filter(
            (item) =>
                item[column].toString().toLowerCase().search(regexp) !== -1
        );
        setInvoices(filtered);
    }

    const filter = throttle(filterList, isCooldown, savedArgs, savedThis);

    return [column, setColumn, filter, startSearch];
}
