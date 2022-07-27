import { useCallback } from "react";
import { IEvent } from "../../../../../interfaces/event";
import { IInvoiceItem } from "../../../../../interfaces/invoice";
import { useTypedSelector } from "../../../../../redux/hooks/hooks";
import { InvoiceItem } from "../../../../../utils/InvoiceItemClass";

export function usePositions(
    positions: IInvoiceItem[],
    setPositions: ([]) => any
) {
    const { InvoicePositionIndex } = useTypedSelector(
        (state) => state.invoicesReducer
    );

    const addPosition = useCallback(
        (event: IEvent) => {
            event.preventDefault();
            const arr = positions;
            arr.push(new InvoiceItem(false, null, arr.length + 1));
            setPositions([...arr]);
        },
        [positions.length]
    );

    const deletePosition = useCallback(
        (event: IEvent) => {
            event.preventDefault();
            const arr = [...positions];
            InvoicePositionIndex && arr.splice(InvoicePositionIndex, 1);
            setPositions([...arr]);
        },
        [InvoicePositionIndex, positions.length]
    );

    return [addPosition, deletePosition];
}
