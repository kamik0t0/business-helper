import { InvoiceItem } from "../../../../../utils/InvoiceItemClass";
import { highlightPosition } from "../../../../../utils/highlight";
import {
    useTypedDispatch,
    useTypedSelector,
} from "../../../../../redux/hooks/hooks";
import { setPosition } from "../../../../../redux/reducers/InvoiceSlice";
import { setInvoicePositionCalculations } from "../../scripts";

export const usePosition = (
    position,
    positionIndex,
    setPositions,
    positions
) => {
    const dispatch = useTypedDispatch();
    const currentIndex = useTypedSelector(
        (state) => state.invoicesReducer.InvoicePositionIndex
    );

    const getInvoicePositionCalculations = (event, number, prop) => {
        const arr = setInvoicePositionCalculations(
            event,
            number,
            [...positions],
            prop
        );
        setPositions([...arr]);
    };

    const getNomenclature = (event) =>
        getInvoicePositionCalculations(event, positionIndex, "nomenclature");
    const getQuantity = (event) =>
        getInvoicePositionCalculations(event, positionIndex, "quantity");
    const getPrice = (event) =>
        getInvoicePositionCalculations(event, positionIndex, "price");

    const selectPosition = () => {
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
