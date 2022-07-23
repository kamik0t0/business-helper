import { useContext } from "react";
import { CreateContext } from "../../Create-org";

export function useCreateField(requisite) {
    const { getInputValue } = useContext(CreateContext);

    return (event) => getInputValue(event, requisite.inputField);
}
