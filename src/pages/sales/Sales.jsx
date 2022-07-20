import { useEffect, useState } from "react";
import { useFilter } from "../../components/waybills-service/waybills/service/hooks/useFilter.js";
import MyLink from "../../UI/link/MyLink.jsx";
import classes from "./styles/sales.module.css";
import { useTypedSelector } from "../../redux/hooks/hooks";
import Invoices from "../../components/waybills-service/waybills/Invoices.jsx";
import { deleteSaleBySaleId } from "../../redux/actions/SalesAction";

export default function Sales() {
    const { org } = useTypedSelector((state) => state.orgsReducer);
    const { sales } = useTypedSelector((state) => state.invoicesReducer);
    const [invoices, setInvoices] = useState([...sales]);
    const [column, setColumn, filter, startSearch] = useFilter(
        sales,
        setInvoices
    );

    useEffect(() => {
        setInvoices(sales);
    }, [sales]);

    return (
        <>
            {org ? (
                <Invoices
                    Info={["Покупатель", "Покупателю", "Продажи"]}
                    invoices={invoices}
                    setInvoices={setInvoices}
                    startSearch={startSearch}
                    column={column}
                    setColumn={setColumn}
                    filter={filter}
                    deleteAction={deleteSaleBySaleId}
                />
            ) : (
                <div className={classes.content}>
                    <div className={classes.nocounterparties}>
                        Выберите организацию в
                        <MyLink path="/private"> личном кабинете</MyLink> или{" "}
                        <MyLink path="/login"> авторизуйтесь</MyLink>
                    </div>
                </div>
            )}
        </>
    );
}
