import { useRef, useContext, useState, useEffect } from "react";
import { PatchContext } from "../../update-org/Patch-org";
import { setInputFocus } from "../../update-org/service/handlers/set-focus";

export function usePatchField(requisite, fieldNumber) {
    const [focus, setFocus] = useState(false);
    const { getUpdateValue } = useContext(PatchContext);
    // ref для чтения значения текущего значения и подстановки в input
    const prevValue = useRef();
    // ref для чтения нового значения из input
    const newValue = useRef();
    let oldValue = prevValue.current && prevValue.current.innerHTML;

    const Ok = (event) => {
        getUpdateValue(event, requisite.field, newValue.current.value) &&
            setFocus();
    };

    const Cancel = () => {
        newValue.current.value = oldValue;
        setFocus();
    };

    useEffect(() => {
        // фокусировка на input
        const input = document.getElementById(fieldNumber);
        const focusHandler = () => {
            setFocus(true);
        };
        input.addEventListener("click", focusHandler);

        setInputFocus(input);
        return () => {
            input.removeEventListener("click", focusHandler);
        };
    }, [fieldNumber]);

    return [focus, prevValue, newValue, Ok, Cancel];
}
