import { useContext, useState } from "react";
import { IRequisiteView } from "../../../../../interfaces/requisite";
import {
    digitInputValidator,
    isError,
} from "../../../../../utils/digitInputValidator";
import { PatchProvider } from "../../Patch-org";
import { doesPropertyShouldUpdate } from "../handlers/InputValueHandler";

export function usePatchField(
    requisite: IRequisiteView
): [
    boolean,
    boolean,
    () => void,
    () => void,
    () => void,
    (event: React.ChangeEvent<HTMLInputElement>) => void,
    (event: React.ChangeEvent<HTMLInputElement>) => void,
    (event: React.ChangeEvent<HTMLInputElement>) => void
] {
    const [focus, setFocus] = useState<boolean>(false);
    const [oldValue, setOldValue] = useState(requisite.value);

    const getInputValue = useContext(PatchProvider)!;

    const error = isError(
        requisite.value as string,
        requisite?.inputValueLength as number
    );

    const inputValidation = (event: React.ChangeEvent<HTMLInputElement>) =>
        digitInputValidator(event, requisite.isNumber);

    const updateProp = () =>
        doesPropertyShouldUpdate(
            requisite.value,
            requisite?.inputValueLength!
        ) && setFocus(false);

    const cancel = () => {
        getInputValue(oldValue, requisite.inputField);
        setFocus(false);
    };

    const getValue = (event: React.ChangeEvent<HTMLInputElement>) =>
        getInputValue(event.target.value, requisite.inputField);

    const saveOldValues = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.select();
        setOldValue(requisite.value);
    };

    const switchDivToText = () => setFocus(!focus);

    return [
        focus,
        error,
        updateProp,
        cancel,
        switchDivToText,
        inputValidation,
        getValue,
        saveOldValues,
    ];
}
