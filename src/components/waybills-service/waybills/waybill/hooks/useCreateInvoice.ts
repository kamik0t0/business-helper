import { InvoiceConstructor } from "../../../../../interfaces/invoice";
import {
    useTypedDispatch,
    useTypedSelector,
} from "../../../../../redux/hooks/hooks";
import { setCounterparty } from "../../../../../redux/reducers/counterpartiesSlice";
import { setInvoice } from "../../../../../redux/reducers/InvoiceSlice";
import { makeDefaultDate } from "../../../common/scripts";

export const useCreateInvoice = () => {
    const dispatch = useTypedDispatch();
    const { counterparty: cl } = useTypedSelector(
        (state) => state.counterpartyReducer
    );
    const { org } = useTypedSelector((state) => state.orgsReducer);

    const createNewInvoice = () => {
        dispatch(
            setInvoice(
                Object.assign(
                    {},
                    new InvoiceConstructor(
                        null,
                        cl?.id || null,
                        org?.id || null,
                        org?.orgname || null,
                        makeDefaultDate(),
                        org?.inn || null,
                        org?.kpp || null,
                        org?.address || null,
                        org?.opf || null,
                        cl?.orgname || null,
                        cl?.inn || null,
                        cl?.kpp || null,
                        cl?.opf || null,
                        cl?.address || null,
                        [],
                        0,
                        0,
                        0,
                        ""
                    )
                )
            )
        );
        dispatch(setCounterparty(null));
    };

    return createNewInvoice;
};
