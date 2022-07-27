import { useRef, useContext, useState, useEffect } from "react";
import { PatchContext } from "../../Patch-org";
import { setInputFocus } from "../handlers/set-focus";
import { IRequisiteView } from "../../../../../interfaces/requisite";
import { IEvent } from "../../../../../interfaces/event";
import { MutableRefObject } from "react";
import { digitInputValidator } from "../../../../../utils/digitInputValidator";

export function usePatchField(requisite: IRequisiteView, fieldIndex: number) {
    const [focus, setFocus] = useState(false);
    const [inputError, setInputError] = useState(false);
    const { getUpdateValue, getInputLengthLimit } = useContext(PatchContext);

    const inputRef: MutableRefObject<HTMLInputElement | undefined> = useRef();
    const prevValue: MutableRefObject<HTMLInputElement | undefined> = useRef();

    const isInputError = (event: IEvent) =>
        digitInputValidator(
            event,
            requisite.isNumber,
            requisite?.inputValueLength
        )
            ? setInputError(true)
            : setInputError(false);

    const Ok = (event: IEvent) => {
        getInputLengthLimit(requisite.inputValueLength);
        if (inputRef.current?.value !== undefined) {
            getUpdateValue(
                event,
                inputRef.current?.value,
                requisite.inputField
            ) && setFocus(false);
        }
    };

    const Cancel = () => {
        if (inputRef.current != undefined && prevValue.current != undefined) {
            inputRef.current.value = requisite.value as string;
            setFocus(false);
        } else if (inputRef.current !== undefined) {
            inputRef.current.value = requisite.value as string;
            setFocus(false);
        }
    };
    // фокусировка на input
    useEffect(() => {
        const RedactableDiv: HTMLInputElement | null = document.getElementById(
            fieldIndex.toString()
        ) as HTMLInputElement;

        const focusHandler = () => {
            setFocus(true);
        };

        RedactableDiv?.addEventListener("click", focusHandler);

        setInputFocus(RedactableDiv || null);

        return () => {
            RedactableDiv?.removeEventListener("click", focusHandler);
        };
    }, [fieldIndex]);

    return [focus, prevValue, inputRef, Ok, Cancel, inputError, isInputError];
}
