import { useState, useEffect } from "react";
import { setInputFocus } from "../../organizations-service/update-org/service/handlers/set-focus";

export function useInput(fieldNumber) {
    const [requisiteInput, setRequisiteInput] = useState(false);

    useEffect(() => {
        // фокусировка на input
        const input = document.getElementById(fieldNumber);
        const focusHandler = () => {
            setRequisiteInput(true);
        };
        input.addEventListener("click", focusHandler);

        setInputFocus(input);
        // очистка ресурсов
        return () => {
            input.removeEventListener("click", focusHandler);
        };
    }, []);

    return [requisiteInput, setRequisiteInput];
}
