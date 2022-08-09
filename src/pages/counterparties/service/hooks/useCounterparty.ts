import {
    useTypedDispatch,
    useTypedSelector,
} from "../../../../redux/hooks/hooks";
import {
    setCounterparty,
    setCounterparties,
} from "../../../../redux/reducers/counterpartiesSlice";
import { highlight } from "../../../../utils/highlight";
import { ICounterparty } from "../../../../interfaces/counterparty";

export const useCounterparty = (
    counterpartyIndex: number,
    counterparty: ICounterparty
) => {
    const dispatch = useTypedDispatch();
    const COUNTERPARTIES = useTypedSelector(
        (state) => state.counterpartyReducer.counterparties
    );
    const prevCounterparty = useTypedSelector(
        (state) => state.counterpartyReducer.counterparty
    );

    if (prevCounterparty && prevCounterparty.id === counterparty.id) return;

    const selectCounterparty = () => {
        const { payload: highlightedCounterparty } = dispatch(
            setCounterparty(
                Object.assign({}, counterparty, {
                    highlight: true,
                })
            )
        );

        const counterparties = highlight(
            counterpartyIndex,
            highlightedCounterparty,
            [...COUNTERPARTIES]
        ) as ICounterparty[];
        dispatch(setCounterparties(counterparties));
    };

    return selectCounterparty;
};
