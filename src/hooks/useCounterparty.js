import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCounterpartiesAction } from "../redux/counterparties-reducer.js";
import { setCounterpartyAction } from "../redux/counterparty-reducer.js";
import { highlight } from "../utils/highlight.js";

export const useCounterparty = () => {
    const dispatch = useDispatch();
    const COUNTERPARTIES = useSelector(
        (state) => state.setCounterparties.counterparties
    );
    let row = useRef(null);

    const grabCounterparty = (number) => {
        dispatch(setCounterpartyAction(COUNTERPARTIES[number]));
        localStorage.setItem("counterpartyId", COUNTERPARTIES[number].id);
        highlight(
            number,
            COUNTERPARTIES,
            () => dispatch(setCounterpartiesAction([...COUNTERPARTIES])),
            row
        );
    };

    return grabCounterparty;
};
