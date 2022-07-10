import classes from "../styles/waybill-list.module.css";

export default function InvoiceHeader({ sort, info }) {
    return (
        <div className={classes.waybills_list_header}>
            {/* дата */}
            <div className={classes.waybills_list_header_date} onClick={sort}>
                Дата
            </div>
            {/* номер */}
            <div className={classes.waybills_list_header_num} onClick={sort}>
                Номер
            </div>
            {/* контрагент */}
            <div className={classes.waybills_list_header_ctrpty} onClick={sort}>
                {info}
            </div>
            {/* сумма */}
            <div className={classes.waybills_list_header_summ} onClick={sort}>
                Сумма
            </div>
        </div>
    );
}
