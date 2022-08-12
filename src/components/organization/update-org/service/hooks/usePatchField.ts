import { useContext, useState } from "react";
import { IEvent } from "../../../../../interfaces/event";
import { IRequisiteViewWithLength } from "../../../../../interfaces/requisite";
import {
    digitInputValidator,
    isError,
} from "../../../../../utils/digitInputValidator";
import { PatchContext } from "../../Patch-org";
import { doesPropertyShouldUpdate } from "../handlers/InputValueHandler";

export function usePatchField(requisite: IRequisiteViewWithLength) {
    const [focus, setFocus] = useState(false);
    const [oldValue, setOldValue] = useState(requisite.value);

    const getInputValue = useContext(PatchContext);

    const error = isError(
        requisite.value as string,
        requisite?.inputValueLength
    );

    const inputValidation = (event: IEvent) =>
        digitInputValidator(event, requisite.isNumber);

    const updateProp = () =>
        doesPropertyShouldUpdate(requisite.value, requisite.inputValueLength) &&
        setFocus(false);

    const Cancel = () => {
        getInputValue(
            oldValue,
            requisite.inputField,
            requisite?.inputValueLength
        );
        setFocus(false);
    };

    const getValue = (event: IEvent) =>
        getInputValue(
            event.target.value,
            requisite.inputField,
            requisite?.inputValueLength
        );

    const saveOldValues = () => setOldValue(requisite.value);

    const switchField = () => setFocus(!focus);

    return [
        focus,
        updateProp,
        Cancel,
        error,
        inputValidation,
        getValue,
        saveOldValues,
        switchField,
    ];
}
