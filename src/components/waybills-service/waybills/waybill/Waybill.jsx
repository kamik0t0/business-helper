// представление накладной в виде таблицы с 4 колонками и 1 строки в списке накладных: покупок или продаж
import React from "react";
import classes from "./styles/waybill-list.module.css";

export default function Sale({
    index,
    date,
    number,
    counterparty,
    summ,
    getWaybill,
    highlight,
    setWaybill_chosen,
    highlightWaybill,
}) {
    const parseDate = new Date(Date.parse(date)).toLocaleDateString();
    return (
        <div className={classes.waybills_list}>
            {/* накладная */}
            <div
                className={
                    highlight
                        ? classes.waybills_list_wb + " " + classes.highlight
                        : classes.waybills_list_wb
                }
                onClick={(event) => {
                    getWaybill(event, index);
                    highlightWaybill(index);
                    setWaybill_chosen(true);
                }}
            >
                {/* дата */}
                <div className={classes.waybills_list_wb_date}>{parseDate}</div>
                {/* номер */}
                <div className={classes.waybills_list_wb_num}>
                    {number.length > 14 ? number.slice(0, 15) + "..." : number}
                </div>
                {/* контрагент */}
                <div className={classes.waybills_list_wb_ctrpty}>
                    {counterparty}
                </div>
                {/* сумма */}
                <div className={classes.waybills_list_wb_summ}>{summ}</div>
            </div>
        </div>
    );
}
