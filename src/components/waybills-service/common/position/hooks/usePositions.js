import { useCallback } from "react";
import { InvoiceItem } from "../../../../../utils/InvoiceItemClass";
import { useTypedSelector } from "../../../../../redux/hooks/hooks";

export function usePositions(positions, setPositions) {
    const { InvoicePositionIndex } = useTypedSelector(
        (state) => state.invoicesReducer
    );

    const addPosition = useCallback(
        (event) => {
            event.preventDefault();
            const arr = positions;
            arr.push(new InvoiceItem(false, null, arr.length + 1));
            setPositions([...arr]);
        },
        [positions.length]
    );

    const deletePosition = useCallback(
        (event) => {
            console.log(InvoicePositionIndex);
            event.preventDefault();
            const arr = [...positions];
            arr.splice(InvoicePositionIndex, 1);
            setPositions([...arr]);
        },
        [InvoicePositionIndex, positions.length]
    );

    return {
        addPosition,
        deletePosition,
    };
}
