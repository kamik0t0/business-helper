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

    const getNomenclature = (event) =>
        setPositions(
            setInvoicePositionCalculations(
                event,
                positionIndex,
                [...positions],
                "nomenclature"
            )
        );
    const getQuantity = (event) =>
        setPositions(
            setInvoicePositionCalculations(
                event,
                positionIndex,
                [...positions],
                "quantity"
            )
        );
    const getPrice = (event) =>
        setPositions(
            setInvoicePositionCalculations(
                event,
                positionIndex,
                [...positions],
                "price"
            )
        );

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
