import classes from "./styles/waybill-list.module.css";
import classNames from "classnames/bind";
import { useInvoice } from "./hooks/useInvoice";
import { toRU } from "../../../../utils/currencyFormat";
import { IInvoice } from "../../../../interfaces/invoice";
import { FC, Dispatch, SetStateAction } from "react";

type InvoiceTypes = {
    index: number;
    invoice: IInvoice;
    invoices: IInvoice[];
    action: Dispatch<SetStateAction<IInvoice[]>>;
};

const Invoice: FC<InvoiceTypes> = ({ index, invoice, invoices, action }) => {
    const cx = classNames.bind(classes);
    const highlight = cx({
        [classes.waybills_list_wb]: true,
        [classes.highlight]: invoice.highlight,
    });

    const selectInvoice = useInvoice(index, action, invoice, invoices);

    const parseDate = new Date(
        Date.parse(invoice.waybill_date!)
    ).toLocaleDateString();

    const invoiceNum =
        invoice?.id?.toString().length! > 14
            ? invoice.id?.toString().slice(0, 15) + "..."
            : invoice.id;

    const Total = toRU.format(invoice.total);

    return (
        <div className={classes.waybills_list}>
            <div className={highlight} onClick={selectInvoice}>
                <div className={classes.waybills_list_wb_date}>{parseDate}</div>
                <div className={classes.waybills_list_wb_num}>{invoiceNum}</div>
                <div className={classes.waybills_list_wb_ctrpty}>
                    {invoice.cl_orgname}
                </div>
                <div className={classes.waybills_list_wb_summ}>{Total}</div>
            </div>
        </div>
    );
};

export default Invoice;
