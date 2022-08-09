import classes from "../styles/waybill-list.module.css";
import { memo } from "react";
import PropTypes from "prop-types";

const InvoiceHeader = memo(({ sort, info }) => {
    return (
        <div className={classes.waybills_list_header}>
            <div
                className={classes.waybills_list_header_date}
                onClick={sort.sort}
            >
                Дата
            </div>
            <div
                className={classes.waybills_list_header_num}
                onClick={sort.sort}
            >
                Номер
            </div>
            <div
                className={classes.waybills_list_header_ctrpty}
                onClick={sort.sort}
            >
                {info}
            </div>
            <div
                className={classes.waybills_list_header_summ}
                onClick={sort.sort}
            >
                Сумма
            </div>
        </div>
    );
});

InvoiceHeader.propTypes = {
    sort: PropTypes.object.isRequired,
    info: PropTypes.string.isRequired,
};

export default InvoiceHeader;
