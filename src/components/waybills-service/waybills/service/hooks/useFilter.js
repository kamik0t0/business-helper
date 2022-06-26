import { useState, useRef } from "react";
import { throttle } from "../scripts/throttle";
import { useSearchParams } from "react-router-dom";

export function useFilter(column, WAYBILLS) {
    const [waybills, setWaybills] = useState(WAYBILLS);
    const [searchParams, setSearchParams] = useSearchParams();

    let isCooldown = useRef(false),
        savedArgs = useRef(),
        savedThis = useRef();

    // фильтрация
    function filterList(event) {
        const inputValue = event.target.value.toLowerCase();

        setSearchParams({ search: inputValue });

        let regexp = new RegExp(inputValue, "g");
        const filtered = WAYBILLS.filter(
            (item) =>
                item[column].toString().toLowerCase().search(regexp) !== -1
        );
        setWaybills(filtered);
    }

    const filter = throttle(filterList, isCooldown, savedArgs, savedThis);

    return [waybills, setWaybills, filter, searchParams];
}
