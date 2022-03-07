import React from "react";
import classes from "./styles/position-headers.module.css";

export default function PositionHeaders() {
    return (
        <div className={classes.waybill_form_wb_header}>
            <div className={classes.waybill_form_wb_header_number}>№</div>
            <div className={classes.waybill_form_wb_header_nomenclature}>
                Номенклатура
            </div>
            <div className={classes.waybill_form_wb_header_quantity}>Кол.</div>
            <div className={classes.waybill_form_wb_header_price}>Цена</div>
            <div className={classes.waybill_form_wb_header_summ}>Сумма</div>
            <div className={classes.waybill_form_wb_header_NDSprcnt}>%</div>
            <div className={classes.waybill_form_wb_header_NDS}>НДС</div>
            <div className={classes.waybill_form_wb_header_total}>Всего</div>
        </div>
    );
}
