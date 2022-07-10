import { useTypedDispatch, useTypedSelector } from "../redux/hooks/hooks";
import { setCounterparty } from "../redux/reducers/counterpartiesSlice";
import { setCounterparties } from "../redux/reducers/counterpartiesSlice";
import { highlightPosition } from "../utils/highlight.ts";

export const useCounterparty = (counterpartyIndex, counterparty) => {
    const dispatch = useTypedDispatch();
    const COUNTERPARTIES = useTypedSelector(
        (state) => state.counterpartyReducer.counterparties
    );

    const selectCounterparty = () => {
        const { payload: highlightedCounterparty } = dispatch(
            setCounterparty(
                Object.assign({}, counterparty, {
                    highlight: true,
                })
            )
        );
        const counterparties = highlightPosition(
            counterpartyIndex,
            highlightedCounterparty,
            [...COUNTERPARTIES]
        );

        dispatch(setCounterparties(counterparties));
    };

    return selectCounterparty;
};
