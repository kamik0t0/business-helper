import { useState } from "react";
import { IEvent } from "../../../../../interfaces/event";
import { IRequisiteViewWithLength } from "../../../../../interfaces/requisite";
import { digitInputValidator } from "../../../../../utils/digitInputValidator";

export function useInputError(requisite: IRequisiteViewWithLength) {
    // const [inputError, setInputError] = useState(Boolean);
    // const isInputError = (event: IEvent) => {
    //     return digitInputValidator(
    //         requisite.value,
    //         event,
    //         requisite.isNumber,
    //         requisite?.inputValueLength
    //     )
    //         ? setInputError(true)
    //         : setInputError(false);
    // };
    // return [inputError, isInputError];
}
