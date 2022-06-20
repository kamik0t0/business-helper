import { useState, useRef } from "react";
import { PositionClass } from "../../../../utils/wbpositionClass";
import { highlight } from "../../../../utils/highlight";
import { getValue } from "../../common/scripts";

export function useCreatePositions() {
    const [positions, setPositions] = useState([]);
    const [counter, setCounter] = useState(0);
    // useRef - запоминаем значение при ререндеринге
    let row = useRef(null);

    const addPosition = (event) => {
        event.preventDefault();
        const arr = positions;
        arr.push(new PositionClass(counter));
        setCounter((prev) => prev + 1);
        setPositions([...arr]);
    };

    const deletePosition = (event) => {
        event.preventDefault();
        const arr = positions;
        if (row.current != null) {
            arr.splice(row.current - 1, 1);
            setPositions([...arr]);
            row.current = null;
        }
    };

    const highlightPosition = (event, number) => {
        const arr = highlight(number, [...positions], row);
        setPositions([...arr]);
    };

    const getPositionValues = (event, number, prop) => {
        const arr = getValue(event, number, [...positions], prop);
        setPositions([...arr]);
    };

    return [
        positions,
        addPosition,
        deletePosition,
        highlightPosition,
        getPositionValues,
    ];
}
