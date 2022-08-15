import Invoices from "../../components/waybills-service/waybills/Invoices";
import { deleteSaleBySaleId } from "../../redux/actions/SalesAction";
import { useTypedSelector } from "../../redux/hooks/hooks";
import Link from "../../UI/Link/Link";
import classes from "./styles/sales.module.css";

const Sales: React.FC = () => {
    const { org } = useTypedSelector((state) => state.orgsReducer);
    const { sales } = useTypedSelector((state) => state.invoicesReducer);

    return (
        <>
            {org ? (
                <Invoices
                    Info={["Покупатель", "Покупателю", "Продажи"]}
                    INVOICES={sales}
                    deleteAction={deleteSaleBySaleId}
                />
            ) : (
                <div className={classes.nocounterparties}>
                    Выберите организацию в
                    <Link path="/private"> личном кабинете</Link> или{" "}
                    <Link path="/login"> авторизуйтесь</Link>
                </div>
            )}
        </>
    );
};

export default Sales;
