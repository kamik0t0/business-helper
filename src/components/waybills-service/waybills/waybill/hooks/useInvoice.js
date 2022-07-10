import { useTypedDispatch } from "../../../../../redux/hooks/hooks";
import { setInvoice } from "../../../../../redux/reducers/InvoiceSlice";
import { highlightPosition } from "../../../../../utils/highlight.ts";

export const useInvoice = (invoiceIdnex, action, invoice, INVOICES) => {
    const dispatch = useTypedDispatch();

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
        dispatch(action([...invoices]));
    };
    return selectInvoice;
};
