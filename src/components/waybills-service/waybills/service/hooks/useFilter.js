import { useState, useRef } from "react";
import { throttle } from "../scripts/throttle";
import { useSearchParams } from "react-router-dom";

export function useFilter(column, WAYBILLS) {
    const [waybills, setWaybills] = useState(WAYBILLS);
    const [, setSearchParams] = useSearchParams();

    let isCooldown = useRef(false),
        savedArgs = useRef(),
        savedThis = useRef();

    // фильтрация
    function filterList(event) {
        const inputValue = event.target.value;
        let regexp = new RegExp(`${inputValue.toLowerCase()}`, "g");
        const filtered = WAYBILLS.filter(
            (item) =>
                item[column].toString().toLowerCase().search(regexp) !== -1
        );
        setWaybills(filtered);
        setSearchParams({ search: inputValue });
    }

    const filter = throttle(filterList, isCooldown, savedArgs, savedThis);

    return [waybills, setWaybills, filter];
}
