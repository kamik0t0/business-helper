// компонент показывающий список существующих накладных
import React, { useEffect } from "react";
import MyLink from "../../UI/link/MyLink.jsx";
import classes from "./styles/purhcases.module.css";
import { useSelector } from "react-redux";
import WayBillsList from "../../components/waybills-service/waybills/Waybill-list.jsx";
import { localStorateClearing } from "../../utils/localStorageClearing.js";

export default function Purchases() {
    useEffect(() => {
        localStorateClearing();
    }, []);
    const myOrg = useSelector((state) => state.setMyOrgReducer.myOrg);
    const PURCHASES = useSelector((state) => state.setPurchases.purchases);
    return (
        <>
            {myOrg ? (
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
