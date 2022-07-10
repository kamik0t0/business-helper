import MyLink from "../../UI/link/MyLink.jsx";
import classes from "./styles/sales.module.css";
import { useTypedSelector } from "../../redux/hooks/hooks";
import InvoicesList from "../../components/waybills-service/waybills/Waybill-list.jsx";
import { setSales } from "../../redux/reducers/InvoiceSlice";

export default function Sales() {
    const USERORG = useTypedSelector((state) => state.orgsReducer.org);
    const SALES = useTypedSelector((state) => state.invoicesReducer.sales);

    return (
        <>
            {USERORG ? (
                <InvoicesList
                    CounterpartyInfo={["Покупатель", "Покупателю", "Продажи"]}
                    INVOICES={SALES}
                    action={setSales}
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
