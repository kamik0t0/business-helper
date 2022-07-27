import {
    useTypedDispatch,
    useTypedSelector,
} from "../../../../../redux/hooks/hooks";
import { setInvoice } from "../../../../../redux/reducers/InvoiceSlice";
import { highlightPosition } from "../../../../../utils/highlight";
import { IInvoice } from "../../../../../interfaces/invoice";

export const useInvoice = (
    invoiceIdnex: number,
    action: ([]: IInvoice[]) => void,
    invoice: IInvoice,
    invoices: IInvoice[]
) => {
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

        const invoicesWithHighlight = highlightPosition(
            invoiceIdnex,
            highlightedInvoice,
            [...invoices]
        ) as IInvoice[];
        action(invoicesWithHighlight);
    };
    return selectInvoice;
};
