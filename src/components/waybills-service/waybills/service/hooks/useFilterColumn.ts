import React, { useState } from "react";

export function useFilterColumn(initialColumn: string = "cl_orgname"): {
    column: string;
    setColumn: (event: React.ChangeEvent<HTMLSelectElement>) => void;
} {
    const [column, setState] = useState<string>(initialColumn);
    const setColumn = (event: React.ChangeEvent<HTMLSelectElement>) =>
        setState(event.target.value as string);

    return { column, setColumn };
}
