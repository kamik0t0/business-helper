import {
    useTypedDispatch,
    useTypedSelector,
} from "../../../../../redux/hooks/hooks";
import { setInvoice } from "../../../../../redux/reducers/InvoiceSlice";
import { highlightPosition } from "../../../../../utils/highlight.ts";

export const useInvoice = (invoiceIdnex, action, invoice, INVOICES) => {
    const dispatch = useTypedDispatch();
    const prevInvoice = useTypedSelector(
        (state) => state.invoicesReducer.Invoice
    );

    if (prevInvoice && prevInvoice.id === invoice.id) return;

    const selectInvoice = () => {
        const { payload: highlightedInvoice } = dispatch(
            setInvoice(
                Object.assign({}, invoice, {
                    highlight: true,
                })
            )
        );

        const invoices = highlightPosition(invoiceIdnex, highlightedInvoice, [
            ...INVOICES,
        ]);
        action(invoices);
    };
    return selectInvoice;
};
