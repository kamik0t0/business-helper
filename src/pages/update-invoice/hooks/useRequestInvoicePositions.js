import { InvoiceItem } from "../../../utils/InvoiceItemClass";
import { useTypedDispatch } from "../../../redux/hooks/hooks";

export function useRequestInvoicePositions(
    requestInvoiceItemsAction,
    setPositions
) {
    const dispatch = useTypedDispatch();

    const requestPositions = (invoiceId) =>
        new Promise((resolve) => {
            resolve(dispatch(requestInvoiceItemsAction(invoiceId)));
        });

    const serializeInvoiceItems = (positions) =>
        setPositions(
            [...positions].map(
                (position) =>
                    new InvoiceItem(
                        position?.highlight,
                        position?.id,
                        position?.item_number,
                        position?.nomenclature,
                        position?.quantity,
                        position?.price,
                        position?.summ,
                        position?.nds,
                        position?.total,
                        position?.createdAt,
                        position?.nds_persent,
                        position?.SaleId
                    )
            )
        );

    return {
        requestPositions,
        serializeInvoiceItems,
    };
}
