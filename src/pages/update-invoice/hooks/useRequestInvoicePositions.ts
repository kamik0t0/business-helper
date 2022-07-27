import { IInvoiceItem } from "../../../interfaces/invoice";
import { useTypedDispatch } from "../../../redux/hooks/hooks";
import { InvoiceItem } from "../../../utils/InvoiceItemClass";

export function useRequestInvoicePositions(
    requestInvoiceItemsAction: (invoiceId: number) => any,
    setPositions: ([]) => any
) {
    const dispatch = useTypedDispatch();

    const requestPositions = (invoiceId: number): Promise<IInvoiceItem[]> =>
        new Promise((resolve) => {
            resolve(dispatch(requestInvoiceItemsAction(invoiceId)));
        });

    const serializeInvoiceItems = (positions: IInvoiceItem[]): void =>
        setPositions(
            [...positions].map(
                (position: IInvoiceItem) =>
                    new InvoiceItem(
                        position?.highlight,
                        position.id,
                        position.item_number,
                        position.nomenclature,
                        position.quantity,
                        position.price,
                        position.summ,
                        position.nds,
                        position.total,
                        position.createdAt,
                        position.nds_percent,
                        position?.PurchaseId,
                        position?.SaleId
                    )
            )
        );

    return [requestPositions, serializeInvoiceItems];
}
