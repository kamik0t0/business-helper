import { useRef } from "react";

export function usePatchField(requisite, setInputValue, setFocus) {
    // ref для чтения значения текущего значения и подстановки в input
    let prevValue = useRef();
    // ref для чтения нового значения из input
    let currentValue = useRef();
    let oldValue = prevValue.current && prevValue.current.innerHTML;

    const Ok = (event) => {
        setInputValue(event, requisite.field, currentValue.current.value) &&
            setFocus();
    };

    const Cancel = () => {
        currentValue.current.value = oldValue;
        setFocus();
    };

    return [prevValue, currentValue, Ok, Cancel];
}
