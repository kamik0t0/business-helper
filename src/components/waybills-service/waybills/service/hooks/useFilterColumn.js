import { useState } from "react";

export function useFilterColumn(initialColumn = "cl_orgname") {
    const [column, setColumn] = useState(initialColumn);
    const filterColumn = (event) => setColumn(event.target.value);

    return [column, filterColumn];
}
