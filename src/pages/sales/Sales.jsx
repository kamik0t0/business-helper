// компонент показывающий список существующих накладных
import React, { useEffect } from "react";
import MyLink from "../../UI/link/MyLink.jsx";
import classes from "./styles/sales.module.css";
import { useSelector } from "react-redux";
import WayBillsList from "../../components/waybills-service/waybills/Waybill-list.jsx";
import { localStorateClearing } from "../../utils/localStorageClearing.js";

export default function Sales() {
    useEffect(() => {
        localStorateClearing();
    }, []);
    const isMyOrgSelected = useSelector(
        (state) => state.myOrgReducer.isMyOrgSelected
    );
    return (
        <>
            {isMyOrgSelected ? (
                <WayBillsList
                    CounterPartyType={["Покупатель", "Покупателю", "Продажи"]}
                    path="/sales/createwaybill"
                    WB={JSON.parse(localStorage.getItem("Sales"))}
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
