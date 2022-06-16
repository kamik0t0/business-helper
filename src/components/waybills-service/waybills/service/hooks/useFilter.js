import { useState, useRef } from "react";
import { throttle } from "../scripts/throttle";

export function useFilter(column, WAYBILLS) {
    const [waybills, setWaybills] = useState(WAYBILLS);

    let isCooldown = useRef(false),
        savedArgs = useRef(),
        savedThis = useRef();

    // фильтрация
    function filterList(event) {
        let regexp = new RegExp(`${event.target.value.toLowerCase()}`, "g");
        const filtered = WAYBILLS.filter(
            (item) =>
                item[column].toString().toLowerCase().search(regexp) !== -1
        );
        setWaybills(filtered);
    }

    const filter = throttle(filterList, isCooldown, savedArgs, savedThis);

    return [waybills, setWaybills, filter];
}
