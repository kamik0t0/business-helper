import MyLink from "../../UI/link/MyLink.jsx";
import classes from "./styles/purhcases.module.css";
import { useTypedSelector } from "../../redux/hooks/hooks";
import InvoicesList from "../../components/waybills-service/waybills/Waybill-list.jsx";
import { setPurchases } from "../../redux/reducers/InvoiceSlice";

export default function Purchases() {
    const USERORG = useTypedSelector((state) => state.orgsReducer.org);
    const PURCHASES = useTypedSelector(
        (state) => state.invoicesReducer.purchases
    );

    return (
        <>
            {USERORG ? (
                <InvoicesList
                    CounterpartyInfo={["Продавец", "Продавцу", "Покупки", "№"]}
                    INVOICES={PURCHASES}
                    action={setPurchases}
                />
            ) : (
                <div className={classes.content}>
                    <div className={classes.nocounterparties}>
                        Выберите организацию в
                        <MyLink path="/private"> личном кабинете</MyLink> или
                        <MyLink path="/login"> авторизуйтесь</MyLink>
                    </div>
                </div>
            )}
        </>
    );
}
