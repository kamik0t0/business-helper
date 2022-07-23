import { useRef, useContext, useState, useEffect } from "react";
import { PatchContext } from "../../Patch-org";
import { setInputFocus } from "../handlers/set-focus";

export function usePatchField(requisite, fieldIndex) {
    const [focus, setFocus] = useState(false);
    const { getUpdateValue, getInputLengthLimit } = useContext(PatchContext);
    const inputRef = useRef();
    const prevValue = useRef();
    const oldValue = prevValue.current && prevValue.current.innerHTML;

    const Ok = (event) => {
        getInputLengthLimit(requisite.inputValueLength);
        getUpdateValue(event, requisite.inputField, inputRef.current.value) &&
            setFocus();
    };

    const Cancel = () => {
        inputRef.current.value = oldValue;
        setFocus();
    };
    // фокусировка на input
    useEffect(() => {
        const RedactableDiv = document.getElementById(fieldIndex);
        const focusHandler = () => {
            setFocus(true);
        };
        RedactableDiv.addEventListener("click", focusHandler);

        setInputFocus(RedactableDiv);
        return () => {
            RedactableDiv.removeEventListener("click", focusHandler);
        };
    }, [fieldIndex]);

    return [focus, prevValue, inputRef, Ok, Cancel];
}
