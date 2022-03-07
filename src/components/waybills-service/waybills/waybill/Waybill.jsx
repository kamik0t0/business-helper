// представление накладной в виде таблицы с 4 колонками и 1 строки в списке накладных: покупок или продаж
import React from "react";
import classes from "./styles/waybill-list.module.css";
import PropTypes from "prop-types";

export default function Waybill({
    index,
    date,
    number,
    counterparty,
    total,
    getWaybill,
    highlight,
    setWaybillChosen,
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
                    setWaybillChosen(true);
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
                <div className={classes.waybills_list_wb_summ}>{total}</div>
            </div>
        </div>
    );
}

Waybill.propTypes = {
    index: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    counterparty: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
    getWaybil: PropTypes.func,
    highlight: PropTypes.bool,
    setWaybillChosen: PropTypes.func.isRequired,
    highlightWaybill: PropTypes.func.isRequired,
};
