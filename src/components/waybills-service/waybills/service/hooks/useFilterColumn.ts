import { useState } from "react";
import { IEvent } from "../../../../../interfaces/event";

export function useFilterColumn(initialColumn: string = "cl_orgname"): {
    column: string;
    setColumn: (event: IEvent) => void;
} {
    const [column, setState] = useState(initialColumn);
    const setColumn = (event: IEvent) => setState(event.target.value as string);

    return { column, setColumn };
}
