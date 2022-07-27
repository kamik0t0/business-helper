import { useContext, useState } from "react";
import { CreateContext } from "../../Create-org";
import { IRequisiteView } from "../../../../../interfaces/requisite";
import { IEvent } from "../../../../../interfaces/event";
import { digitInputValidator } from "../../../../../utils/digitInputValidator";

export function useCreateField(requisite: IRequisiteView) {
    const { getInputValue, getInputLengthLimit } = useContext(CreateContext);
    const [inputError, setInputError] = useState(false);

    getInputLengthLimit(requisite.inputValueLength);

    const isInputError = (event: IEvent) =>
        digitInputValidator(
            event,
            requisite.isNumber,
            requisite?.inputValueLength
        )
            ? setInputError(true)
            : setInputError(false);
    return [
        (event: IEvent) => getInputValue(event, requisite.inputField),
        inputError,
        isInputError,
    ];
}
