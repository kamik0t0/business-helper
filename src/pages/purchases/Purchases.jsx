// компонент показывающий список существующих накладных
import React from "react";
import MyLink from "../../UI/link/MyLink.jsx";
import classes from "./styles/purhcases.module.css";
import { useSelector } from "react-redux";
import WayBillsList from "../../components/waybills-service/waybills/Waybill-list.jsx";

export default function Purchases() {
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const PURCHASES = useSelector((state) => state.setPurchases.purchases);
    return (
        <>
            {MYORG ? (
                <WayBillsList
                    CounterpartyInfo={["Продавец", "Продавцу", "Покупки", "№"]}
                    path="/purchases/createwaybill"
                    WAYBILLS={PURCHASES}
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
