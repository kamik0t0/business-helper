import { IInvoice } from "../../../../../interfaces/invoice";
import { useTypedDispatch } from "../../../../../redux/hooks/hooks";
import { setInvoice } from "../../../../../redux/reducers/InvoiceSlice";
import { highlight } from "../../../../../utils/highlight";

export const useInvoice = (
    invoiceIdnex: number,
    action: ([]: IInvoice[]) => void,
    invoice: IInvoice,
    invoices: IInvoice[]
) => {
    const dispatch = useTypedDispatch();

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

    return selectInvoice;
};
