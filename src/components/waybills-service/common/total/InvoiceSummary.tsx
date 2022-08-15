import classes from "./styles/total.module.css";
import { memo } from "react";
import { toRU } from "../../../../utils/currencyFormat";

type InvoiceSummaryTypes = {
    summ: number | undefined;
    nds: number | undefined;
    total: number | undefined;
};

export const InvoiceSummary: React.FC<InvoiceSummaryTypes> = memo(
    ({ summ, nds, total }) => {
        const formattedSumm = toRU.format(summ!);
        const formattedNds = toRU.format(nds!);
        const formattedTotal = toRU.format(total!);

        return (
            <div className={classes.totalWrapper}>
                <div className={classes.total}>
                    <div className={classes.total_name}>Сумма:</div>
                    <div className={classes.total_value}>{formattedSumm}</div>
                </div>
                <div className={classes.total}>
                    <div className={classes.total_name}>НДС:</div>
                    <div className={classes.total_value}>{formattedNds}</div>
                </div>
                <div className={classes.total}>
                    <div className={classes.total_name}>Итого:</div>
                    <div className={classes.total_value}>{formattedTotal}</div>
                </div>
            </div>
        );
    }
);
