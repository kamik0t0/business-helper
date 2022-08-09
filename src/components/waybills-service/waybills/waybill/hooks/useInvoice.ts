import {
    useTypedDispatch,
    useTypedSelector,
} from "../../../../../redux/hooks/hooks";
import { setInvoice } from "../../../../../redux/reducers/InvoiceSlice";
import { highlight } from "../../../../../utils/highlight";
import { IInvoice } from "../../../../../interfaces/invoice";
import { InvoiceConstructor } from "../../../../../interfaces/invoice";
import { makeDefaultDate } from "../../../common/scripts";

export const useInvoice = (
    invoiceIdnex: number,
    action: ([]: IInvoice[]) => void,
    invoice: IInvoice,
    invoices: IInvoice[]
) => {
    const dispatch = useTypedDispatch();
    const { counterparty: cl } = useTypedSelector(
        (state) => state.counterpartyReducer
    );
    const { org } = useTypedSelector((state) => state.orgsReducer);

    const selectInvoice = () => {
        const { payload: highlightedInvoice } = dispatch(
            setInvoice(
                Object.assign({}, invoice, {
                    highlight: true,
                })
            )
        );
        if (highlightedInvoice !== null) {
            const invoicesWithHighlight = highlight(
                invoiceIdnex,
                highlightedInvoice,
                [...invoices]
            ) as IInvoice[];
            action(invoicesWithHighlight);
        }
    };

    const createNewInvoice = () =>
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

    return [selectInvoice, createNewInvoice];
};
