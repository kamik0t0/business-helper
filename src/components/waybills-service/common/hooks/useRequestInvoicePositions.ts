import { AsyncThunk } from "@reduxjs/toolkit";
import { IInvoicePosition } from "../../../../interfaces/invoice";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";
import { setInvoicePositions } from "../../../../redux/reducers/InvoiceSlice";

export const useRequestInvoicePositions = (
    requestInvoiceItemsAction: AsyncThunk<
        IInvoicePosition[],
        number,
        { rejectValue: string }
    >
) => {
    const dispatch = useTypedDispatch();

    const requestPositions = (invoiceId: number | null): Promise<void> =>
        new Promise(
            (resolve) =>
                invoiceId &&
                resolve(dispatch(requestInvoiceItemsAction(invoiceId)))
        ).then(({ payload: positions }: IInvoicePosition[] | any): any =>
            dispatch(setInvoicePositions(positions))
        );

    return requestPositions;
};
