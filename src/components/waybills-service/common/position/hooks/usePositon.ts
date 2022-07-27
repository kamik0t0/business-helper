import { InvoiceItem } from "../../../../../utils/InvoiceItemClass";
import { highlightPosition } from "../../../../../utils/highlight";
import {
    useTypedDispatch,
    useTypedSelector,
} from "../../../../../redux/hooks/hooks";
import { setPosition } from "../../../../../redux/reducers/InvoiceSlice";
import { setInvoicePositionCalculations } from "../../scripts";
import { IEvent } from "../../../../../interfaces/event";
import { IInvoiceItem } from "../../../../../interfaces/invoice";

export const usePosition = (
    position: IInvoiceItem,
    positionIndex: number,
    setPositions: ([]) => any,
    positions: IInvoiceItem[]
) => {
    const dispatch = useTypedDispatch();
    const currentIndex = useTypedSelector(
        (state) => state.invoicesReducer.InvoicePositionIndex
    );

    const getNomenclature = (event: IEvent): void =>
        setPositions(
            setInvoicePositionCalculations(
                event,
                positionIndex,
                [...positions],
                "nomenclature"
            )
        );
    const getQuantity = (event: IEvent): void =>
        setPositions(
            setInvoicePositionCalculations(
                event,
                positionIndex,
                [...positions],
                "quantity"
            )
        );
    const getPrice = (event: IEvent): void =>
        setPositions(
            setInvoicePositionCalculations(
                event,
                positionIndex,
                [...positions],
                "price"
            )
        );

    const selectPosition = (): void => {
        if (currentIndex === positionIndex) return;
        dispatch(setPosition(positionIndex));

        const highlightedPosition = Object.assign(new InvoiceItem(), position, {
            highlight: true,
        });

        setPositions(
            highlightPosition(
                positionIndex,
                highlightedPosition,
                [...positions],
                true
            )
        );
    };

    return {
        getNomenclature,
        getQuantity,
        getPrice,
        selectPosition,
    };
};
