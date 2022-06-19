// компонент показывающий список существующих накладных
import React from "react";
import MyLink from "../../UI/link/MyLink.jsx";
import classes from "./styles/sales.module.css";
import { useSelector } from "react-redux";
import WayBillsList from "../../components/waybills-service/waybills/Waybill-list.jsx";

export default function Sales() {
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const SALES = useSelector((state) => state.setSales.sales);
    return (
        <>
            {MYORG ? (
                <WayBillsList
                    CounterpartyInfo={["Покупатель", "Покупателю", "Продажи"]}
                    WAYBILLS={SALES}
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
