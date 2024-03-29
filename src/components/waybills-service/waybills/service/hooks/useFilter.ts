import React, { useRef } from "react";
import { throttle } from "../scripts/throttle";
import { useFilterColumn } from "./useFilterColumn";
import { IInvoice } from "../../../../../interfaces/invoice";
import { MutableRefObject } from "react";
import { useSearchParams } from "react-router-dom";

export function useFilter(
    invoices: IInvoice[],
    setInvoices: ([]) => void
): any[] {
    const [searchParams, setSearchParams] = useSearchParams();
    const { column, setColumn } = useFilterColumn("cl_orgname");

    const startSearch = searchParams.get("search") || "";

    let isCooldown: MutableRefObject<boolean> = useRef(false),
        savedArgs = useRef(),
        savedThis = useRef();
    // фильтрация
    function filterList(event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value.toString().toLowerCase();

        setSearchParams({ search: inputValue });

        let regexp = new RegExp(inputValue, "g");

        const filtered = invoices.filter(
            (item: IInvoice) =>
                item[column]!.toString().toLowerCase().search(regexp) !== -1
        );
        setInvoices(filtered);
    }

    const filter = throttle(filterList, isCooldown, savedArgs, savedThis);
    return [column, setColumn, filter, startSearch];
}
