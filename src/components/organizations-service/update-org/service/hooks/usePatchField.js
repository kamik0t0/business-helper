import { useState, useEffect, useRef, useContext } from "react";
import { PatchContext } from "../../Patch-org";
import { setInputFocus } from "../handlers/set-focus";

export function usePatchField(requisite, number) {
    const { getInputValue, setInputValue } = useContext(PatchContext);
    const [focus, setFocus] = useState(false);
    // ref для чтения значения текущего значения и подстановки в input
    let prevValue = useRef();
    // ref для чтения нового значения из input
    let currentValue = useRef();
    let oldValue = prevValue.current && prevValue.current.innerHTML;

    useEffect(() => {
        // фокусировка на input
        const input = document.getElementById(number);
        const focusHandler = () => {
            setFocus(true);
        };
        input.addEventListener("click", focusHandler);

        setInputFocus(input);
        // очистка ресурсов
        return () => {
            input.removeEventListener("click", focusHandler);
        };
    }, []);

    const Ok = (event) => {
        setInputValue(event, requisite.field, currentValue.current.value) &&
            setFocus((focus) => !focus);
    };

    const Cancel = () => {
        currentValue.current.value = oldValue;
        setFocus((focus) => !focus);
    };

    return [focus, getInputValue, prevValue, currentValue, Ok, Cancel];
}
