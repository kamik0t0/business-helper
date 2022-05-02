// представление накладной в виде таблицы с 4 колонками и 1 строки в списке накладных: покупок или продаж
import React from "react";
import classes from "./styles/waybill-list.module.css";
import PropTypes from "prop-types";

export default function Waybill({ index, waybill, getWaybill, highlightON }) {
    const parseDate = new Date(
        Date.parse(waybill.waybill_date)
    ).toLocaleDateString();
    return (
        <div className={classes.waybills_list}>
            {/* накладная */}
            <div
                className={
                    waybill.highlight
                        ? classes.waybills_list_wb + " " + classes.highlight
                        : classes.waybills_list_wb
                }
                onClick={(event) => {
                    getWaybill(event, index);
                    highlightON(index);
                }}
            >
                {/* дата */}
                <div className={classes.waybills_list_wb_date}>{parseDate}</div>
                {/* номер */}
                <div className={classes.waybills_list_wb_num}>
                    {waybill.id.length > 14
                        ? waybill.id.slice(0, 15) + "..."
                        : waybill.id}
                </div>
                {/* контрагент */}
                <div className={classes.waybills_list_wb_ctrpty}>
                    {waybill.cl_orgname}
                </div>
                {/* сумма */}
                <div className={classes.waybills_list_wb_summ}>
                    {waybill.total}
                </div>
            </div>
        </div>
    );
}

Waybill.propTypes = {
    index: PropTypes.number.isRequired,
    waybill: PropTypes.object.isRequired,
    getWaybil: PropTypes.func,
    highlightON: PropTypes.func.isRequired,
};
