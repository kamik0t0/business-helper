import { useState, useRef } from "react";
import { throttle } from "../scripts/throttle";
import { useSearchParams } from "react-router-dom";

export function useFilter(WAYBILLS) {
    const [waybills, setWaybills] = useState([...WAYBILLS]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [column, setState] = useState("cl_orgname");
    const setColumn = (event) => setState(event.target.value);
    const startSearch = searchParams.get("search") || "";

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

    return [column, setColumn, waybills, setWaybills, filter, startSearch];
}
