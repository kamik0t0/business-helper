import {
    isError,
    digitInputValidator,
} from "../../../../../utils/digitInputValidator";
import { IRequisiteViewWithLength } from "../../../../../interfaces/requisite";
import { IEvent } from "../../../../../interfaces/event";
import { useContext } from "react";
import { TextFieldContext } from "../../Create-org";

export const useInputField = (
    requisite: IRequisiteViewWithLength,
    fieldIndex: number
) => {
    const { getInputIndex, getInputValue } = useContext(TextFieldContext);

    const getIndex = () => getInputIndex(fieldIndex);

    const getValue = (event: IEvent) =>
        getInputValue(event, requisite.inputField, requisite?.inputValueLength);

    const error = isError(
        requisite.value as string,
        requisite?.inputValueLength
    );

    const inputValidation = (event: IEvent) =>
        digitInputValidator(event, requisite.isNumber);

    return [getIndex, getValue, error, inputValidation];
};
