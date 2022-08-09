import { useCallback } from "react";
import { IEvent } from "../../../../../interfaces/event";
import {
    useTypedDispatch,
    useTypedSelector,
} from "../../../../../redux/hooks/hooks";
import {
    addInvoicePosition,
    deleteInvoicePosition,
} from "../../../../../redux/reducers/InvoiceSlice";
import { createInvoiePosition } from "../../../../../utils/createInvoicePosition";

export function usePositions() {
    const dispatch = useTypedDispatch();
    const { InvoicePositionIndex, InvoicePosition } = useTypedSelector(
        (state) => state.invoicesReducer
    );

    const addPosition = (event: IEvent) => {
        event.preventDefault();
        dispatch(
            addInvoicePosition(
                Object.assign({}, createInvoiePosition(), {
                    item_number: InvoicePosition?.length || null,
                })
            )
        );
    };

    const deletePosition = useCallback(
        (event: IEvent) => {
            event.preventDefault();
            InvoicePosition != null &&
                InvoicePositionIndex != null &&
                dispatch(deleteInvoicePosition(InvoicePositionIndex));
        },
        [InvoicePositionIndex, InvoicePosition?.length]
    );

    return [addPosition, deletePosition];
}
