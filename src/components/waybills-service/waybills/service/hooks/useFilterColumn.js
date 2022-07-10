import { useState } from "react";

export function useFilterColumn(initialColumn = "cl_orgname") {
    const [column, setState] = useState(initialColumn);
    const setColumn = (event) => setState(event.target.value);

    return [column, setColumn];
}
