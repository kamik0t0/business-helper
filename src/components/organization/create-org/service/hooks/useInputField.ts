import {
    isError,
    digitInputValidator,
} from "../../../../../utils/digitInputValidator";
import { IRequisiteView } from "../../../../../interfaces/requisite";
import { useContext } from "react";
import { TextFieldContext } from "../../Create-org";

export const useInputField = (
    requisite: IRequisiteView,
    fieldIndex: number
): [
    () => void,
    (event: React.ChangeEvent<HTMLInputElement>) => void,
    boolean,
    (event: React.ChangeEvent<HTMLInputElement>) => void
] => {
    const { getInputIndex, getInputValue } = useContext(TextFieldContext)!;

    const getIndex = () => getInputIndex(fieldIndex);

    const getValue = (event: React.ChangeEvent<HTMLInputElement>) =>
        getInputValue(event, requisite.inputField, requisite?.inputValueLength);

    const error = isError(
        requisite.value as string,
        requisite?.inputValueLength
    );

    const inputValidation = (event: React.ChangeEvent<HTMLInputElement>) =>
        digitInputValidator(event, requisite.isNumber);

    return [getIndex, getValue, error, inputValidation];
};
