import classes from "../styles/waybill-list.module.css";
import { memo } from "react";

type InvoiceHeaderTypes = {
    sort: {
        sort: (event: React.MouseEvent<HTMLDivElement>) => void;
        sortOrder: boolean;
    };
    info: string;
};

const InvoiceHeader: React.FC<InvoiceHeaderTypes> = memo(({ sort, info }) => {
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

export default InvoiceHeader;
