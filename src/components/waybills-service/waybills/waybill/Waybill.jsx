// представление накладной в виде таблицы с 4 колонками и 1 строки в списке накладных: покупок или продаж
import React from "react";
import classes from "./styles/waybill-list.module.css";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useInvoice } from "./hooks/useInvoice";

export default function Invoice({ index, invoice, invoices, action }) {
    const cx = classNames.bind(classes);
    const highlight = cx({
        [classes.waybills_list_wb]: true,
        [classes.highlight]: invoice.highlight,
    });

    const selectInvoice = useInvoice(index, action, invoice, invoices);

    const parseDate = new Date(
        Date.parse(invoice.waybill_date)
    ).toLocaleDateString();

    return (
        <div className={classes.waybills_list}>
            <div className={highlight} onClick={selectInvoice}>
                <div className={classes.waybills_list_wb_date}>{parseDate}</div>
                <div className={classes.waybills_list_wb_num}>
                    {invoice.id.length > 14
                        ? invoice.id.slice(0, 15) + "..."
                        : invoice.id}
                </div>
                <div className={classes.waybills_list_wb_ctrpty}>
                    {invoice.cl_orgname}
                </div>
                <div className={classes.waybills_list_wb_summ}>
                    {invoice.total}
                </div>
            </div>
        </div>
    );
}

Invoice.propTypes = {
    invoice: PropTypes.object.isRequired,
    invoices: PropTypes.array,
    action: PropTypes.func.isRequired,
};
