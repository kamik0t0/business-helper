// компонент показывающий список существующих накладных
import MyLink from "../../UI/link/MyLink.jsx";
import classes from "./styles/sales.module.css";
import { useSelector } from "react-redux";
import WayBillsList from "../../components/waybills-service/waybills/Waybill-list.jsx";
import { Navigate } from "react-router-dom";

export default function Sales() {
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const SALES = useSelector((state) => state.setSales.sales);

    return (
        <>
            {isAuth ? (
                MYORG ? (
                    <WayBillsList
                        CounterpartyInfo={[
                            "Покупатель",
                            "Покупателю",
                            "Продажи",
                        ]}
                        WAYBILLS={SALES}
                    />
                ) : (
                    <div className={classes.content}>
                        <div className={classes.nocounterparties}>
                            Выберите организацию в
                            <MyLink path="/private"> личном кабинете</MyLink>{" "}
                            или <MyLink path="/login"> авторизуйтесь</MyLink>
                        </div>
                    </div>
                )
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}
