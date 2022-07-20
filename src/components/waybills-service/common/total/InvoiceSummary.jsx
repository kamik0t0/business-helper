import classes from "./styles/total.module.css";
import PropTypes from "prop-types";
import { memo } from "react";
import { toRU } from "../../../../utils/currencyFormat";

export const InvoiceSummary = memo(({ summ, NDS, total }) => {
    return (
        <div className={classes.totalWrapper}>
            <div className={classes.total}>
                <div className={classes.total_name}>Сумма:</div>
                <div className={classes.total_value}>{toRU.format(summ)}</div>
            </div>
            <div className={classes.total}>
                <div className={classes.total_name}>НДС:</div>
                <div className={classes.total_value}>{toRU.format(NDS)}</div>
            </div>
            <div className={classes.total}>
                <div className={classes.total_name}>Итого:</div>
                <div className={classes.total_value}>{toRU.format(total)}</div>
            </div>
        </div>
    );
});

InvoiceSummary.propTypes = {
    array: PropTypes.array.isRequired,
    field: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    total: PropTypes.func.isRequired,
};
