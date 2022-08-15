import Invoice from "./waybill/Invoice";
import { v4 as uuid } from "uuid";
import { Dispatch, FC, SetStateAction } from "react";
import { IInvoice } from "../../../interfaces/invoice";

const InvoicesWrapper: FC<{
    invoices: IInvoice[];
    action: Dispatch<SetStateAction<IInvoice[]>>;
}> = ({ invoices, action }) => {
    return (
        <>
            {invoices.length > 0 &&
                invoices.map((invoice: IInvoice, index: number) => {
                    return (
                        <Invoice
                            key={uuid()}
                            index={index}
                            invoice={invoice}
                            invoices={invoices}
                            action={action}
                        />
                    );
                })}
        </>
    );
};

export default InvoicesWrapper;
