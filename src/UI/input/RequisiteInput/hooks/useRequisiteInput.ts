import { useState } from "react";
import { IEvent } from "../../../../interfaces/event";

export const useRequisiteInput = (length: number, isNumber: boolean) => {
    const [inputError, setInputError] = useState(false);

    const digitInputValidator = (event: IEvent) => {
        event.preventDefault();
        if (!isNumber) return;

        const inputData = event.target.value;
        event.target.value = inputData.toString().replace(/[^0-9]/g, "");

        if (typeof inputData === "string" && inputData.length === length) {
            setInputError(false);
        } else {
            setInputError(true);
        }
    };

    return [inputError, digitInputValidator];
};
