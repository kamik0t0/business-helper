import { useEffect, useState } from "react";
import Invoices from "../../components/waybills-service/waybills/Invoices.jsx";
import { useFilter } from "../../components/waybills-service/waybills/service/hooks/useFilter";
import { deletePurchaseByPurchaseId } from "../../redux/actions/PurchasesAction";
import { useTypedSelector } from "../../redux/hooks/hooks";
import MyLink from "../../UI/link/MyLink.jsx";
import classes from "./styles/purhcases.module.css";

export default function Purchases() {
    const { org } = useTypedSelector((state) => state.orgsReducer);
    const { purchases } = useTypedSelector((state) => state.invoicesReducer);
    const [invoices, setInvoices] = useState([...purchases]);
    const [column, setColumn, filter, startSearch] = useFilter(
        purchases,
        setInvoices
    );

    useEffect(() => setInvoices(purchases), [purchases]);

    return (
        <>
            {org ? (
                <Invoices
                    Info={["Продавец", "Продавцу", "Покупки", "№"]}
                    invoices={invoices}
                    setInvoices={setInvoices}
                    startSearch={startSearch}
                    column={column}
                    setColumn={setColumn}
                    filter={filter}
                    deleteAction={deletePurchaseByPurchaseId}
                />
            ) : (
                <div className={classes.nocounterparties}>
                    Выберите организацию в
                    <MyLink path="/private"> личном кабинете</MyLink> или
                    <MyLink path="/login"> авторизуйтесь</MyLink>
                </div>
            )}
        </>
    );
}
