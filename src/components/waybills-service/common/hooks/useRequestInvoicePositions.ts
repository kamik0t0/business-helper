import { IInvoicePosition } from "../../../../interfaces/invoice";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";
import { setInvoicePositions } from "../../../../redux/reducers/InvoiceSlice";

interface IGetSaleItems {
    meta: object;
    payload: IInvoicePosition[];
    type: string;
}

export function useRequestInvoicePositions(
    requestInvoiceItemsAction: (invoiceId: number) => IGetSaleItems
) {
    const dispatch = useTypedDispatch();

    const requestPositions = (invoiceId: number): Promise<void> =>
        new Promise((resolve) => {
            resolve(dispatch(requestInvoiceItemsAction(invoiceId)));
        }).then(({ payload: positions }: IInvoicePosition[] | any): any =>
            dispatch(setInvoicePositions(positions))
        );

    return requestPositions;
}
