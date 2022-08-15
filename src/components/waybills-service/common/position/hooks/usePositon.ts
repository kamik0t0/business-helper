import { IInvoicePosition } from "../../../../../interfaces/invoice";
import {
    useTypedDispatch,
    useTypedSelector,
} from "../../../../../redux/hooks/hooks";
import {
    setInvoicePositions,
    setPositionNumber,
    setInvoice,
} from "../../../../../redux/reducers/InvoiceSlice";
import { highlight } from "../../../../../utils/highlight";
import { assignDataToInvoice } from "../scripts/assignDataToInvoice";
import { assignInvoiceSummary } from "../../scripts";
import { createInvoiePosition } from "../../../../../utils/createInvoicePosition";

export const usePosition = (
    position: IInvoicePosition,
    positionIndex: number
) => {
    const dispatch = useTypedDispatch();
    const { Invoice, InvoicePosition } = useTypedSelector(
        (state) => state.invoicesReducer
    );

    const getNomenclature = (
        event: React.ChangeEvent<HTMLInputElement>
    ): any => {
        if (Invoice !== null && InvoicePosition !== null) {
            console.log(event);

            const positions: IInvoicePosition[] = assignDataToInvoice(
                event,
                InvoicePosition,
                positionIndex,
                "nomenclature"
            );
            dispatch(setInvoicePositions(positions));
        }
    };
    const getQuantity = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (Invoice !== null && InvoicePosition !== null) {
            const positions: IInvoicePosition[] = assignDataToInvoice(
                event,
                InvoicePosition,
                positionIndex,
                "quantity"
            );
            dispatch(setInvoicePositions(positions));
            dispatch(setInvoice(assignInvoiceSummary(Invoice, positions)));
        }
    };

    const getPrice = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (Invoice !== null && InvoicePosition !== null) {
            const positions: IInvoicePosition[] = assignDataToInvoice(
                event,
                InvoicePosition,
                positionIndex,
                "price"
            );
            dispatch(setInvoicePositions(positions));
            dispatch(setInvoice(assignInvoiceSummary(Invoice, positions)));
        }
    };

    const selectPosition = (): void => {
        dispatch(setPositionNumber(positionIndex));

        const highlightedPosition = Object.assign(
            {},
            createInvoiePosition(),
            position,
            {
                highlight: true,
                item_number: positionIndex,
            }
        );

        if (InvoicePosition !== null) {
            dispatch(
                setInvoicePositions(
                    highlight(positionIndex, highlightedPosition, [
                        ...InvoicePosition,
                    ])
                )
            );
        }
    };

    return {
        getNomenclature,
        getQuantity,
        getPrice,
        selectPosition,
    };
};
