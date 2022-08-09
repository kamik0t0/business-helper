import Invoices from "../../components/waybills-service/waybills/Invoices.jsx";
import { deletePurchaseByPurchaseId } from "../../redux/actions/PurchasesAction";
import { useTypedSelector } from "../../redux/hooks/hooks";
import Link from "../../UI/Link/Link.jsx";
import classes from "./styles/purhcases.module.css";

export default function Purchases() {
    const { org } = useTypedSelector((state) => state.orgsReducer);
    const { purchases } = useTypedSelector((state) => state.invoicesReducer);

    return (
        <>
            {org ? (
                <Invoices
                    Info={["Продавец", "Продавцу", "Покупки", "№"]}
                    INVOICES={purchases}
                    deleteAction={deletePurchaseByPurchaseId}
                />
            ) : (
                <div className={classes.nocounterparties}>
                    Выберите организацию в
                    <Link path="/private"> личном кабинете</Link> или
                    <Link path="/login"> авторизуйтесь</Link>
                </div>
            )}
        </>
    );
}
